<template>
  <div class="startups-page">
    <!-- <pre style="color: #fff">    {{ startup }}</pre> -->
    <Spiner :loading="loading"></Spiner>
    <StartupPage
      :startup="startup"
      :feedbacks="feedbacks"
      :applications="applications"
      :is-owner="isOwner"
      :is-developer="isDeveloper"
      :developer-position="developerPosition"
      :estimations="estimations"
      @deleteStartup="deleteStartup"
      @cancelApplication="cancelApplication"
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
  developerPosition = "";
  applicationId = "";
  loading = false;

  async asyncData({
    $startup,
    $feedbacks,
    $applicationsByStartupId,
    route,
    $estimations,
  }) {
    const startup = await $startup(route.params.slug);
    const feedbacks = await $feedbacks();
    const { applications } = await $applicationsByStartupId(startup.id);
    const { estimations } = await $estimations();

    return { startup, feedbacks, applications, estimations };
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

  mounted() {
    if (this.$strapi.user && +this.$strapi.user.id === +this.startup.owner.id) {
      this.isOwner = true;
    }
    this.applications.forEach((item) => {
      item.position.applications.forEach((el) => {
        if (el.status === "accepted" && +this.$strapi.user.id === +el.user.id) {
          this.applicationId = el.id;
          this.isDeveloper = true;
          this.developerPosition = item.position.specialisation.title;
        }
      });
    });
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
}
</script>
