<template>
  <div class="startups-page">
    <StartupPage
      :startup="startup"
      :feedbacks="feedbacks"
      :applications="applications"
      :is-owner="isOwner"
      :is-developer="isDeveloper"
      :is-expert="isExpert"
      :developer-position="developerPosition"
      :estimations="estimations"
      :technologies="technologies"
      :specialisations="specialisations"
      :user-id="userId"
      :ask-feedbacks="askFeedbacks"
      :directions="directions"
      :badges="badges"
      :releases="releases"
      :notification="notification"
      @deleteStartup="deleteStartup"
      @cancelApplication="cancelApplication"
      @leaveProject="leaveProject"
      @saveReleaseLinks="updateReleaseLinks"
    ></StartupPage>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Spinner from "../../store/modules/Spinner";
import StartupPage from "~/components/organisms/startup/startup.vue";
import { Startup } from "~/models/Startup";
import Toast from "~/store/modules/Toast";

@Component({
  components: {
    StartupPage,
  },
})
export default class TakeStartup extends Vue {
  startup: Startup;
  isOwner = false;
  isDeveloper = false;
  isExpert = false;
  developerPosition = "";
  applicationId = "";
  userId = this.$strapi.user ? this.$strapi.user.id : "";
  title: string;
  notification: string = this.$route.params.notification
    ? this.$route.params.notification
    : "empty";

  async asyncData({
    $startup,
    $feedbacksByStartupID,
    $applicationsByStartupId,
    route,
    $estimations,
    $specialisations,
    $technologies,
    $askFeedbacksByStartupId,
    $strapi,
    $directions,
    $badges,
    $releases,
    $profile,
  }) {
    const startup = await $startup(route.params.slug);
    const feedbacks = await $feedbacksByStartupID(startup.id);
    const askFeedbacks = await $askFeedbacksByStartupId(startup.id);
    const { applications } = await $applicationsByStartupId(startup.id);
    const { estimations } = await $estimations();
    const { specialisations } = await $specialisations();
    const { technologies } = await $technologies();
    const title = startup.description;
    let releases = [];
    let userProfile = [];
    if ($strapi.user) {
      userProfile = await $profile($strapi.user.id);
    }
    if (startup.state === "finished") {
      releases = await $releases(startup.id);
    }
    let directions = [];
    let badges = [];
    if ($strapi.user) {
      directions = await $directions();
      badges = await $badges();
      badges.forEach((badge) => (badge.isActive = false));
    }

    return {
      startup,
      feedbacks,
      applications,
      estimations,
      specialisations,
      technologies,
      askFeedbacks,
      directions,
      badges,
      releases,
      title,
      userProfile,
    };
  }

  async updateReleaseLinks() {
    try {
      const releases = await this.$releases(this.startup.id);
      if (releases !== null) {
        this.releases = releases;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async cancelApplication() {
    Spinner.show();

    try {
      const application = await this.$cancelApplication(this.applicationId);
      if (application !== null) {
        this.$router.push("/profile/projects");
      } else {
        Toast.show({
          data: "Something wrong!",
          duration: 3000,
        });
        Spinner.hide();
      }
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

  async leaveProject() {
    Spinner.show();

    let applicationId = 0;
    this.applications.forEach((item) => {
      item.position.applications.forEach((el) => {
        if (
          (el.status === "accepted" && +this.$strapi.user.id === +el.user.id) ||
          (el.status === "advanced" && +this.$strapi.user.id === +el.user.id)
        ) {
          applicationId = el.id;
        }
      });
    });
    try {
      const leaveProject = await this.$cancelApplication(
        applicationId.toString()
      );
      if (leaveProject !== null) {
        this.$router.push("/profile/projects");
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

  mounted() {
    document.title = this.startup.title;
    if (this.$strapi.user && +this.$strapi.user.id === +this.startup.owner.id) {
      this.isOwner = true;
    }
    if (this.$strapi.user) {
      this.applications.forEach((item) => {
        item.position.applications.forEach((el) => {
          if (
            el.status === "accepted" &&
            +this.$strapi.user.id === +el.user.id
          ) {
            this.applicationId = el.id;
            this.isDeveloper = true;
            this.developerPosition = item.position.specialisation.title;
          } else if (
            el.status === "advanced" &&
            +this.$strapi.user.id === +el.user.id
          ) {
            // if advanced need give acsess like owner
            this.isOwner = true;
          }
        });
      });
    }
    if (
      this.$strapi.user &&
      this.$strapi.user.email &&
      this.startup.owner.invites
    ) {
      this.isExpert = this.userProfile.is_expert;
      // this.startup.owner.invites.forEach((el) => {
      //   if (el.email === this.$strapi.user.email) {
      //     this.isExpert = true;
      //   }
      // });
    }
  }

  beforeDestroy() {
    document.title = "StartupEmulator - training platform for developers";
  }

  async deleteStartup(id, startupName) {
    Spinner.show();
    try {
      const moveAwayStartup = await this.$startupById(id);
      if (startupName === moveAwayStartup.title) {
        const deleteDraft = await this.$deleteDraft(id);
        if (deleteDraft !== null) {
          this.myStartups = await this.$myStartups(this.$strapi.user.id);
          Spinner.hide();
          this.$nuxt.$router.push("/profile/projects");
        }
      } else {
        Toast.show({
          data: "Fill the startup name correctly.",
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

  head() {
    return {
      title: this.title,
    };
  }
}
</script>
