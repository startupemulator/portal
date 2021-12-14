<template>
  <div>
    <div class="createProject">
      <Create-Challenge :specialisations="specialisations"></Create-Challenge>
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
  async asyncData({ $specialisations }) {
    const { specialisations } = await $specialisations();
    return {
      specialisations,
    };
  }
}
</script>
