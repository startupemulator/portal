<template>
  <div class="startups-page">
    <StartUp :startup="startup" :testimonials="testominal"></StartUp>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import StartUp from "~/components/organisms/startup/startUp.vue";
import { Startup } from "~/models/Startup";
import { Testimonial } from "~/models/Testimonial";
@Component({
  components: {
    StartUp,
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
