<template>
  <div class="startups-page">
    <Startup-Page
      :startup="Startup.startup"
      :feedbacks="Startup.feedbacks"
      :applications="Startup.applications"
      :is-owner="Startup.isOwner"
      :is-developer="Startup.isDeveloper"
      :is-expert="Startup.isExpert"
      :developer-position="Startup.developerPosition"
      :estimations="Startup.estimations"
      :technologies="Startup.technologies"
      :specialisations="Startup.specialisations"
      :user-id="Startup.profile.length !== 0 ? Startup.profile.user.id : ''"
      :ask-feedbacks="Startup.askFeedbacks"
      :directions="Startup.directions"
      :badges="Startup.badges"
      :releases="Startup.releases"
      :notification="Startup.notification"
      @deleteStartup="deleteStartup"
      @cancelApplication="cancelApplication"
    ></Startup-Page>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Spinner from "../../store/modules/Spinner";
import StartupPage from "~/components/organisms/startup/startup.vue";
import Toast from "~/store/modules/Toast";
import { Startup } from "~/store";

@Component({
  components: {
    StartupPage,
  },
})
export default class extends Vue {
  Startup;
  constructor() {
    super();
    this.Startup = Startup;
  }

  async asyncData(context) {
    await Startup.init(context);
  }

  title: string;

  async cancelApplication() {
    Spinner.show();
    await Startup.cancelApplication(this);
    this.$router.push("/profile/projects");
    Spinner.hide();
  }

  async deleteStartup(id, startupName) {
    Spinner.show();
    if (Startup.startup.title === startupName) {
      await Startup.deleteStartup({
        context: this,
        id,
        startupName,
      });
      console.log(Startup.startup.state);
      if (Startup.startup.state === "removed") {
        this.$nuxt.$router.push("/profile/projects");
      }
    } else {
      Toast.show({
        data: "Fill the startup name correctly.",
        duration: 3000,
      });
    }
    Spinner.hide();
  }

  head() {
    return {
      title: Startup.startup.title,
    };
  }
}
</script>
