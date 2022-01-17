<template>
  <div class="startups-page">
    <Request-To-Team
      :startup="startup"
      @updateTeamRequest="updateTeamRequest"
    ></Request-To-Team>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Spinner from "../../../store/modules/Spinner";
import RequestToTeam from "~/components/organisms/startup/requestsToTeam.vue";
import { Startup } from "~/models/Startup";
import Toast from "~/store/modules/Toast";
import { Startup as StartupAction } from "~/store";

@Component({
  components: {
    RequestToTeam,
  },
})
export default class TakeStartup extends Vue {
  StartupAction;
  constructor() {
    super();
    this.StartupAction = StartupAction;
  }

  startup: Array<Startup>;

  userId = this.$strapi.user ? this.$strapi.user.id : "";

  async asyncData({ $startup, route }) {
    const startup = await $startup(route.params.slug);
    return {
      startup,
    };
  }

  async updateTeamRequest({ id, declineReason, status, positionCount }) {
    Spinner.show();
    await StartupAction.changePremission({
      context: this,
      permission: status,
      applicationId: id,
      declineReason,
      positionCount,
    });
    try {
      const startup = await this.$startupById(this.startup.id);
      const { applications } = await this.$applicationsByStartupId(
        this.startup.id
      );

      this.startup = startup;
      const recipients = applications.filter(
        (el) => el.status === "accepted" || el.status === "advanced"
      );
      if (status === "Decline") {
        this.createNotification(recipients, "decline");
      } else if (status === "Advanced access") {
        this.createNotification(recipients, "advanced");
      } else {
        this.createNotification(recipients, "accept");
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
    }
    Spinner.hide();
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

  head() {
    return {
      title: this.startup.title,
    };
  }
}
</script>
