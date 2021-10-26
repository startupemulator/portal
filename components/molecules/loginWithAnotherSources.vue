<template>
  <div class="create-account__buttons-continue">
    <A-Link
      :link="getAuthGithubLink()"
      :link-name="'Continue with GitHub'"
    ></A-Link>
    <U-Button
      :button-name="'Continue with the email link'"
      :button-class="'u-button-gray'"
      @clickOnButton="$emit('showPopupEmailLink')"
    ></U-Button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import ALink from "~/components/atoms/uLink.vue";
import UButton from "~/components/atoms/uButton.vue";

@Component({
  components: { ALink, UButton },
})
export default class extends Vue {
  getAuthGithubLink() {
    return `${this.$config.strapi.url}connect/github`;
  }
}
</script>
