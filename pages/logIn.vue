<template>
  <div class="createaccount-fullscreen">
    <app-header></app-header>
    <log-in></log-in>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "~/components/molecules/appHeader.vue";
import LogIn from "~/components/organisms/user/logIn.vue";
import AppFooter from "~/components/molecules/appFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    LogIn,
  },
  middleware: "deny-authenticated",
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
@media (min-width: 1480px) {
  .createaccount-fullscreen {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }
}
</style>
