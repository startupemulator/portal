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

  async asyncData({ $technologies, $profileByUserId, $strapi }) {
    const { technologies } = await $technologies();
    const userProfile = await $profileByUserId($strapi.user.id);
    const userName = userProfile[0].name;
    return {
      technologies,
      userName,
      userProfile,
    };
  }
}
</script>
