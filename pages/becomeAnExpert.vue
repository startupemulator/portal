<template>
  <div class="fullscreen">
    <app-header></app-header>
    <become-an-expert></become-an-expert>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "~/components/appHeader.vue";
import BecomeAnExpert from "~/components/becomeAnExpert/becomeAnExpert";
import AppFooter from "~/components/appFooter.vue";

export default {
  components: {
    AppHeader,
    BecomeAnExpert,
    AppFooter,
  },
};
</script>
