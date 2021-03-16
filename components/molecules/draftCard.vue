<template>
  <div class="startup-card startup-card--draft">
    <div class="startup-card__started">
      <div class="startup-card__started-state draft">
        <div
          class="startup-card__started-title"
          :class="
            card.state === 'in_progress'
              ? 'started'
              : card.state === 'finished'
              ? 'finished'
              : card.state === 'feedback'
              ? 'feedback'
              : ''
          "
        >
          Draft
        </div>
      </div>
    </div>
    <div class="startup-card-content">
      <h2 class="startup-card__started-name">{{ card.title }}</h2>
      <h3 class="startup-card__started-text">
        {{ card.description | truncate(90, "...") }}
      </h3>

      <div class="">
        <U-button
          type="button"
          :button-name="'Continue Creating'"
          class="u-button-blue"
        >
        </U-button>
        <U-button
          type="button"
          :button-name="'Delete Draft'"
          class="u-button-gray"
        >
        </U-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UButton from "../atoms/uButton.vue";
import { Challenge } from "../../models/Challenge";

@Component({
  components: { UButton },
})
export default class extends Vue {
  @Prop() i: number;
  @Prop() card: Challenge;
}
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
