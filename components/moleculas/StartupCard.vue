<template>
  <div class="startup-card" :class="i > 3 ? 'startup-card_animation' : ''">
    <div class="startup-card__started">
      <div
        class="startup-card__started-title"
        :class="card.state === 'in_progress' ? 'started' : ''"
      >
        {{ card.state | capitalize }}
      </div>
    </div>
    <div class="startup-card-content">
      <h2 class="startup-card__started-name">{{ card.title }}</h2>
      <h3 class="startup-card__started-text">
        {{ card.description | truncate(70, "...") }}
      </h3>
      <div class="startup-card__started-technologys">
        <ul class="startup-card__started-technologys-items">
          <li
            v-for="skill in card.technologies"
            :key="skill.id"
            class="startup-card__started-technology"
          >
            {{ skill.title }}
          </li>
        </ul>
      </div>
      <div class="startup-card__started-start-time">
        <div class="started-start-time__start">
          <h3>Start</h3>
          <p>{{ card.start_date | formatDate }}</p>
        </div>
        <div class="started-start-time__duration">
          <h3>Duration</h3>
          <p>{{ card.duration }} days</p>
        </div>
      </div>
      <div class="startup-block__buttons">
        <U-button
          :button-name="'Details'"
          :button-class="'u-button-gray'"
        ></U-button>
        <U-button
          :button-name="'Apply'"
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
