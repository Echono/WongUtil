require('dotenv').config();
const { REST, Routes, Events } = require('discord.js');
const fs = require('node:fs');
const path = require('path');
const debug = require('debug')('CommandsController');

const registerComamnds = () => {
    const commands = [];
    const folderdir = path.join(path.dirname(require.main.filename), "slash_commands");
    const folder = fs.readdirSync(folderdir).filter(file => file.endsWith('.js'));

    debug(`Found ${folder.length} ${folder.length > 1 ? "commands" : "command"}`)
    for (const file of folder) {
        const filedir = path.join(folderdir, file);
        const command = require(filedir);
        if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			debug(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
    }

    if(commands.length > 0) {
        const rest = new REST().setToken(process.env.BOT_TOKEN);
        (async () => {
            try {
                debug('Attempting to update bot commands');
                const data = await rest.put(
                    Routes.applicationCommands(process.env.APP_ID),
                    { body: commands }
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