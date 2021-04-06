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
          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </button>
        <button
          type="button"
          class="slider-buttton"
          @click="slideLeft('practicant')"
        >
          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </button>
      </div>
    </div>
    <transition-group
      key="practicants"
      class="practicants-content"
      tag="div"
      name="flip-list"
    >
      <div v-for="(card, i) in cards" :key="card.id" class="practicant-block">
        <h3>
          {{ card.comment | truncate(175, "...") }}
          <U-button
            v-if="card.comment.length > 175"
            :button-name="' Show all'"
            :button-class="'u-button-transpend'"
            @clickOnButton="toggleTestominalPopup(i)"
          ></U-button>
        </h3>
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
    <div v-if="testominalPopup" class="practicants-popup popup">
      <div class="practicants-popup__content">
        <button
          type="button"
          class="sign-up-link__close"
          @click="toggleTestominalPopup"
        >
          <img src="~/assets/img/close.svg" alt="Close" />
        </button>
        <h3>
          {{ cards[0].comment }}
        </h3>
        <p class="practicants-popup__full-name">
          {{ cards[testominalNumber].author }}
        </p>
        <p class="practicants-popup__position">
          {{ cards[testominalNumber].title }}
        </p>
        <img
          v-if="cards[testominalNumber].photo[0]"
          class="practicants-popup__img"
          :src="'/api/v1' + cards[testominalNumber].photo[0].url"
          alt="practicant"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Testimonial } from "~/models/Testimonial";
import UButton from "~/components/atoms/uButton.vue";

@Component({ components: { UButton } })
export default class extends Vue {
  @Prop() cards: Array<Testimonial>;
  testominalPopup = false;
  testominalNumber: Number = 0;
  toggleTestominalPopup(i: Number) {
    this.testominalNumber = i;
    this.testominalPopup = !this.testominalPopup;
  }
}
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
