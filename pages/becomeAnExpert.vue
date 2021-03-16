<template>
  <div class="fullscreen">
    <app-header></app-header>
    <become-an-expert></become-an-expert>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "~/components/molecules/appHeader.vue";
import BecomeAnExpert from "~/components/organisms/becomeAnExpert/becomeAnExpert";
import AppFooter from "~/components/molecules/appFooter.vue";

export default {
  components: {
    AppHeader,
    BecomeAnExpert,
    AppFooter,
  },
};
</script>
