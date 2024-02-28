const cds = require('@sap/cds');

module.exports = cds.service.impl((srv) => {

    srv.on('unsubscribe', async (req) => {
        const { UserSet } = srv.entities;
        try {
            const deletedUser = await srv.delete(UserSet, req.data.ID);
            req.reply({
                code: "200",
                message: "User unsubscribed"
            })
        } catch(error) {
            req.error({
                code: error.code,
                message: "User not found in subscription list"
            })
        }
    });

    srv.on('forceCreateGuild', async (req) => {
        const { GuildSet } = srv.entities;
        const { guild } = req.data;
        try {
            const potentialGuild = await srv.read(GuildSet, guild.ID);
            if(potentialGuild) {
                req.reply({
                    code: 203,
                    isRegistered: true,
                    guild_ID: guild.ID,
                    message: "Guild already exists in DB"
                })
            } else {
                const registeredGuild = await srv.create(GuildSet, guild);
                req.reply({
                    code: 200,
                    isRegistered: true,
                    guild_ID: guild.ID,
                    message: "Guild was not registered but is now"
                })
            }
        } catch(error) {
            req.error({
                code: error.code,
                isRegistered: false,
                guild_ID: guild.ID,
                message: "Something went wrong. No guild was registered in DB"
            })
        }
    }); 

});
