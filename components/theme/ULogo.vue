<template>
  <nuxt-link to="/">
    <div class="main-header-logo">
      <img src="@/assets/img/logo.svg" alt="" class="logo" />
      <h2 v-if="!(!$strapi.user & $device.isMobile)">Startup Emulator</h2>
    </div></nuxt-link
  >
</template>
<script>
export default {};
</script>
