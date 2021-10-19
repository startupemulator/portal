<template>
  <div class="createaccount-fullscreen">
    <LogIn></LogIn>
  </div>
</template>

<script>
import LogIn from "~/components/organisms/user/logIn.vue";
export default {
  components: {
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
