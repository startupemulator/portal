<template>
  <button type="button" class="u-button" :class="buttonClass">
    {{ buttonName }}
  </button>
</template>
<script>
// universal-button-blue or universal-button-gray
export default {
  props: {
    buttonName: {
      type: String,
      default: "",
    },
    buttonClass: {
      type: String,
      default: "",
    },
  },
};
// ["buttonName", "buttonClass"]
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.u-button {
  width: 100%;
  height: 48px;
}
.u-button-blue {
  background-color: $button-color-blue;
  &:hover {
    background-color: $button-color-blue-hover;
  }
  &:focus {
    background-color: $button-color-blue-focus;
  }
  &:active {
    background-color: $button-color-blue-active;
  }
}
.u-button-gray {
  background-color: $button-color-gray;
  margin-top: 16px;
  &:hover {
    background-color: $button-color-gray-hover;
  }
  &:focus {
    background-color: $button-color-gray-focus;
  }
  &:active {
    background-color: $button-color-gray-active;
  }
}
@media (min-width: 768px) {
  .u-button {
    height: 56px;
  }
}
</style>
