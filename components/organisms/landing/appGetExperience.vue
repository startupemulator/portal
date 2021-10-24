<template>
  <div class="get-experience">
    <div class="get-experience-content">
      <div class="get-experience-content-mobile">
        <div class="experience-content__first-mobile-image">
          <img
            src="~/assets/img/mobile-img-1.png"
            alt=""
            srcset="~/assets/img/m-img1.png 2x"
          />
        </div>
        <div class="experience-content__second-mobile-image">
          <img
            src="~/assets/img/mobile-img-2.png"
            alt=""
            srcset="~/assets/img/m-img2.png 2x"
          />
        </div>
      </div>
      <div class="get-experience-content-desktop">
        <div class="desktop-1">
          <div class="experience-content__first-image">
            <img
              src="~/assets/img/lefttop.png"
              alt=""
              srcset="~/assets/img/left-top.png 2x"
            />
          </div>
          <div class="experience-content__second-image">
            <img
              src="~/assets/img/righttop.png"
              alt=""
              srcset="~/assets/img/right-top.png 2x"
            />
          </div>
        </div>
        <div class="desktop-2">
          <div class="experience-content__third-image">
            <img
              src="~/assets/img/leftbottom.png"
              alt=""
              srcset="~/assets/img/left-bottom.png 2x"
            />
          </div>
          <div class="experience-content__four-image">
            <img
              src="~/assets/img/rightbottom.png"
              alt=""
              srcset="~/assets/img/right-bottom.png 2x"
            />
          </div>
        </div>
      </div>
      <div class="experience-content__five-image experience-content__title">
        <h2>Get an experience in real projects</h2>
        <div class="button-startups--groupe">
          <U-Button
            :button-name="'Explore Startups'"
            :button-class="'u-button-blue'"
            :is-link="'nuxt-link'"
            :href="'/startups'"
          ></U-Button>

          <U-Button
            :button-name="'Explore Challenges'"
            :button-class="'u-button-gray '"
            :is-link="'nuxt-link'"
            :href="'/challenges'"
          ></U-Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";

@Component({
  components: { UButton },
})
export default class AppGetExperience extends Vue {}
</script>
