<template>
  <div class="createaccount-fullscreen">
    <Create-Account></Create-Account>
  </div>
</template>

<script>
import CreateAccount from "~/components/organisms/user/createAccount.vue";

export default {
  components: {
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
