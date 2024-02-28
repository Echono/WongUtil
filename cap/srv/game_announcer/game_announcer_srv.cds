using {
   GameAnnouncer.user as user,
   ReturnTypes
} from '../../db/models';

service GameAnnouncerService {

   entity UserSet as projection on user;
   action unsubscribe(ID : String) returns ReturnTypes.genericResponse

}
