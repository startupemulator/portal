<template>
  <div class="team-develop">
    <img
      class="team-develop__mobile"
      src="@/assets/img/teamdev.jpg"
      alt="teamdev-m"
    />
    <div class="team-develop__text-block">
      <h2>
        Looking for a team
        <div class="">to develop your idea?</div>
      </h2>
      <h3>
        There is a description of this projects, where a product owner should
        describe his idea, main there is a description of this projects, where a
        product owner should describe his idea.
      </h3>
      <nuxt-link v-if="!$strapi.user" to="createAccount">
        <U-button
          :button-name="'Sign Up'"
          :button-class="'u-button-gray'"
        ></U-button>
      </nuxt-link>
      <nuxt-link v-if="$strapi.user" to="/startup/create">
        <U-button
          :button-name="'Create Startup'"
          :button-class="'u-button-gray'"
        ></U-button>
      </nuxt-link>
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
