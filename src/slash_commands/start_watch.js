const { SlashCommandBuilder } = require('discord.js');

const execute = async (interaction) => {
    await interaction.reply("Pong!");
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start_watch')
        .setDescription('Makes the bot post games in the channel which this command was called'),
    execute
};