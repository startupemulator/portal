<template>
  <div class="startups-page">
    <Spiner :loading="loading"></Spiner>
    <RequestToTeam
      :update-key="updateKey"
      :startup="startup"
      @accept="accept"
      @decline="decline"
      @advancedAccess="advancedAccess"
    ></RequestToTeam>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import RequestToTeam from "~/components/organisms/startup/requestsToTeam.vue";
import { Startup } from "~/models/Startup";
import Spiner from "~/components/molecules/spiner.vue";
import Toast from "~/store/modules/Toast";

@Component({
  components: {
    Spiner,
    RequestToTeam,
  },
})
export default class TakeStartup extends Vue {
  startup: Array<Startup>;
  updateKey: Number = 0;
  loading = false;
  userId = this.$strapi.user ? this.$strapi.user.id : "";

  async asyncData({ $startup, route }) {
    const startup = await $startup(route.params.slug);
    return {
      startup,
    };
  }

  async createNotification(recipients, flag) {
    const comment =
      flag === "accept"
        ? "accepted new member"
        : flag === "requestFeedback"
        ? "requested feedback"
        : flag === "teamFeedback"
        ? "left team feedback"
        : flag === "advanced"
        ? "change users premission"
        : flag === "decline"
        ? "change users premission"
        : "";
    const link = this.startup.slug;
    try {
      const newNotification = await this.$createNotificationForStartup(
        this.userId,
        comment,
        link,
        "feedback",
        this.startup.id
      );
      if (newNotification !== null) {
        for (const recipient of recipients) {
          await this.$createUserNotification(
            recipient.user.id,
            newNotification.id
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async accept(id) {
    this.loading = true;
    try {
      const accept = await this.$applicationAccept(id);
      if (accept !== null) {
        const startup = await this.$startupById(this.startup.id);
        const { applications } = await this.$applicationsByStartupId(
          this.startup.id
        );
        this.startup = startup;
        const recipients = applications.filter(
          (el) => el.status === "accepted" || el.status === "advanced"
        );
        this.createNotification(recipients, "accept");
      }

      this.updateKey += 1;
      this.loading = false;
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      this.loading = false;
    }
  }

  decline() {}
  advancedAccess() {}
  beforeDestroy() {
    document.title = "StartupEmulator - training platform for developers";
  }

  head() {
    return {
      title: this.title,
    };
  }
}
</script>
