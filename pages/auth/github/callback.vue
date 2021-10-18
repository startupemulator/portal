<template>
  <Spiner :loading="true"></Spiner>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";

@Component({})
export default class GithubCallback extends Vue {
  async asyncData(context: Context) {
    const access_token = context.route.query.access_token as string;
    try {
      await context.$strapi.logout();
      const { jwt, user } = await context.$strapi.$http.$get(
        "/auth/github/callback",
        {
          searchParams: { access_token },
        }
      );
      await context.$strapi.setToken(jwt);
      await context.$strapi.setUser(user);
      return { user };
    } catch (e) {
      console.error(e);
    }
  }

  mounted() {
    this.$router.push({ path: "/" });
  }
}
</script>
