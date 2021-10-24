<template>
  <div class="testimonials">
    <div class="startup-block-content__desktop-buttons">
      <h2 class="testimonials-title">What our participants say</h2>
      <div class="desktop-buttons__slider">
        <button
          type="button"
          class="slider-button"
          @click="$emit('slideRight')"
        >
          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </button>
        <button type="button" class="slider-button" @click="$emit('slideLeft')">
          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </button>
      </div>
    </div>
    <transition-group
      key="testimonials"
      class="testimonials-content"
      tag="div"
      name="flip-list"
    >
      <div
        v-for="(card, i) in cards"
        :key="card.id"
        v-touch:swipe="$device.isMobile ? touchHandler : ''"
        v-touch-class="$device.isMobile ? 'active' : ''"
        class="testimonial-block"
      >
        <div>
          <h3>
            {{ card.comment | truncate(175, "...") }}
            <U-button
              v-if="card.comment.length > 175"
              :button-name="' Show all'"
              :button-class="'u-button-transpend'"
              @clickOnButton="toggletestimonialPopup(i)"
            ></U-button>
          </h3>

          <p class="testimonial-block__full-name">{{ card.author }}</p>
          <p class="testimonial-block__position">{{ card.title }}</p>
          <img
            v-if="card.photo[0]"
            class="testimonial-block__img"
            :src="card.photo[0].url"
            alt="testimonial"
          />
        </div>
      </div>
    </transition-group>
    <div v-if="testimonialPopup" class="testimonials-popup popup">
      <div class="testimonials-popup__content">
        <button
          type="button"
          class="sign-up-link__close"
          @click="toggletestimonialPopup"
        >
          <img src="~/assets/img/close.svg" alt="Close" />
        </button>
        <h3>
          {{ cards[0].comment }}
        </h3>
        <p class="testimonials-popup__full-name">
          {{ cards[testimonialNumber].author }}
        </p>
        <p class="testimonials-popup__position">
          {{ cards[testimonialNumber].title }}
        </p>
        <img
          v-if="cards[testimonialNumber].photo[0]"
          class="testimonials-popup__img"
          :src="cards[testimonialNumber].photo[0].url"
          alt="testimonial"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Testimonial } from "~/models/Testimonial";
import UButton from "~/components/atoms/uButton.vue";
import {
  disableScrolling,
  enableScrolling,
} from "~/assets/jshelper/toggleScroll.js";
@Component({ components: { UButton } })
export default class AppTestimonials extends Vue {
  @Prop() cards: Array<Testimonial>;
  testimonialPopup = false;
  testimonialNumber: Number = 0;

  toggletestimonialPopup(i: Number) {
    this.testimonialNumber = i;
    this.testimonialPopup ? enableScrolling() : disableScrolling();
    this.testimonialPopup = !this.testimonialPopup;
  }

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
.testimonial-block {
  transition: 0.2s;
  transform: scale(1);
  position: relative;

  &.active {
    transform: scale3d(0.8, 0.8, 0.8);
    transition: 0.2s;
  }
  @media (min-width: 768px) {
    .testimonial-block {
      transition: 0.2s;
      transform: scale(1);
      position: relative;

      &.active {
        transform: scale3d(1.8, 1.8, 1.8);
        transition: 0.2s;
      }
    }
  }
}
</style>
