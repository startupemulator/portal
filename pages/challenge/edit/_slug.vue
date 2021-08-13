<template>
  <div>
    <div class="createProject">
      <CreateChallenge
        :specialisations="specialisations"
        :challenge="challenge"
      ></CreateChallenge>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import CreateChallenge from "~/components/organisms/challenges/createChallenge.vue";
@Component({
  components: {
    CreateChallenge,
  },
  middleware: ["access-garden-keeper"],
})
export default class extends Vue {
  async asyncData({ $specialisations, route, $challenge, $profile, $strapi }) {
    const { specialisations } = await $specialisations();
    const challenge = await $challenge(route.params.slug);
    return {
      specialisations,
      challenge,
    };
  }
}
</script>
