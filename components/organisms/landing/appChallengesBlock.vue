<template>
  <div class="startup-block challenges">
    <div class="startup-block-content">
      <div class="startup-block-content__head">
        <h2>Challenges</h2>
        <nuxt-link to="/challenges" class="startup-block-button">
          <span>See All Challenges</span>
          <img src="~/assets/img/arrow.svg" alt="" />
        </nuxt-link>
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
            @click="$emit('slideRight')"
          >
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
          <button
            type="button"
            class="slider-button"
            @click="$emit('slideLeft')"
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
        <ChallengeCard
          v-for="card in cards"
          :key="card.id"
          v-touch:swipe="$device.isMobile ? touchHandler : ''"
          v-touch-class="$device.isMobile ? 'active' : ''"
          :card="card"
          :user-id="userId"
          :is-expert="isExpert"
          :user-challenges="userChallenges"
          :feed-back-for-challenges="feedBackForChallenges"
        ></ChallengeCard>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Challenge } from "~/models/Challenge";
import ChallengeCard from "~/components/molecules/challengeCard.vue";
import { userChallenges } from "~/models/UserChallenges";
import { AskFeedbacks } from "~/models/AskFeedbacks";

@Component({
  components: {
    ChallengeCard,
  },
})
export default class AppChallengesBlock extends Vue {
  @Prop() cards: Array<Challenge>;
  @Prop() userId: string;
  @Prop() userChallenges: Array<userChallenges>;
  @Prop() isExpert: Boolean;
  @Prop() feedBackForChallenges: Array<AskFeedbacks>;

  touchHandler(data) {
    if (data === "left") {
      this.$emit("slideLeft");
    } else if (data === "right") {
      this.$emit("slideRight");
    }
  }
}
</script>
<style lang="scss" scoped>
.challenge-card {
  transition: 0.2s;
  transform: scale(1);
  position: relative;

  .active {
    transform: scale3d(0.8, 0.8, 0.8);
    transition: 0.2s;
  }
}
</style>
