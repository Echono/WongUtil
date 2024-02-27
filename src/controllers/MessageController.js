const { MessageHandler } = require('../models/MessageHandler');

class MessageController {
    constructor(client) {
        this.functions = this.registerFunctions();
        this.messageHandler = new MessageHandler(client, this.functions);
    };

    registerFunctions = () => {
        return [
            {
                trigger: 'poke',
                callback: (message) => {
                    message.reply("Stop poking me daddy");
                }
            },
            {
                trigger: 'ping',
                callback: (message) => {
                    message.reply('Pong');
                }
            },
            {
                trigger: 'muh',
                callback: (message) => {
                    message.reply("Cow goess SKRRRR");
                }
            }
        ]
    };
};



module.exports = {
    MessageController
}