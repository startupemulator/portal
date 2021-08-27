<template v-cloak>
  <div class="projects">
    <Spiner :loading="loading"></Spiner>
    <MyProjects
      :key="updateFlag"
      :startups="myStartups"
      :user-id="userId"
      :is-super-admin="isSuperAdmin"
      @deleteDraft="deleteDraft"
    ></MyProjects>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import Toast from "~/store/modules/Toast";
import Spiner from "~/components/molecules/spiner.vue";

import myProjects from "~/components/organisms/myprojects/myProjects.vue";

@Component({
  components: {
    myProjects,
    Spiner,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  userId: Number = this.$strapi.user.id;
  updateFlag = 0;
  loading = false;

  async asyncData({
    $myStartups,
    $startupByAcceptedApplication,
    $profile,
    $strapi,
    $feedbacksByStartupID,
  }) {
    const myStartups = await $myStartups($strapi.user.id);
    const userProfile = await $profile($strapi.user.id);
    const acceptedStartup = await $startupByAcceptedApplication(
      $strapi.user.id
    );
    if (myStartups !== null) {
      for (const startup of myStartups) {
        if (startup.state === "in_progress") {
          startup.newFeedbacks = 0;
          const feedback = await $feedbacksByStartupID(startup.id);
          if (feedback !== null && feedback.length !== 0) {
            feedback.forEach((el) => {
              if (!el.is_public) {
                myStartups.forEach((item) => {
                  if (+item.id === +el.request.startup.id) {
                    ++item.newFeedbacks;
                  }
                });
              }
            });
          }
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
              (el.status === "accepted" || el.status === "advanced")
            ) {
              myStartups.push(item);
            }
          })
        );
      });
    }

    return {
      myStartups,
      acceptedStartup,
      isSuperAdmin,
    };
  }

  async deleteDraft(id, startupName) {
    this.loading = true;
    try {
      const moveAwayStartup = await this.$startupById(id);
      if (startupName === moveAwayStartup.title) {
        const deleteDraft = await this.$deleteDraft(id);
        if (deleteDraft !== null) {
          this.myStartups = await this.$myStartups(this.$strapi.user.id);
          this.loading = false;
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

  @Watch("myStartups")
  startupUpdate() {
    this.updateFlag += 1;
  }
}
</script>
