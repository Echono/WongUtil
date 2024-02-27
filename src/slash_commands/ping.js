const { SlashCommandBuilder } = require('discord.js');

const execute = async (interaction) => {
    await interaction.reply("Pong!");
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responds with pong'),
    execute
};