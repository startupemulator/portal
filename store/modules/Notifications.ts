import {
  getModule,
  Module,
  VuexAction,
  VuexModule,
  VuexMutation,
} from "nuxt-property-decorator";
import { Store } from "vuex";
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
  public store: Store<Notification>;

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
    return await getNotifications(this.store.app.$axios);
  }
}

export default getModule(Notifications);
