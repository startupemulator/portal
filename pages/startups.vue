<template>
  <div class="startups-page">
    <Spiner :loading="loading"></Spiner>

    <Startups
      :startups="startupsList"
      :staffed="staffed"
      :technologies="technologies"
      :empty-state="emptyState"
      :autorizated="autorizated"
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
  staffed = 0;
  autorizated = !!this.$strapi.user;

  async asyncData({ $technologies, $startups }) {
    const { startups } = await $startups();
    const { technologies } = await $technologies();
    const startupsList = await startups;
    const stateForFilterStartupsByPositions = await startups;

    return {
      startupsList,
      technologies,
      stateForFilterStartupsByPositions,
      startups,
    };
  }

  filterByPosition(data) {
    this.loading = true;
    this.position = data;
    const positionStatus = data === 0 ? "open" : "staffed";

    const startupListFiltredByPosition = [];
    this.stateForFilterStartupsByPositions.forEach((item) => {
      if (
        positionStatus === "open" &&
        item.positions.some((el) => el.status === positionStatus)
      ) {
        startupListFiltredByPosition.push(item);
      } else if (
        positionStatus === "staffed" &&
        item.positions.every((el) => el.status === positionStatus)
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
    console.log(this.startupsList);
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
    this.staffed = this.startupsList.length;
  }
}
</script>
