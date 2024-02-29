const { getAxiosInstanceForGameAnnouncer } = require('../instance');
const debug = require('debug')('MessageController');

const announceGame = (presence, message) => {
    const guildId = presence.guild.id;
    _getPermittedChannelsByGuildId(guildId).then((result) => {
        const { client } = presence;
        result.forEach((channelInfo) => {
            client.channels.fetch(channelInfo.ID).then((channel) => {
                channel.send(message);
            });
        });
    });
};

const _getPermittedChannelsByGuildId = async (guildId) => {
    const instance = getAxiosInstanceForGameAnnouncer();
    const url = `GuildSet('${guildId}')?$expand=channels`
    try {
        const response = await instance.get(url);
        if(response.data.channels) {
            return response.data.channels;
        } else {
            debug(`Bot is not watching over any channels in guild: ${guildId}`);
        }
    } catch(error) {
        if(error.response.data.error.message.toLowerCase() === "not found") {
            debug(`Bot does not recognize guild: ${guildId}`);
        }
    }
};

module.exports = {
    announceGame
}