<template>
  <div class="startups-page">
    <Request-To-Team
      :update-key="updateKey"
      :startup="startup"
      @accept="accept"
      @decline="decline"
      @advancedAccess="advancedAccess"
    ></Request-To-Team>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Spinner from "../../../store/modules/Spinner";
import RequestToTeam from "~/components/organisms/startup/requestsToTeam.vue";
import { Startup } from "~/models/Startup";
import Toast from "~/store/modules/Toast";

@Component({
  components: {
    RequestToTeam,
  },
})
export default class TakeStartup extends Vue {
  startup: Array<Startup>;
  updateKey: Number = 0;
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
        flag === "advanced" || flag === "decline" ? "default" : "feedback",
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
    Spinner.show();
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
      Spinner.hide();
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      Spinner.hide();
    }
  }

  async decline(id, declinetext) {
    Spinner.show();
    try {
      const decline = await this.$applicationDecline(id, declinetext);
      if (decline) {
        const startup = await this.$startupById(this.startup.id);
        const { applications } = await this.$applicationsByStartupId(
          this.startup.id
        );
        this.startup = startup;
        const recipients = applications.filter(
          (el) => el.status === "accepted" || el.status === "advanced"
        );
        this.createNotification(recipients, "decline");
        Spinner.hide();
        this.updateKey += 1;
      } else {
        Toast.show({
          data: "Something wrong!",
          duration: 3000,
        });
        Spinner.hide();
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      Spinner.hide();
    }
  }

  async advancedAccess(id) {
    Spinner.show();
    try {
      const advancedAccess = await this.$applicationAdvancedAccess(id);
      if (advancedAccess !== null) {
        const startup = await this.$startupById(this.startup.id);
        const { applications } = await this.$applicationsByStartupId(
          this.startup.id
        );
        if (startup !== null) {
          this.startup = startup;
        }
        if (applications !== null) {
          const recipient = applications.filter(
            (el) => el.status === "accepted" || el.status === "advanced"
          );
          this.createNotification(recipient, "advanced");
        }
      }
      Spinner.hide();
      this.updateKey += 1;
    } catch (e) {
      console.error(e);
    }
  }

  head() {
    return {
      title: this.startup.title,
    };
  }
}
</script>
