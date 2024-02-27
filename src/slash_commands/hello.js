const { SlashCommandBuilder } = require('discord.js');

const execute = async (interactions) => {
    await interactions.reply(`Hi ${interactions.user.username}`)
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Says hi to the user'),
    execute
}