<template>
  <div>
    <App-Header
      :current-route="currentRoute"
      :is-logined="!!$strapi.getToken()"
      :user="$strapi.user"
      :notifications="notifications"
      :is-expert="isExpert"
      :new-notification-count="newNotificationCount"
      :notification-loading="notificationLoading"
      @markAllNotifications="markAllNotifications"
      @markNotificationIsReaded="markNotificationIsReaded"
      @filterNotificationByMyProjects="filterNotificationByMyProjects"
      @filterNotificationByFeedback="filterNotificationByFeedback"
    ></App-Header>
    <div style="display: none; color: #3cc28d">{{ $strapi.getToken() }}</div>
    <div style="display: none; color: #3cc28d">{{ !!$strapi.getToken() }}</div>
    <Nuxt />
    <App-Footer></App-Footer>
    <Toast />
    <Spinner />
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "nuxt-property-decorator";
import { UserNotification } from "../models/UserNotifications";
import Spinner from "../components/molecules/spinner.vue";
import AppFooter from "~/components/molecules/appFooter.vue";
import AppHeader from "~/components/molecules/appHeader.vue";
import Toast from "~/components/molecules/toast.vue";

@Component({
  components: {
    AppHeader,
    AppFooter,
    Toast,
    Spinner,
  },
})
export default class extends Vue {
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

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange() {
    this.currentRoute = this.$router.currentRoute.fullPath;
  }

  @Watch("$strapi", { immediate: true, deep: true })
  onLogin() {
    this.user = this.$strapi.user ? this.$strapi.user.name : "";

    if (this.$strapi.getToken()) {
      this.downloadNotifications();
      this.checkNewNotifications();
    }
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
    // flags for auto update
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
    // flags for auto update
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
