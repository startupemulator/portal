<template>
  <div class="get-experience">
    <div class="get-experience-content">
      <div class="get-experience-content-mobile">
        <div class="experience-content__first-mobile-image">
          <img src="~/assets/img/m-img1.png" alt="" />
        </div>
        <div class="experience-content__second-mobile-image">
          <img src="~/assets/img/m-img2.png" alt="" />
        </div>
      </div>
      <div class="get-experience-content-desktop">
        <div class="desktop-1">
          <div class="experience-content__first-image">
            <img src="~/assets/img/left-top.png" alt="" />
          </div>
          <div class="experience-content__second-image">
            <img src="~/assets/img/right-top.png" alt="" />
          </div>
        </div>
        <div class="desktop-2">
          <div class="experience-content__third-image">
            <img src="~/assets/img/left-bottom.png" alt="" />
          </div>
          <div class="experience-content__four-image">
            <img src="~/assets/img/right-bottom.png" alt="" />
          </div>
        </div>
      </div>
      <div class="experience-content__five-image experience-content__title">
        <h2>Get an experience in real projects</h2>
        <div class="button-startups--groupe">
          <nuxt-link to="/startups">
            <U-button
              :button-name="'Explore Startups'"
              :button-class="'u-button-blue'"
            ></U-button>
          </nuxt-link>
          <nuxt-link to="/challenges">
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
import UButton from "~/components/atoms/uButton.vue";

export default {
  components: { UButton },
};
</script>
