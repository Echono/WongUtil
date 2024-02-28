const { SlashCommandBuilder } = require('discord.js');

const execute = async (interaction) => {
    
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unsubscribe')
        .setDescription('Unsubscribes the user from game notifications'),
    execute
}