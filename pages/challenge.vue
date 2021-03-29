<template>
  <div class="startups-page">
    <App-header></App-header>

    <Challenge></Challenge>
    <App-footer></App-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "~/components/molecules/appHeader.vue";
import Challenge from "~/components/organisms/challenge/challenge.vue";
import AppFooter from "~/components/molecules/appFooter.vue";

@Component({
  components: {
    AppHeader,
    Challenge,
    AppFooter,
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
