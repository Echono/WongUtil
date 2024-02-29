const { SlashCommandBuilder } = require('discord.js');
const debug = require('debug')('slashCommand_subscribe');
const axios = require('axios');
require('dotenv').config();

const execute = async (interaction) => {
    debug(`Subscribe was called by: ${interaction.user.tag}`);
    const { user } = interaction;
    const userInformation = {
        ID: user.id,
        tag: user.tag,
        username: user.username
    };
    
    debug(`Creating axios instance for: ${interaction.user.tag}`);
    const instance = axios.create({
        baseURL: process.env.CAP_URL + process.env.CAP_GAME_ANNOUNCER_SERVICE,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    try {
        debug(`Attempting to upload details of: ${interaction.user.tag} to DB`);
        const capResponse = await instance.post("UserSet", userInformation);
        
        debug(`Upload successful: ${interaction.user.tag}`);
        await interaction.reply(`Added ${capResponse.data.tag} to subscription list`);
    } catch(error) {
        if(error.response.data.error.message = "Entity already exists") {
            debug(`User: ${interaction.user.tag} already exists in DB`);
            await interaction.reply(`User ${userInformation.tag} already exists in subscription list`);
        }
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subscribe')
        .setDescription('Subscribes the user to game notifications'),
    execute
}