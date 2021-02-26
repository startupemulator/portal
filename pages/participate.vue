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
