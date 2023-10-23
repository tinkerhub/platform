// netlify/functions/discord-auth.js
const axios = require('axios');
const admin = require('firebase-admin');
const { Client } = require('discord.js');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
    });
}
const db = admin.firestore();

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Channel],
});
client.login(process.env.DISCORD_TOKEN).then();

const ready = new Promise((resolve) => client.once('ready', resolve));

exports.handler = async function (event) {
    const { code, state  } = event.queryStringParameters;
    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const redirectUri = `${process.env.URL}/.netlify/functions/discord-auth`;

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${tokenResponse.data.access_token}`,
            },
        });

        const discordId = userResponse.data.id;
        const userId = decodeURIComponent(state);

        await ready
        const server = client.guilds.cache.get(process.env.guildID);
        const channel = await server.channels.fetch(process.env.START_CHANNEL);

        const invite = await channel.createInvite({
            maxAge: 300,  // 5 minutes
            maxUses: 1,
        });

        const userDoc = db.collection('users').doc(userId);
        await userDoc.set({
            discordId,
            discordInvite: {
                url: invite.url,
                expiry: Date.now() + 300 * 1000,  // Current timestamp + 5 minutes in milliseconds
            }
        }, { merge: true });

        client.destroy().then();

        return {
            statusCode: 200,
            body: JSON.stringify({ discordInvite: invite.url }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
}
