<template>
  <div class="startup-block">
    <div class="startup-block-content">
      <div class="startup-block-content__head">
        <h2>Startups</h2>
        <button type="button" class="tartup-block-buttton">
          <span>See All Startups</span>
          <img src="@/assets/img/arrow.svg" alt="" />
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
            class="slider-buttton"
            @click="slideRigth('startupCard')"
          >
            <img src="@/assets/img/arrow.svg" alt="arrow" />
          </button>
          <button
            type="button"
            class="slider-buttton"
            @click="slideLeft('startupCard')"
          >
            <img src="@/assets/img/arrow.svg" alt="arrow" />
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
          v-for="(card, i) in cards"
          :key="card.id"
          class="startup-block__startup-card"
        >
          <startup-card :key="i" :card="card"></startup-card>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Startup } from "~/models/Startup";

@Component({})
export default class AppStartupsBlock extends Vue {
  @Prop() cards: Array<Startup>;
}
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
