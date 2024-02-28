const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const execute = async (interaction) => {
    const instance = _getAxiosInstance();
    const { guild } = interaction;
    const data = {
        guild: {
            ID: guild.id,
            name: guild.name
        }
    };
    const response = await instance.post("forceCreateGuild", data);
    debugger;
};

const _getAxiosInstance = () => {
    if(!this.AXIOS_INSTANCE) {
        this.AXIOS_INSTANCE = axios.create({
            baseURL: process.env.CAP_URL + process.env.CAP_SUBSCRIPTION_SERVICE,
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    };
    return this.AXIOS_INSTANCE;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start_watch')
        .setDescription('Makes the bot post games in the channel which this command was called'),
    execute
};