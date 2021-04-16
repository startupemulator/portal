<template>
  <div class="startups-page">
    <Challenge></Challenge>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Challenge from "~/components/organisms/challenge/challenge.vue";

@Component({
  components: {
    Challenge,
  },
})
export default class extends Vue {
  // data loaded here will be added during server rendering
  //   async asyncData({ $strapi }) {
  //     const startup = await $strapi.find("startups");
  //     const testimonials = await $strapi.find("testimonials");
  //     return {
  //       startup,
  //       testimonials,
  //     };
  //   }
}
</script>
