<template>
  <div class="createaccount-fullscreen">
    <app-header></app-header>

    <create-account></create-account>
    <app-footer :mobile-bottom-button="false"></app-footer>
  </div>
</template>

<script>
import AppHeader from "~/components/molecules/appHeader.vue";
import CreateAccount from "~/components/organisms/user/createAccount.vue";
import AppFooter from "~/components/molecules/appFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    CreateAccount,
  },
  middleware: "deny-authenticated",
};
</script>

<style lang="scss" scoped>
@media (min-width: 1480px) {
  .createaccount-fullscreen {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }
}
</style>
