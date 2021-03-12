<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class extends Vue {
  asyncData({ redirect }) {
    redirect("/api/v1/connect/github");
  }
}
</script>
