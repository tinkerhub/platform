// netlify/functions/discord-auth.js
const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
    });
}
const db = admin.firestore();

exports.handler = async function (event) {
    const { access_token, state, token_type } = event.queryStringParameters;

    if (!access_token || !state || !token_type) {
        return {
            statusCode: 400,
            body: 'Bad Request',
        };
    }

    try {
        const response = await fetch('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `${token_type} ${access_token}`,
            },
        }).then((res) => res.json());

        const discordId = response.id;
        const userId = decodeURIComponent(state);

        // Create an invitation link
        const inviteResponse = await fetch(`https://discord.com/api/v10/channels/${process.env.START_CHANNEL}/invites`, {
            method: 'POST',
            headers: {
                'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                max_age: 300,  // 5 minutes
                max_uses: 1,
            }),
        }).then((res) => res.json());

        const inviteUrl = `https://discord.gg/${inviteResponse.code}`;

        const userDoc = db.collection('users').doc(userId);
        await userDoc.set({
            discordId
        }, { merge: true });

        return {
            statusCode: 200,
            body: JSON.stringify({
                url: inviteUrl,
                expiry: Date.now() + 300 * 1000,  // Current timestamp + 5 minutes in milliseconds
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: error.message || error,
        };
    }
}
