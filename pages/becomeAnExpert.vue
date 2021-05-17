<template>
  <div class="fullscreen">
    <BecomeAnExpert
      :technologies="technologies"
      :user-id="userId"
      :user-name="userName"
    ></BecomeAnExpert>
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
  userId = this.$strapi.user.id;
  userName = this.$strapi.user.username;
  async asyncData({ $technologies }) {
    const { technologies } = await $technologies();
    return {
      technologies,
    };
  }
}
</script>
