<template>
  <div class="practicants">
    <div class="startup-block-content__desktop-buttons">
      <h2 class="practicants-title">What our participants say</h2>
      <div class="desktop-buttons__slider">
        <button
          type="button"
          class="slider-buttton"
          @click="slideRigth('practicant')"
        >
          <img src="@/assets/img/arrow.svg" alt="arrow" />
        </button>
        <button
          type="button"
          class="slider-buttton"
          @click="slideLeft('practicant')"
        >
          <img src="@/assets/img/arrow.svg" alt="arrow" />
        </button>
      </div>
    </div>
    <transition-group
      key="practicants"
      class="practicants-content"
      tag="div"
      name="flip-list"
    >
      <div v-for="card in cards" :key="card.id" class="practicant-block">
        <h3>{{ card.comment | truncate(230) }}</h3>
        <p class="practicant-block__full-name">{{ card.author }}</p>
        <p class="practicant-block__position">{{ card.title }}</p>
        <img
          v-if="card.photo[0]"
          class="practicant-block__img"
          :src="'/api/v1' + card.photo[0].url"
          alt="practicant"
        />
      </div>
    </transition-group>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Testimonial } from "../../models/Testimonial";

@Component({})
export default class AppPracticants extends Vue {
  @Prop() cards: Array<Testimonial>;
}
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
