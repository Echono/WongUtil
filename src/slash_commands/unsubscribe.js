const { SlashCommandBuilder } = require('discord.js');
const debug = require('debug')('slashCommand_subscribe');
const axios = require('axios');
require('dotenv').config();

const execute = async (interaction) => {
    debug(`Creating axios instance for: ${interaction.user.tag}`);
    const instance = axios.create({
        baseURL: process.env.CAP_URL + process.env.CAP_SUBSCRIPTION_SERVICE,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    try {
        debug(`Attempting to remove: ${interaction.user.tag} in DB`);
        const capResponse = await instance.post("unsubscribe", {ID: interaction.user.id});
        debug(`Removal successful: ${interaction.user.tag}`);
        await interaction.reply(`Removed ${interaction.user.tag} from subscription list`);
    } catch(error) {
        if(error.response.data.error.message === "User not found in subscription list") {
            await interaction.reply(`User: ${interaction.user.tag} is not on the subscription list`)
        }
        await interaction.reply('Something went wrong under removal');
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unsubscribe')
        .setDescription('Unsubscribes the user from game notifications'),
    execute
}