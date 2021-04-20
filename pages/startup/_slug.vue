<template>
  <div class="startups-page">
    <StartupPage :startup="startup" :testimonials="testominal"></StartupPage>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import StartupPage from "~/components/organisms/startup/startup.vue";
import { Startup } from "~/models/Startup";
import { Testimonial } from "~/models/Testimonial";
@Component({
  components: {
    StartupPage,
  },
})
export default class extends Vue {
  startup: Startup;
  testominal: Testimonial;
  async asyncData({ $strapi, route }) {
    const [startup] = await $strapi.find("startups", {
      slug: route.params.slug,
    });
    const [testominal] = await $strapi.find("startups", {
      id: startup.id,
    });
    return { startup, testominal };
  }
}
</script>
