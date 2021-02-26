<template>
  <div class="fullscreen">
    <app-header :logined="true"></app-header>
    <practicipaer-task></practicipaer-task>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "~/components/appHeader.vue";
import PracticipaerTask from "~/components/practicipaerTask/practicipaerTask";
import AppFooter from "~/components/appFooter.vue";

export default {
  components: {
    AppHeader,
    PracticipaerTask,
    AppFooter,
  },
};
</script>
<style lang="scss" scoped>
@media (min-width: 1480px) {
  .fullscreen {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }
}
</style>
