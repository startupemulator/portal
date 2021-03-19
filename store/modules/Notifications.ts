import {
  Module,
  VuexAction,
  VuexModule,
  VuexMutation,
} from "nuxt-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Context } from "@nuxt/types";
import { Notification } from "../../models/Notification";
import { store } from "~/store";

interface NotificationsState {
  notification: Array<Notification>;
}

@Module({ dynamic: true, store, name: "Notifications", namespaced: true })
class Notifications extends VuexModule implements NotificationsState {
  public notifications: Array<Notification> = [];

  @VuexMutation
  public apply(notifications: Array<Notification>) {
    this.notifications = notifications;
  }

  @VuexAction({ commit: "apply", rawError: true })
  public async fetch(context: Context) {
    return await context.$strapi.find("notifications");
  }
}

export default getModule(Notifications);
