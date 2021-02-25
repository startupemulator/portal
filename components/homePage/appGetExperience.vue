<template>
  <div class="get-experience">
    <div class="get-experience-content">
      <div class="get-experience-content-mobile">
        <div class="experience-content__first-mobile-image">
          <img src="~/assets/img/mobile-img-1.png" alt="" />
        </div>
        <div class="experience-content__second-mobile-image">
          <img src="~/assets/img/mobile-img-2.png" alt="" />
        </div>
      </div>
      <div class="get-experience-content-descktop">
        <div class="descktop-1">
          <div class="experience-content__first-image">
            <img src="~/assets/img/lefttop.png" alt="" />
          </div>
          <div class="experience-content__second-image">
            <img src="~/assets/img/righttop.png" alt="" />
          </div>
        </div>
        <div class="descktop-2">
          <div class="experience-content__third-image">
            <img src="~/assets/img/leftbottom.png" alt="" />
          </div>
          <div class="experience-content__four-image">
            <img src="~/assets/img/rightbottom.png" alt="" />
          </div>
        </div>
      </div>
      <div class="experience-content__five-image experience-content__title">
        <h2>Get an experience in real projects</h2>
        <div class="button-startups--groupe">
          <nuxt-link to="/">
            <U-button
              :button-name="'Explore Startups'"
              :button-class="'u-button-blue'"
            ></U-button>
          </nuxt-link>
          <nuxt-link to="/">
            <U-button
              :button-name="'Explore Challenges'"
              :button-class="'u-button-gray '"
            ></U-button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UButton from "../theme/UButton.vue";

export default {
  components: { UButton },
};
</script>
