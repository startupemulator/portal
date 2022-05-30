<template>
  <div class="team-develop">
    <img
      class="team-develop__mobile"
      src="~/assets/img/teamdev.jpg"
      alt="teamdev-m"
    />
    <div class="team-develop__text-block">
      <h2>
        Looking for a team
        <div class="">to develop your idea?</div>
      </h2>

      <h3 v-if="$device.isMobile">
        {{
          "We will assemble a team of developers to implement your idea. In the final stage we will invite experts to evaluate the resulting application. Start the real development process on our platform!"
            | truncate(176, "...")
        }}
      </h3>
      <h3 v-else>
        We will assemble a team of developers to implement your idea. In the final stage we will invite experts to evaluate the resulting application. Start the real development process on our platform!
      </h3>

      <U-Button
        v-if="!isLogined"
        :href="'createAccount'"
        :button-name="'Sign Up'"
        :button-class="'u-button-gray'"
        :is-link="'nuxt-link'"
      ></U-Button>

      <U-Button
        v-if="isLogined"
        :href="'/startup/create'"
        :button-name="'Create Startup'"
        :button-class="'u-button-gray'"
        :is-link="'nuxt-link'"
      ></U-Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";
@Component({
  components: { UButton },
})
export default class AppTeamDevelop extends Vue {
  @Prop() isLogined: Boolean;
}
</script>
