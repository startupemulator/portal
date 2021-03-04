<template>
  <div class="startup-card">
    <div class="startup-card-content">
      <h2 class="startup-card__started-name">
        {{ card.title }}
      </h2>
      <h3 class="startup-card__started-text">
        {{ card.description | truncate(70, "...") }}
      </h3>
      <div class="startup-card__started-technologys">
        <ul class="startup-card__started-technologys-items">
          <li class="startup-card__started-technology">Javascript</li>
          <li class="startup-card__started-technology">Java</li>
          <li class="startup-card__started-technology">HTML5</li>
          <li class="startup-card__started-technology">Javascript</li>
        </ul>
      </div>
      <div class="startup-block__buttons">
        <U-button
          :button-name="'Details'"
          :button-class="'u-button-gray'"
        ></U-button>
        <U-button
          :button-name="'Take Part'"
          :button-class="'u-button-blue'"
        ></U-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UButton from "../theme/UButton";
import { Startup } from "~/models/Startup";

@Component({
  components: { UButton },
})
export default class StartupCard extends Vue {
  @Prop() i: number;
  @Prop() card: Startup;
}
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
