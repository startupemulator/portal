<template>
  <div class="fullscreen">
    <!-- <pre style="color: #fff">{{ technologies }}</pre> -->

    <BecomeAnExpert :technologies="technologies"></BecomeAnExpert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import BecomeAnExpert from "~/components/organisms/becomeAnExpert/becomeAnExpert.vue";

@Component({
  components: {
    BecomeAnExpert,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  async asyncData({ $strapi }) {
    const technologies = await $strapi.find("technologies", [
      ["is_public", true],
    ]);
    return {
      technologies,
    };
  }
}
</script>
