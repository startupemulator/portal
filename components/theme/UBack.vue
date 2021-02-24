<template>
  <div class="button-back">
    <nuxt-link :to="link">
      <button type="button" class="btn-back">
        <img src="@/assets/img/arrow.svg" alt="arrow" />
        <span>Back</span>
      </button></nuxt-link
    >
  </div>
</template>
<script>
export default {
  props: {
    link: {
      type: String,
      default: "back",
    },
  },
};
</script>
<style lang="scss">
.button-back {
  .btn-back {
    background-color: transparent;
    color: #8c97ac;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    img {
      transform: rotate(180deg);
      margin-right: 15px;
    }
    span:hover {
      border-bottom: 1px solid #8c97ac;
    }
  }
}
</style>
