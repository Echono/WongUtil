context Subscriptions {

    entity user {
        key ID       : String;
            tag      : String;
            username : String;
    }

}

context ReturnTypes {

    type genericResponse {
        code    : Integer;
        message : String;
    }

}
