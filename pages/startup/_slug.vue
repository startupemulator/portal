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
      @leaveProject="leaveProject"
      @saveReleaseLinks="updateReleaseLinks"
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
  async updateReleaseLinks() {
    //   try {
    //     const releases = await this.$releases(this.startup.id);
    //     if (releases !== null) {
    //       this.releases = releases;
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
  }

  async cancelApplication() {
    //   Spinner.show();
    //   try {
    //     const application = await this.$cancelApplication(this.applicationId);
    //     if (application !== null) {
    //       this.$router.push("/profile/projects");
    //     } else {
    //       Toast.show({
    //         data: "Something wrong!",
    //         duration: 3000,
    //       });
    //       Spinner.hide();
    //     }
    //     Spinner.hide();
    //   } catch (e) {
    //     console.error(e);
    //     Toast.show({
    //       data: e.message,
    //       duration: 3000,
    //     });
    //     Spinner.hide();
    //   }
  }

  async leaveProject() {
    //   Spinner.show();
    //   let applicationId = 0;
    //   this.applications.forEach((item) => {
    //     item.position.applications.forEach((el) => {
    //       if (
    //         (el.status === "accepted" && +this.$strapi.user.id === +el.user.id) ||
    //         (el.status === "advanced" && +this.$strapi.user.id === +el.user.id)
    //       ) {
    //         applicationId = el.id;
    //       }
    //     });
    //   });
    //   try {
    //     const leaveProject = await this.$cancelApplication(
    //       applicationId.toString()
    //     );
    //     if (leaveProject !== null) {
    //       this.$router.push("/profile/projects");
    //     }
    //   } catch (e) {
    //     console.error(e);
    //     Toast.show({
    //       data: e.message,
    //       duration: 3000,
    //     });
    //     Spinner.hide();
    //   }
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
