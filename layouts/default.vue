<template>
  <div>
    <AppHeader
      :key="isLogined"
      :current-route="currentRoute"
      :is-logined="isLogined"
      :user="user"
      :notifications="notifications"
      :is-expert="isExpert"
      :new-notification-count="newNotificationCount"
      @markAllNotifications="markAllNotifications"
      @markNotificationIsReaded="markNotificationIsReaded"
    ></AppHeader>

    <Nuxt />

    <AppFooter></AppFooter>
    <Spiner :loading="loading"></Spiner>
    <Toast />
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "nuxt-property-decorator";
import AppFooter from "~/components/molecules/appFooter.vue";
import AppHeader from "~/components/molecules/appHeader.vue";
import Toast from "~/components/molecules/toast.vue";
import { Notification } from "~/models/Notification";
import Spiner from "~/components/molecules/spiner.vue";

@Component({
  components: {
    AppHeader,
    AppFooter,
    Toast,
    Spiner,
  },
})
export default class extends Vue {
  isLogined = !!this.$strapi.user;
  user = this.$strapi.user ? this.$strapi.user.name : "";
  currentRoute = this.$router.currentRoute.name;
  notifications: Array<Notification> = [];
  isExpert = false;
  loading = false;
  newNotificationCount: number = 0;

  async downloadNotifications() {
    this.notifications = await this.$userNotifications(this.$strapi.user.id);
    const profile = await this.$profile(this.$strapi.user.id);
    if (profile !== null && profile.is_expert !== false) {
      this.isExpert = true;
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
    this.loading = true;
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
        this.loading = false;
      } catch (e) {
        console.error(e);
        this.loading = false;
      }
    }
    this.checkNotificationCount();

    this.loading = false;
  }

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange() {
    this.currentRoute = this.$router.currentRoute.fullPath;
  }

  @Watch("$strapi", { immediate: true, deep: true })
  onLogin() {
    this.isLogined = !!this.$strapi.user;
    this.user = this.$strapi.user ? this.$strapi.user.name : "";

    if (this.isLogined) {
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

  checkNotificationCount() {
    this.newNotificationCount = this.notifications.filter(
      (el) => el.viewed === false
    ).length;
  }
}
</script>
