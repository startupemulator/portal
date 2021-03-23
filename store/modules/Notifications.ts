import {
  getModule,
  Module,
  VuexAction,
  VuexModule,
  VuexMutation,
} from "nuxt-property-decorator";
import { getNotifications } from "../api";
import { Notification } from "../../models/Notification";
import { store } from "~/store";

interface NotificationsState {
  items: Array<Notification>;
}

@Module({
  dynamic: true,
  store,
  name: "Notification",
  namespaced: true,
  stateFactory: true,
})
class Notifications extends VuexModule implements NotificationsState {
  public items: Array<Notification> = [];

  @VuexMutation
  public apply(items: Array<Notification> = []) {
    this.items = items.map((notification) => {
      return {
        id: notification.id,
        user: notification.user,
      };
    });
  }

  @VuexAction({ commit: "apply", rawError: true })
  public async fetch() {
    return await getNotifications();
  }
}

export default getModule(Notifications);
