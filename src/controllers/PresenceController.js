const { Events } = require('discord.js');
const { APP_IDS } = require('../models/application_ids');

const implementPresence = (client) => {
    client.on(Events.PresenceUpdate, (oldPresence, newPresence) => {
        if(newPresence.activities.length > 0) {
            const gameActivities = newPresence.activities.reduce((acc, next) => {
                if(next.name !== 'Spotify') {
                    acc.push(next);
                }
                return acc;
            }, []);
            gameActivities.forEach((game) => {
                const execute = _determineFunction(game.applicationId);
                execute(game);
            });
        }
    });
};

const _determineFunction = (appID) => {
    const functions = _getFunctions();
    const gameObject = functions.find((object) => {
        if(object.appID === appID) {
            return object;
        };
    })
    return gameObject.fn; 
};

const _getFunctions = () => {
    return [
        {appID: APP_IDS.LeagueOfLegends, fn: gameLeagueOfLegends},
        {appID: APP_IDS.CounterStrike2, fn: gameCounterStrike2}
    ]
}

const gameLeagueOfLegends = (game) => {
    
}

const gameCounterStrike2 = () => {

}

const softwareSpotify = () => {

}

module.exports = {
    implementPresence
}