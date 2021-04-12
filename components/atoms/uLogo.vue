<template>
  <nuxt-link to="/">
    <div class="main-header-logo">
      <img src="~/assets/img/logo.svg" alt="" class="logo" />
      <h2 v-if="!(!$strapi.user & $device.isMobile)">Startup Emulator</h2>
    </div></nuxt-link
  >
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.main-header-logo h2 {
  color: #837cf3;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  margin: 0;
  margin-left: 12px;
}
.main-header-logo img {
  height: 40px;
  width: 40px;
}
.main-header-logo {
  display: flex;
  align-items: center;
}
</style>
