<template>
  <div class="fullscreen">
    <become-an-expert :technologies="technologies"></become-an-expert>
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
    const technologies = await $strapi.find("technologies");
    return {
      technologies,
    };
  }
}
</script>
