<template>
  <div class="fullscreen">
    <app-header :logined="true"></app-header>
    <participate-challenge></participate-challenge>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "~/components/appHeader.vue";
import ParticipateChallenge from "~/components/participate/participateChallenge.vue";
import AppFooter from "~/components/appFooter.vue";

export default {
  components: {
    AppHeader,
    ParticipateChallenge,
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
