<template>
  <div class="project-participant">
    <p>{{ position }}</p>
    <div class="specializacion_names">
      <button type="button" class="project-participant__team-button">
        <span>Full Name</span> <img src="~/assets/img/arrow.svg" alt="arrow" />
      </button>
      <button type="button" class="project-participant__team-button">
        <span>Name Surname</span>
        <img src="~/assets/img/arrow.svg" alt="arrow" />
      </button>
      <button type="button" class="project-participant__team-button">
        <span>First Name</span>
        <img src="~/assets/img/arrow.svg" alt="arrow" />
      </button>
      <button type="button" class="project-participant__team-button">
        <span>Last Name</span>
        <img src="~/assets/img/arrow.svg" alt="arrow" />
      </button>
    </div>
    <div class="project-participant_technologies">
      <Technology-item
        v-for="(technologi, i) in 4"
        :key="i"
        :technologi-id="i"
        :title="'JavaScript'"
      >
      </Technology-item>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UBack from "~/components/atoms/uBack.vue";
import TechnologyItem from "~/components/molecules/technologyItem.vue";
// import { Startup } from "~/models/Startup";

@Component({
  components: { UBack, TechnologyItem },
})
export default class AppHeader extends Vue {
  @Prop({ default: "Product Owners" }) position: String;
}
</script>

<style lang="scss" scoped>
.project-participant {
  padding-bottom: 24px;
  border-bottom: 1px solid #4e5a71;
  p {
    margin-top: 16px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  .project-participant__team-button {
    display: flex;
    align-items: center;
    padding: 4px 16px;
    background: #2e384a;
    box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
    border-radius: 12px;
    span {
      font-weight: normal;
      font-size: 16px;
      line-height: 32px;
    }
    img {
      margin-left: 16px;
    }
  }
  .specializacion_names {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
    .project-participant__team-button {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
  .project-participant_technologies {
    .technology-item {
      color: #b5c1d8;
      font-weight: normal;
      font-size: 14px;
      line-height: 32px;
      padding: 0 16px;
      margin-bottom: 8px;
    }
  }
}
.project-participant:last-child {
  border-bottom: 1px solid transparent;
}
</style>
