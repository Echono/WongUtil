class MessageHandler {

    constructor(client, functions = []) {
        this.client = client;
        this.subscriptions = functions;
        this._createMessageCreateEvent();
    };

    _createMessageCreateEvent = () => {
        this.client.on("messageCreate", (message) => {
            if(message.author !== message.client.user)
                this._triggerSubs(message); 
        });
    };

    _triggerSubs = (message) => {
        this.subscriptions.forEach((fnObject) => {
            if(fnObject.trigger.toLowerCase() === message.content.toLowerCase()) {
                fnObject.callback(message);
            }
        });
    }; 

}

module.exports = {
    MessageHandler
}