using {
   GameAnnouncer,
   ReturnTypes
} from '../../db/models';

service GameAnnouncerService {
   entity UserSet as projection on GameAnnouncer.user;
   entity ChannelSet as projection on GameAnnouncer.channel;
   entity GuildSet as projection on GameAnnouncer.guild;
   action unsubscribe(ID : String) returns ReturnTypes.genericResponse
}
