<template>
  <div class="startup-block">
    <div class="startup-block-content">
      <div class="startup-block-content__head">
        <h2>Startups</h2>
        <button type="button" class="startup-block-button">
          <span>See All Startups</span>
          <img src="~/assets/img/arrow.svg" alt="" />
        </button>
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
          <startup-card
            :key="card.id"
            :card="card"
            :technology="technology"
          ></startup-card>
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

@Component({
  components: {
    StartupCard,
  },
})
export default class AppStartupsBlock extends Vue {
  @Prop() cards: Array<Startup>;
  @Prop() technology: Array<Technology>;

  // slideRigth() {
  //   const el = this.cards.pop();
  //   setTimeout(() => this.cards.unshift(el), 0);
  // }

  // slideLeft() {
  //   const el = this.cards.shift();
  //   setTimeout(() => this.cards.push(el), 0);
  // }
}
</script>
<style lang="scss" scoped>
.card-move {
  transition: 1.2s;
  transform: scale(1);
}
// .card-enter-ective {
//   transition: 0.1s;
//   transform: scale(1);
// }
// .card-enter-to {
//   transform: scale(0.8);
// }
</style>
