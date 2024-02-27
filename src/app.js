require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { MessageController } = require('./controllers/MessageController');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});
client.login(process.env.BOT_TOKEN);
client.on('ready', (c) => {
    console.log(`${c.user.username} now online with the tag: ${c.user.tag}`);
});

new MessageController(client)
