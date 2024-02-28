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

debug(`${process.env.REFRESH_COMMANDS === 'true' ? 'Uploading commands' : 'Skipping command refresh'}`);
if(process.env.REFRESH_COMMANDS === 'true') {
    registerComamnds();
}

debug('Logging into bot using .env token');
client.login(process.env.BOT_TOKEN);
client.on(Events.ClientReady, (c) => {
    debug(`Logged into: ${c.user.tag}`);
    implementInteractions(c);
});

