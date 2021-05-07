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
export default class TakeStartup extends Vue {
  startup: Startup;
  testominal: Testimonial;

  async asyncData({ $startup, route }) {
    const startup = await $startup(route.params.slug);
    return { startup };
  }
}
</script>
