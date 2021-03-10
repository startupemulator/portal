<template>
  <div class="top-startups">
    <h2 class="top-startups__title">Top startups developed with us</h2>
    <div class="top-startups-content">
      <div class="top-startup">
        <img
          class="top-startup__background"
          src="@/assets/img/startups.jpg"
          alt="startups"
        />
        <div class="top-startup-content">
          <img src="@/assets/img/logo_sturtups.svg" alt="pakipaki.io" />
          <span>pakipaki.io</span>
        </div>
        <div class="top-startup__buttons">
          <U-button
            :button-name="'See Details'"
            :button-class="'u-button-blue'"
          ></U-button>
          <U-button
            :button-name="'Go to the Website'"
            :button-class="'u-button-gray'"
          ></U-button>
        </div>
      </div>
      <div class="next-startup">
        <h2>Your startup can be the next</h2>
        <h3>Join a team or create your startup</h3>
        <nuxt-link to="createAccount"
          ><U-button
            :button-name="'Sign Up'"
            :button-class="'u-button-blue'"
          ></U-button
        ></nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import UButton from "../theme/uButton";
export default {
  components: {
    UButton,
  },
};
</script>
