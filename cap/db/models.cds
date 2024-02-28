context GameAnnouncer {

    entity user {
        key ID           : String;
            tag          : String;
            username     : String;
            subscribedAt : Timestamp @cds.on.insert: $now;
    }

    entity channel {
        key ID           : String;
            name         : String;
            guild        : Association to one GameAnnouncer.guild;
            watchedSince : Timestamp @cds.on.insert: $now;
    }

    entity guild {
        key ID           : String;
            name         : String;
            channels     : Composition of many GameAnnouncer.channel
                               on channels.guild = $self;
            registeredAt : Timestamp @cds.on.insert: $now;

    }

}

context ReturnTypes {

    type genericResponse {
        code    : Integer;
        message : String;
    }

}
