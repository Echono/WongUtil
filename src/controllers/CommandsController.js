require('dotenv').config();
const { REST, Routes, Events } = require('discord.js');
const fs = require('node:fs');
const path = require('path');
const debug = require('debug')('CommandsController');

const registerComamnds = () => {
    debug('Gathering file directories');
    const appdir = path.dirname(require.main.filename);
    const filedir = path.join(appdir, 'models/commands.json');
    const filestream = fs.readFileSync(filedir);    
    const json = JSON.parse(filestream);
    debug(`Found ${json.commands.length} ${json.commands.length > 1 ? "commands" : "command"}`);
    if(json.commands.length > 0) {
        const rest = new REST().setToken(process.env.BOT_TOKEN);
        (async () => {
            try {
                debug('Attempting to update bot commands');
                const data = await rest.put(
                    Routes.applicationCommands(process.env.APP_ID),
                    { body: json.commands }
                )
                debug(`Successfully registered: ${data.length} ${data.length > 1 ? "commands" : "command"}`);
            } catch(error) {   
                console.error(error);
            }
        })();
    }
};

const implementInteractions = (client) => {
    client.on(Events.InteractionCreate, (interaction) => {
        debugger;
    });
};

module.exports = {
    registerComamnds,
    implementInteractions
}