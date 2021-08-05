<template>
  <div>
    <AppHeader
      :current-route="currentRoute"
      :is-logined="isLogined"
      :user="user"
      :notifications="notifications"
      :is-expert="isExpert"
      @markAllNotifications="markAllNotifications"
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
import Notification from "~/models/Notification";
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
  async fetch() {
    if (this.$strapi.user) {
      this.notifications = await this.$userNotifications(this.$strapi.user.id);
      const profile = await this.$profile(this.$strapi.user.id);
      if (profile !== null && profile.is_expert !== false) {
        this.isExpert = true;
      }
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
  }

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange() {
    this.currentRoute = this.$router.currentRoute.fullPath;
  }

  @Watch("$strapi", { immediate: true, deep: true })
  onLogin() {
    this.isLogined = !!this.$strapi.user;
    this.user = this.$strapi.user ? this.$strapi.user.name : "";
  }

  get state() {
    return this.$store.state;
  }

  async checkNewNotifications() {
    try {
      const newNotifications = await this.$userNotifications(
        this.$strapi.user.id
      );
      if (
        newNotifications !== null &&
        newNotifications.filter((el) => el.viewed === false).length !== 0
      ) {
        this.notifications = newNotifications;
        setTimeout(this.checkNewNotifications, 30000);
      }
    } catch (e) {
      console.error(e);
    }
  }

  mounted() {
    this.checkNewNotifications();
  }
}
</script>
