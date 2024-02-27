require('dotenv').config();
const { Client, IntentsBitField, Events } = require('discord.js');
const { registerComamnds, implementInteractions } = require('./controllers/CommandsController');
const debug = require('debug')('App');

debug('Creating a new client');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

debug('Registering commands');
registerComamnds();

debug('Logging into bot using .env token');
client.login(process.env.BOT_TOKEN);
client.on(Events.ClientReady, (c) => {
    debug(`Logged into: ${c.user.tag}`);
    console.log(`${c.user.username} now online with the tag: ${c.user.tag}`);
    implementInteractions(c);
});

