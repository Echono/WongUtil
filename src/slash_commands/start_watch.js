const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const execute = async (interaction) => {
    const instance = _getAxiosInstance();
    const { guild } = interaction;
    const guildData = {
        guild: {
            ID: guild.id,
            name: guild.name
        }
    };
    try {
        const guildResponse = await instance.post("forceCreateGuild", guildData);
        const { code } = guildResponse.data;
        if(code === 200 || code === 203) {
            const { channel } = interaction;
            const channelData = {
                ID: channel.id,
                name: channel.name,
                guild_ID: guildResponse.data.guild_ID
            }
            const channelResponse = await instance.post("ChannelSet", channelData);
            await interaction.reply('Bot will be watching this channel');
        }
    } catch(error) {
        if(error.response.data.error.message === "Entity already exists") {
            await interaction.reply('Bot is already watching over this channel');
        }
    }  
};

const _getAxiosInstance = () => {
    this.AXIOS_INSTANCE ??= axios.create({
        baseURL: process.env.CAP_URL + process.env.CAP_SUBSCRIPTION_SERVICE,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return this.AXIOS_INSTANCE;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start_watch')
        .setDescription('Makes the bot post games in the channel which this command was called'),
    execute
};