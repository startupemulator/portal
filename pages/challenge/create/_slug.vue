<template>
  <div>
    <div class="createProject">
      <CreateChallenge :specialisations="specialisations"></CreateChallenge>
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
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  async asyncData({ $specialisations }) {
    const { specialisations } = await $specialisations();
    return {
      specialisations,
    };
  }
}
</script>
