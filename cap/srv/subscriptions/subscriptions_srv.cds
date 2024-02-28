using {
   Subscriptions.user as user,
   ReturnTypes
} from '../../db/models';

service SubscriptionService {

   entity UserSet as projection on user;
   action unsubscribe(ID : String) returns ReturnTypes.genericResponse

}
