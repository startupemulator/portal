<template>
  <div class="startups-page">
    <Spiner :loading="loading"></Spiner>
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
import StartupPage from "~/components/organisms/startup/startup.vue";
import { Startup } from "~/models/Startup";
import Toast from "~/store/modules/Toast";
import Spiner from "~/components/molecules/spiner.vue";

@Component({
  components: {
    StartupPage,
    Spiner,
  },
})
export default class TakeStartup extends Vue {
  startup: Startup;
  isOwner = false;
  isDeveloper = false;
  isExpert = false;
  developerPosition = "";
  applicationId = "";
  loading = false;
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
    this.loading = true;

    try {
      const application = await this.$cancelApplication(this.applicationId);
      if (application !== null) {
        this.$router.push("/profile/projects");
      } else {
        Toast.show({
          data: "Something wrong!",
          duration: 3000,
        });
        this.loading = false;
      }
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

  async leaveProject() {
    this.loading = true;

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
      this.loading = false;
    }
  }

  mounted() {
    console.log(this.$route.params.notification);
    document.title = this.startup.title;
    if (this.$strapi.user && +this.$strapi.user.id === +this.startup.owner.id) {
      this.isOwner = true;
    }
    if (this.$strapi.user) {
      this.applications.forEach((item) => {
        item.position.applications.forEach((el) => {
          if (
            (el.status === "accepted" &&
              +this.$strapi.user.id === +el.user.id) ||
            (el.status === "advanced" && +this.$strapi.user.id === +el.user.id)
          ) {
            this.applicationId = el.id;
            this.isDeveloper = true;
            this.developerPosition = item.position.specialisation.title;
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
      this.startup.owner.invites.forEach((el) => {
        if (el.email === this.$strapi.user.email) {
          this.isExpert = true;
        }
      });
    }
  }

  beforeDestroy() {
    document.title = "StartupEmulator - training platform for developers";
  }

  async deleteStartup(id, startupName) {
    this.loading = true;
    try {
      const moveAwayStartup = await this.$startupById(id);
      if (startupName === moveAwayStartup.title) {
        const deleteDraft = await this.$deleteDraft(id);
        if (deleteDraft !== null) {
          this.myStartups = await this.$myStartups(this.$strapi.user.id);
          this.loading = false;
          this.$nuxt.$router.push("/profile/projects");
        }
      } else {
        Toast.show({
          data: "Fill the startup name correctly.",
          duration: 3000,
        });
        this.loading = false;
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      this.loading = false;
    }
  }

  head() {
    return {
      title: this.title,
    };
  }
}
</script>
