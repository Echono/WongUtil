require('dotenv').config();
const axios = require('axios');

const getAxiosInstanceForGameAnnouncer = () => {
    this.AXIOS_INSTANCE ??= axios.create({
        baseURL: process.env.CAP_URL + process.env.CAP_GAME_ANNOUNCER_SERVICE,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return this.AXIOS_INSTANCE;
}

module.exports = {
    getAxiosInstanceForGameAnnouncer
}