<template>
  <div class="button-back">
    <nuxt-link to="/">
      <button type="button" class="btn-back">
        <img src="@/assets/img/arrow.svg" alt="arrow" />
        <span>Back</span>
      </button></nuxt-link
    >
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" >
.button-back {
  .btn-back {
    background-color: transparent;
    color: #8c97ac;
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
  }
  img {
    transform: rotate(180deg);
    margin-right: 10px;
  }
}
</style>