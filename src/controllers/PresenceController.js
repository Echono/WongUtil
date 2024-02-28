const { Events } = require('discord.js');
const { APP_IDS } = require('../models/application_ids');

const implementPresence = (client) => {

    client.on(Events.PresenceUpdate, (oldPresence, newPresence) => {
        debugger;
    });

}

module.exports = {
    implementPresence
}