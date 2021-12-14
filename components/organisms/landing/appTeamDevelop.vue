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
          "There is a description of this projects, where a product owner should describe his idea, main there is a description of this projects, where a product owner should describe his idea."
            | truncate(176, "...")
        }}
      </h3>
      <h3 v-else>
        There is a description of this projects, where a product owner should
        describe his idea, main there is a description of this projects, where a
        product owner should describe his idea.
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
