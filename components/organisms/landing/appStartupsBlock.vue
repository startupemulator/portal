<template>
  <div class="startup-block">
    <div class="startup-block-content">
      <div class="startup-block-content__head">
        <h2>Startups</h2>
        <nuxt-link to="/startups" class="startup-block-button">
          <span>See All Startups</span>
          <img src="~/assets/img/arrow.svg" alt="arrow" />
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
            @click.prevent="slideLeft()"
          >
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
          <button
            type="button"
            class="slider-button"
            @click.prevent="slideRight()"
          >
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
    <div class="startup-block__startup-cards">
      <transition-group name="card" tag="div" class="transition__startup-card">
        <div v-for="card in cards" :key="card.id" class="card-move">
          <StartupCard
            v-touch:swipe="$device.isMobile ? touchHandler : ''"
            v-touch-class="$device.isMobile ? 'active' : ''"
            :card="card"
          ></StartupCard>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import { Startup } from "~/models/Startup";
import StartupCard from "~/components/molecules/startupCard.vue";

@Component({
  components: {
    StartupCard,
  },
})
export default class AppStartupsBlock extends Vue {
  @Prop() cards: Array<Startup>;

  touchHandler(data) {
    if (data === "left") {
      this.slideLeft();
    } else if (data === "right") {
      this.slideRight();
    }
  }

  slideRight() {
    this.$emit("slideRight");
  }

  slideLeft() {
    this.$emit("slideLeft");
  }
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
