const { Events } = require('discord.js');
const { APP_IDS } = require('../models/application_ids');
const axios = require('axios');

const implementPresence = (client) => {
    client.on(Events.PresenceUpdate, async (oldPresence, newPresence) => {
        const isInSub =  await _validateUserInSubscriptions(newPresence.member.user.id);
        if(newPresence.activities.length > 0 && isInSub) {
            const gameActivities = newPresence.activities.reduce((acc, next) => {
                if(next.name !== 'Spotify') {
                    acc.push(next);
                }
                return acc;
            }, []);
            gameActivities.forEach((game) => {
                const execute = _determineFunction(game.applicationId);
                execute(oldPresence, game);
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
};

const _validateUserInSubscriptions = async (userId) => {
    const instance = axios.create({
        baseURL: process.env.CAP_URL + process.env.CAP_SUBSCRIPTION_SERVICE,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    try {
        const response = await instance.get("UserSet");
        const { value } = response.data;
        const result = value.find((user) => {
            return user.ID === userId
        });
        return result ? true : false;   
    } catch(error) {
        console.error(error);
    }
};

const gameLeagueOfLegends = (presence, game) => {
};

const gameCounterStrike2 = (presence, game) => {
};

const softwareSpotify = () => {

};

module.exports = {
    implementPresence
};