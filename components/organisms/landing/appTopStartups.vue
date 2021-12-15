<template>
  <div class="top-startups">
    <h2 class="top-startups__title">Top startups developed with us</h2>
    <div class="top-startups-content">
      <div class="top-startup">
        <img
          class="top-startup__background"
          src="~/assets/img/startups.jpg"
          alt="startups"
        />
        <div class="top-startup-content">
          <img src="~/assets/img/logo_sturtups.svg" alt="pakipaki.io" />
          <span>pakipaki.io</span>
        </div>
        <div class="top-startup__buttons">
          <U-Button
            :button-name="'See Details'"
            :button-class="'u-button-blue'"
            :is-link="'nuxt-link'"
            :href="'/'"
          ></U-Button>
          <U-Button
            :button-name="'Go to the Website'"
            :button-class="'u-button-gray'"
            :is-link="'nuxt-link'"
            :href="'/'"
          ></U-Button>
        </div>
      </div>
      <div class="next-startup">
        <h2>Your startup can be the next</h2>
        <h3>Join a team or create your startup</h3>
        <U-Button
          :button-name="'Sign Up'"
          :button-class="'u-button-blue'"
          :is-link="'nuxt-link'"
          :href="'createAccount'"
          class="next-link"
        ></U-Button>
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
export default class AppTopStartups extends Vue {}
</script>
