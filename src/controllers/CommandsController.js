require('dotenv').config();
const { REST, Routes, Events, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('path');
const debug = require('debug')('CommandsController');

const registerComamnds = () => {
    const commands = _readCommands();
    const translatedCommands = commands.map((command) => {
        return command.data.toJSON();
    })
    if(commands.length > 0) {
        const rest = new REST().setToken(process.env.BOT_TOKEN);
        (async () => {
            try {
                debug('Attempting to update bot commands');
                const data = await rest.put(
                    Routes.applicationCommands(process.env.APP_ID),
                    { body: translatedCommands }
                )
                debug(`Successfully registered: ${data.length} ${data.length > 1 ? "commands" : "command"}`);
            } catch(error) {   
                console.error(error);
            }
        })();
    }
};

const implementInteractions = (client) => {
    client.commands = new Collection();
    const commands = _readCommands();
    commands.forEach((command) => {
        debug(`Loaded slash command: ${command.data.name}`);
        client.commands.set(command.data.name, command);
    });
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        debug(`Command: '${interaction.commandName}' was called by: '${interaction.user.tag}'`);
        const command = interaction.client.commands.get(interaction.commandName);
        if(!command) {
            debug(`Command: '${interaction.commandName}' was not found in app`);
        };
        try {
            debug(`Attempting to execute: '${interaction.commandName}'`);
            await command.execute(interaction);
            debug(`Successfully executed: '${interaction.commandName}'`);
        } catch(error) {
            console.error(error);
        }
    });
};

const _readCommands = () => {
    const commands = []
    const folderdir = path.join(path.dirname(require.main.filename), "slash_commands");
    const folder = fs.readdirSync(folderdir).filter(file => file.endsWith('.js'));
    debug(`Found ${folder.length} ${folder.length > 1 ? "commands" : "command"}`)
    for (const file of folder) {
        const filedir = path.join(folderdir, file);
        const command = require(filedir);
        if ('data' in command && 'execute' in command) {
			commands.push(command);
		} else {
			debug(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
    }
    return commands;
}

module.exports = {
    registerComamnds,
    implementInteractions
}