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
    })

});
