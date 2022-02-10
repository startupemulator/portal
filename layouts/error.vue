<template>
  <div>
    <div class="get-experience">
      <div class="get-experience-content">
        <div
          class="experience-content__title"
          @dblclick="showDetails = !showDetails"
        >
          <h2 v-if="error.statusCode === 404">&nbsp;&nbsp;Page not found</h2>
          <h2 v-else>An error occurred</h2>
          <p v-show="showDetails" style="text-align: center; color: #3cc28d">
            {{ error }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import AppHeader from "~/components/molecules/appHeader";
import AppFooter from "~/components/molecules/appFooter";
import Toast from "~/components/molecules/toast";
import Spinner from "~/components/molecules/spinner";

@Component({
  components: {
    AppHeader,
    AppFooter,
    Toast,
    Spinner,
  },
})
export default class ErrorLayout extends Vue {
  @Prop() error;
  layout = "error";
  showDetails = false;
}
</script>
