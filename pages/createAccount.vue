<template>
  <div class="createaccount-fullscreen">
    <app-header :login="!!$strapi.user"></app-header>

    <create-account></create-account>
    <app-footer :mobile-bottom-button="false"></app-footer>
  </div>
</template>

<script>
import AppHeader from "@/components/appHeader.vue";
import CreateAccount from "@/components/acc/createAccount.vue";
import AppFooter from "~/components/appFooter.vue";

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
