// netlify/functions/discord-auth.js
const admin = require('firebase-admin');
const { Client, GatewayIntentBits, Partials } = require("discord.js");

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
    const { access_token, state, token_type  } = event.queryStringParameters;

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

        console.log(response);

        const discordId = response.id;
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
            statusCode: 302,
            headers: {
                Location: `${process.env.URL}/profile`
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
}
