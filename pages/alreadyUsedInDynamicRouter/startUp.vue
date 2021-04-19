<template>
  <div class="startups-page">
    <StartUp :startup="startup" :testimonials="testimonials"></StartUp>
    <App-footer></App-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import StartUp from "~/components/organisms/startup/startUp.vue";
import AppFooter from "~/components/molecules/appFooter.vue";
// import { Startup } from "~/models/Startup";
// import { Testimonial } from "~/models/Testimonial";

@Component({
  components: {
    StartUp,
    AppFooter,
  },
})
export default class extends Vue {
  // data loaded here will be added during server rendering
  async asyncData({ $strapi }) {
    const startup = await $strapi.find("startups");
    const testimonials = await $strapi.find("testimonials");
    return {
      startup,
      testimonials,
    };
  }

  // export default class extends Vue {
  //   startup: Startup;
  //   testimonials: Testimonial;
  //   async asyncData({ $strapi, route }) {
  //     const [startup] = await $strapi.find("startups", {
  //       slug: route.params.slug,
  //     });
  //     const [testimonials] = await $strapi.find("testimonials");
  //     return { startup, testimonials };
  //   }
}
</script>
