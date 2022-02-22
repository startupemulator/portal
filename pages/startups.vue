<template>
  <div v-cloak class="startups-page">
    <Spinner :loading="loading"></Spinner>

    <Startups
      :key="updatableKey"
      :startups="startupsList"
      :technologies="technologies"
      :empty-state="emptyState"
      :user-id="userId"
      :is-expert="isExpert"
      :authorized="authorized"
      :waiting-feedback="waitingFeedback"
      @pickedTechnologies="filterStartupsList"
      @cleanFilter="cleanFilter"
      @filterByPosition="filterByPosition"
    ></Startups>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Spinner from "../components/atoms/spinner.vue";
import Startups from "~/components/organisms/startups/startups.vue";

@Component({
  components: {
    Startups,
    Spinner,
  },
})
export default class extends Vue {
  emptyState = false;
  loading = false;
  position = 0;
  isExpert = false;
  updatableKey = 1;
  authorized = !!this.$strapi.user;
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
    if (technologies !== null) {
      technologies.forEach((technology) => (technology.isChecked = false));
    }
    const startupsList = await startups;
    const stateForFilterStartupsByPositions = await startups;
    let userProfile = [];
    let isExpert = false;
    if ($strapi.user) {
      userProfile = await $profile($strapi.user.id);
      isExpert = userProfile.is_expert;
    }
    let waitingFeedbackState = [];
    let waitingFeedback = [];
    if (isExpert) {
      waitingFeedbackState = await $askFeedbacksForStartup();

      waitingFeedback = waitingFeedbackState.filter(
        (v, i, a) =>
          a.findIndex(
            (t) =>
              t.startup.id === v.startup.id && t.startup.state !== "finished"
          ) === i
      );
    }
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

    if (this.startupsList.length === 0) {
      this.emptyState = true;
    } else {
      this.emptyState = false;
    }

    setTimeout(() => (this.loading = false), 300);
  }

  cleanFilter() {
    this.loading = true;
    this.technologies.forEach((technology) => (technology.isChecked = false));
    this.stateForFilterStartupsByPositions = this.startups;
    this.filterByPosition(this.position);
    setTimeout(() => (this.loading = false), 300);
  }

  async filterStartupsList(data) {
    this.loading = true;
    const technologies = [];

    data.forEach((el) => technologies.push(el.id));

    if (technologies.length > 0) {
      const newData = await this.$filterStartup(technologies);

      this.startupsList = newData;
      this.stateForFilterStartupsByPositions = newData;
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
