<template>
  <div class="createaccount-fullscreen">
    <CreateAccount></CreateAccount>
    <toast></toast>
  </div>
</template>

<script>
import CreateAccount from "~/components/organisms/user/createAccount.vue";
import toast from "~/components/molecules/toast.vue";
export default {
  components: {
    CreateAccount,
    toast,
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
