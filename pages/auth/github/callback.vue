<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";

@Component({})
export default class GithubCallback extends Vue {
  asyncData(context: Context) {
    context.$strapi.setToken(context.route.query.accessToken);
    context.redirect("/");
  }
}
</script>
