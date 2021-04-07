<template>
  <div class="startup-block challenges">
    <div class="startup-block-content">
      <div class="startup-block-content__head">
        <h2>Challenges</h2>
        <button type="button" class="startup-block-button">
          <span>See All Challenges</span>
          <img src="~/assets/img/arrow.svg" alt="" />
        </button>
      </div>
      <div class="startup-block-content__desktop-buttons">
        <h3>
          Practise on single challenges while you are waiting for an appropriate
          startup. Complete tasks and get a feedback from our experts.
        </h3>
        <div class="desktop-buttons__slider">
          <button
            type="button"
            class="slider-button"
            @click="$emit('slideRigth', 'challenges')"
          >
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
          <button
            type="button"
            class="slider-button"
            @click="$emit('slideLeft', 'challenges')"
          >
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
    <div class="startup-block__startup-cards">
      <transition-group
        name="flip-list"
        tag="div"
        class="transition__startup-card"
      >
        <div
          v-for="card in cards"
          :key="card.id"
          class="startup-block__startup-card"
        >
          <ChallengeCard :card="card"></ChallengeCard>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Challenge } from "~/models/Challenge";
import ChallengeCard from "~/components/molecules/challengeCard.vue";

@Component({
  components: {
    ChallengeCard,
  },
})
export default class AppChallengesBlock extends Vue {
  @Prop() cards: Array<Challenge>;
}
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
