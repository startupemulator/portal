<template>
  <div class="fullscreen">
    <app-header :logined="true"></app-header>
    <practicipaer-task></practicipaer-task>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "~/components/appHeader.vue";
import PracticipaerTask from "~/components/becomeAnExpert/practicipaerTask.vue";
import AppFooter from "~/components/appFooter.vue";

export default {
  components: {
    AppHeader,
    PracticipaerTask,
    AppFooter,
  },
};
</script>
