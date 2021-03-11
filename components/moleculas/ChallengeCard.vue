<template>
  <div class="startup-card">
    <div v-show="!!card.state" class="startup-card__started">
      <div class="startup-card__started-state">
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
          <!-- {{ card.state.split("_").join(" ") | capitalize }} -->
        </div>
      </div>
    </div>
    <div class="startup-card-content">
      <h2 class="startup-card__started-name">
        {{ card.title }}
      </h2>
      <h3 class="startup-card__started-text">
        {{ card.description | truncate(70, "...") }}
      </h3>
      <div class="startup-card__started-technologies">
        <ul class="startup-card__started-technologies-items">
          <li
            v-for="item in card.specialisations"
            :key="item.id"
            class="startup-card__started-technology"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="startup-block__buttons">
        <nuxt-link :to="'/challenge/' + card.slug">
          <U-button
            :button-name="'Details'"
            :button-class="'u-button-gray'"
          ></U-button>
        </nuxt-link>
        <nuxt-link :to="'/challenge/accept/' + card.slug">
          <U-button
            :button-name="'Accept'"
            :button-class="'u-button-blue'"
          ></U-button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UButton from "../theme/uButton.vue";
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
