<template>
  <div v-cloak class="startups-page">
    <Spiner :loading="loading"></Spiner>
    <Startups
      :key="updatableKey"
      :startups="startupsList"
      :technologies="technologies"
      :empty-state="emptyState"
      :user-id="userId"
      :is-expert="isExpert"
      :autorizated="autorizated"
      :waiting-feedback="waitingFeedback"
      @pickedTechnologies="filterStartupsList"
      @cleanFilter="cleanFilter"
      @filterByPosition="filterByPosition"
    ></Startups>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Spiner from "~/components/molecules/spiner.vue";
import Startups from "~/components/organisms/startups/startups.vue";

@Component({
  components: {
    Startups,
    Spiner,
  },
})
export default class extends Vue {
  // data loaded here will be added during server rendering
  emptyState = false;
  loading = false;
  position = 1;
  isExpert = false;
  updatableKey = 1;
  autorizated = !!this.$strapi.user;
  userId: Number = this.$strapi.user ? this.$strapi.user.id : null;

  async asyncData({
    $technologies,
    $startups,
    $profile,
    $askFeedbacksForStartup,
    $strapi,
  }) {
    const { startups } = await $startups();
    const { technologies } = await $technologies();

    const startupsList = await startups;
    const stateForFilterStartupsByPositions = await startups;
    let userProfile = [];
    if ($strapi.user) {
      userProfile = await $profile($strapi.user.id);
    }
    const waitingFeedbackState = await $askFeedbacksForStartup();

    const waitingFeedback = waitingFeedbackState.filter(
      (v, i, a) =>
        a.findIndex(
          (t) => t.startup.id === v.startup.id && t.startup.state !== "finished"
        ) === i
    );
    return {
      startupsList,
      technologies,
      stateForFilterStartupsByPositions,
      startups,
      waitingFeedback,
      userProfile,
      waitingFeedbackState,
    };
  }

  filterByPosition(data) {
    this.loading = true;
    this.position = data;
    const positionStatus = data === 0 ? "open" : "staffed";

    const startupListFiltredByPosition = [];
    this.stateForFilterStartupsByPositions.forEach((item) => {
      if (
        item.state !== "finished" &&
        positionStatus === "open" &&
        item.positions.some((el) => el.status === positionStatus)
      ) {
        startupListFiltredByPosition.push(item);
      } else if (
        (item.state === "finished" && positionStatus === "staffed") ||
        (positionStatus === "staffed" &&
          item.positions.every((el) => el.status === positionStatus))
      ) {
        startupListFiltredByPosition.push(item);
      }
    });
    this.startupsList = startupListFiltredByPosition.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );
    // this.checkAskFeedBacks();
    if (this.startupsList.length === 0) {
      this.emptyState = true;
    } else {
      this.emptyState = false;
    }

    setTimeout(() => (this.loading = false), 300);
  }

  cleanFilter() {
    this.loading = true;

    this.stateForFilterStartupsByPositions = this.startups;
    this.filterByPosition(this.position);
    setTimeout(() => (this.loading = false), 300);
  }

  async filterStartupsList(data) {
    this.loading = true;
    const technologies = [];

    data.forEach((el) => technologies.push(el[1]));

    if (technologies.length > 0) {
      const newData = await this.$filterStartup(technologies);

      this.startupsList = newData.filter((el) => el.state !== "review");
      this.stateForFilterStartupsByPositions = newData.filter(
        (el) => el.state !== "review"
      );
      if (this.stateForFilterStartupsByPositions.length === 0) {
        this.emptyState = true;
      } else {
        this.emptyState = false;
      }
      this.filterByPosition(this.position);

      this.loading = false;
    } else {
      const { startups } = await this.$startups();
      this.startupsList = startups;
      this.stateForFilterStartupsByPositions = startups;
      this.filterByPosition(this.position);

      this.loading = false;
    }
  }

  mounted() {
    this.filterByPosition(this.position);
    if (this.userProfile.is_expert !== undefined) {
      this.isExpert = this.userProfile.is_expert;
    }

    this.updatableKey += 1;
    this.checkAskFeedBacks();
  }

  checkAskFeedBacks() {
    if (this.isExpert) {
      const stateWaitingForFeedback = [];

      this.startupsList.forEach((el) => {
        if (
          this.waitingFeedbackState.some(
            (item) => item.startup.id === el.id && el.state !== "finished"
          )
        ) {
          stateWaitingForFeedback.push(el);
        }
      });
      this.waitingFeedback = stateWaitingForFeedback;
    }
  }
}
</script>
