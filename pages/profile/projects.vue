<template>
  <div class="projects" :class="myStartups.length === 0 ? 'full-screen' : ''">
    <My-Projects
      :key="updateFlag"
      :startups="myStartups"
      :user-id="userId"
      :is-super-admin="isSuperAdmin"
      @deleteDraft="deleteDraft"
    ></My-Projects>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import Spinner from "../../store/modules/Spinner";
import Toast from "~/store/modules/Toast";

import MyProjects from "~/components/organisms/myprojects/myProjects.vue";

@Component({
  components: {
    MyProjects,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  userId: Number = this.$strapi.user.id;
  updateFlag = 0;

  async asyncData({
    $myStartups,
    $startupByAcceptedApplication,
    $profile,
    $strapi,
    $newFeedbacksByStartupID,
  }) {
    let myStartups = await $myStartups($strapi.user.id);

    const userProfile = await $profile($strapi.user.id);
    const acceptedStartup = await $startupByAcceptedApplication(
      $strapi.user.id
    );
    if (myStartups !== null) {
      for (const startup of myStartups) {
        if (startup.state === "in_progress") {
          const newFeedbacksByStartupID = await $newFeedbacksByStartupID(
            startup.id
          );
          startup.newFeedbacks = newFeedbacksByStartupID.length;
        }
      }
    }

    let isSuperAdmin = false;
    if (userProfile !== null && userProfile.gardenkeeper !== null) {
      isSuperAdmin = userProfile.gardenkeeper;
    }
    if (acceptedStartup !== null) {
      acceptedStartup.forEach((item) => {
        item.positions.forEach((el) =>
          el.applications.forEach((el) => {
            if (
              +el.user.id === +$strapi.user.id &&
              (el.status === "accepted" ||
                el.status === "advanced" ||
                el.status === "waiting" ||
                el.status === "declined")
            ) {
              myStartups.push(item);
            }
          })
        );
      });
      myStartups = myStartups.filter(
        (el, i, startups) =>
          startups.findIndex((item) => item.id === el.id) === i
      );
    }
    myStartups.sort((a, b) => b.id - a.id);
    return {
      myStartups,
      acceptedStartup,
      isSuperAdmin,
    };
  }

  async deleteDraft(id, startupName) {
    Spinner.show();
    try {
      const moveAwayStartup = await this.$startupById(id);
      if (startupName === moveAwayStartup.title) {
        const deleteDraft = await this.$deleteDraft(id);
        if (deleteDraft !== null) {
          this.myStartups = await this.$myStartups(this.$strapi.user.id);
          Spinner.hide();
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
    this.updateFlag += 1;
  }
}
</script>
