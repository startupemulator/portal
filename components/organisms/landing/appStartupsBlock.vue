<template>
  <div class="startup-block">
    <div class="startup-block-content">
      <div class="startup-block-content__head">
        <h2>Startups</h2>
        <nuxt-link to="/startups" class="startup-block-button">
          <!-- <button type="button" class="startup-block-button"> -->
          <span>See All Startups</span>
          <img src="~/assets/img/arrow.svg" alt="arrow" />
          <!-- </button> -->
        </nuxt-link>
      </div>
      <div class="startup-block-content__desktop-buttons">
        <h3>
          Find a startup that is going to work with technologies you need to get
          experience with. Then join a team and improve your skills with a
          feedback from our experts.
        </h3>
        <div class="desktop-buttons__slider">
          <button
            type="button"
            class="slider-button"
            @click="$emit('slideRigth', 'startups')"
          >
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
          <button
            type="button"
            class="slider-button"
            @click="$emit('slideLeft', 'startups')"
          >
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
    <div class="startup-block__startup-cards">
      <transition-group name="card" tag="div" class="transition__startup-card">
        <div v-for="card in cards" :key="card.id" class="card-move">
          <Startup-card
            :id="card.id"
            :key="card.id"
            v-touch:swipe="$device.isMobile ? touchHandler : ''"
            v-touch-class="$device.isMobile ? 'active' : ''"
            :card="card"
            :technology="technology"
            :user-id="userId"
            :waiting-feedback="card.state !== 'finished' ? waitingFeedback : []"
          ></Startup-card>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import { Startup } from "~/models/Startup";
import { Technology } from "~/models/Technology";
import StartupCard from "~/components/molecules/startupCard.vue";
import { AskFeedbacks } from "~/models/AskFeedbacks";

@Component({
  components: {
    StartupCard,
  },
})
export default class AppStartupsBlock extends Vue {
  @Prop() cards: Array<Startup>;
  @Prop() technology: Array<Technology>;
  @Prop() userId: string;
  @Prop() waitingFeedback: Array<AskFeedbacks>;

  touchHandler(data) {
    if (data === "left") {
      this.$emit("slideLeft", "startups");
    } else if (data === "right") {
      this.$emit("slideRigth", "startups");
    }
  }
  // touchHandler(data, event) {
  //   console.log(data, event.currentTarget);
  // }
}
</script>
<style lang="scss" scoped>
.card-move {
  transition: 0.2s;
  transform: scale(1);
  position: relative;
  .active {
    transform: scale3d(0.8, 0.8, 0.8);
    transition: 0.2s;
  }
}
</style>
