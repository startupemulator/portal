<template>
  <div class="button-back">
    <nuxt-link v-if="!isButton" :to="link">
      <button type="button" class="btn-back">
        <img src="~/assets/img/arrow.svg" alt="arrow" />
        <span>Back</span>
      </button>
    </nuxt-link>
    <button
      v-if="isButton"
      type="button"
      class="btn-back"
      @click="$emit('clikOnButton')"
    >
      <img src="~/assets/img/arrow.svg" alt="arrow" />
      <span>Back</span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    link: {
      type: String,
      default: "/",
    },
    isButton: {
      type: Boolean,
      default: false,
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
    border-bottom: 1px solid transparent;
    transition: 0.3s;
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
