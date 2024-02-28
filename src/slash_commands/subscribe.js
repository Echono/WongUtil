const { SlashCommandBuilder } = require('discord.js');

const execute = async (interaction) => {
    
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subscribe')
        .setDescription('Subscribes the user to game notifications'),
    execute
}