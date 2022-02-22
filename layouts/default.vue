<template>
  <div>
    <App-Header
      :current-route="$router.currentRoute.fullPath"
      :is-logined="Authenticated.isLogined"
      :notifications="notifications"
      :is-expert="isExpert"
      :new-notification-count="newNotificationCount"
      :notification-loading="notificationLoading"
      @markAllNotifications="markAllNotifications"
      @markNotificationIsReaded="markNotificationIsReaded"
      @filterNotificationByMyProjects="filterNotificationByMyProjects"
      @filterNotificationByFeedback="filterNotificationByFeedback"
    ></App-Header>
    <Nuxt />
    <App-Footer></App-Footer>
    <Toast />
    <Spinner />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Gleap from "gleap";
import { UserNotification } from "../models/UserNotifications";
import Spinner from "../components/molecules/spinner.vue";
import AppFooter from "~/components/molecules/appFooter.vue";
import AppHeader from "~/components/molecules/appHeader.vue";
import Toast from "~/components/molecules/toast.vue";
import { Authenticated } from "~/store";

@Component({
  components: {
    AppHeader,
    AppFooter,
    Toast,
    Spinner,
  },
})
export default class extends Vue {
  Authenticated;
  constructor() {
    super();
    this.Authenticated = Authenticated;
  }

  user = this.$strapi.user ? this.$strapi.user.name : "";
  currentRoute = this.$router.currentRoute.name;
  notifications: Array<Partial<UserNotification>> = [];
  isExpert = false;
  notificationLoading = false;
  newNotificationCount: number = 0;
  notificationByMyProjects = false;
  notificationByFeedback = false;

  async downloadNotifications() {
    if (this.$strapi.user && this.$strapi.user.id) {
      try {
        this.notifications = await this.$userNotifications(
          this.$strapi.user.id
        );
        const profile = await this.$profile(this.$strapi.user.id);
        if (profile !== null && profile.is_expert !== false) {
          this.isExpert = true;
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  mounted() {
    this.$strapi.hook("userUpdated", (user) => {
      if (!user) {
        Gleap.clearIdentity();
      } else {
        Gleap.identify(user.username, {
          name: user.profile.name,
          email: user.email,
        });
      }
    });
    if (this.$strapi.user) {
      Gleap.identify(this.$strapi.user.username, {
        name: this.$strapi.user.profile.name,
        email: this.$strapi.user.email,
      });
    } else {
      Gleap.clearIdentity();
    }
    if (this.$strapi.getToken()) {
      this.downloadNotifications();
      this.checkNewNotifications();
    }
    Authenticated.init(this);
  }

  async markNotificationIsReaded(id) {
    try {
      await this.$markReadNotification(id);
      const updateNotifications = await this.$userNotifications(
        this.$strapi.user.id
      );
      if (updateNotifications !== null) {
        this.notifications = updateNotifications;
      }
      this.checkNotificationCount();
    } catch (e) {
      console.error(e);
    }
  }

  async markAllNotifications() {
    this.notificationLoading = true;
    const notViewvedNotifications = this.notifications.filter(
      (el) => el.viewed === false
    );
    if (notViewvedNotifications.length !== 0) {
      for (const notViewvedNotification of notViewvedNotifications) {
        await this.$markReadNotification(notViewvedNotification.id);
      }
      try {
        const updateNotifications = await this.$userNotifications(
          this.$strapi.user.id
        );
        if (updateNotifications !== null) {
          this.notifications = updateNotifications;
        }
        this.notificationLoading = false;
      } catch (e) {
        console.error(e);
        this.notificationLoading = false;
      }
    }
    this.checkNotificationCount();

    this.notificationLoading = false;
  }

  get state() {
    return this.$store.state;
  }

  async checkNewNotifications() {
    if (this.$strapi.user !== null) {
      try {
        const newNotifications = await this.$userNotifications(
          this.$strapi.user.id
        );
        if (
          newNotifications !== null &&
          newNotifications.filter((el) => el.viewed === false).length !== 0
        ) {
          this.notifications = newNotifications;
          this.notificationFilter(this.notifications);
          this.checkNotificationCount();

          setTimeout(this.checkNewNotifications, 30000);
        } else {
          setTimeout(this.checkNewNotifications, 30000);
        }
      } catch (e) {
        console.error(e);
        setTimeout(this.checkNewNotifications, 30000);
      }
    }
  }

  notificationFilter(notifications) {
    if (this.notificationByMyProjects) {
      this.notifications = notifications.filter(
        (el) => el.notification.type !== "feedback"
      );
    } else if (this.notificationByFeedback) {
      this.notifications = notifications.filter(
        (el) => el.notification.type === "feedback"
      );
    }
  }

  checkNotificationCount() {
    this.newNotificationCount = this.notifications.filter(
      (el) => el.viewed === false
    ).length;
  }

  async filterNotificationByMyProjects() {
    this.notificationByMyProjects = true;
    this.notificationByFeedback = false;
    this.notificationLoading = true;
    try {
      this.notifications = await this.$userNotifications(this.$strapi.user.id);
      this.notificationLoading = false;
    } catch (e) {
      console.error(e);
      this.notificationLoading = false;
    }

    this.notificationFilter(this.notifications);
  }

  async filterNotificationByFeedback() {
    this.notificationByMyProjects = false;
    this.notificationByFeedback = true;
    this.notificationLoading = true;
    try {
      this.notifications = await this.$userNotifications(this.$strapi.user.id);
      this.notificationLoading = false;
    } catch (e) {
      console.error(e);
      this.notificationLoading = false;
    }
    this.notificationFilter(this.notifications);
  }
}
</script>
