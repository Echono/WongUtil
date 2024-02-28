const { SlashCommandBuilder } = require('discord.js');

const execute = async (interaction) => {
    await interaction.reply("Pong!");
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('end_watch')
        .setDescription('Stops the bot in making game posts in the channel where this command was called'),
    execute
};