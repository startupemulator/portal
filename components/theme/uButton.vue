<template>
  <button
    type="button"
    class="u-button"
    :class="buttonClass"
    @click="$emit('clickOnButton')"
  >
    {{ buttonName }}
  </button>
</template>
<script>
// u-button-blue or u-button-gray
export default {
  props: {
    buttonName: {
      type: String,
      default: "",
    },
    buttonClass: {
      type: [Array, String],
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
  box-shadow: inset 0 -2px 4px 1px rgba(48, 92, 178, 0.15),
    inset 0 1px 4px rgba(255, 255, 255, 0.15);
  border-width: 1px;
  border-style: solid;
  font-weight: bold;
  font-size: 17px;
  line-height: 32px;
  color: $main-text-color;
  transition: 0.3s;
}
.u-button-transpend {
  background: transparent;
  border: none;
  color: #8c97ac;
  font-weight: 600;
  font-size: 16px;
  line-height: 32px;
  box-shadow: none;
  box-sizing: border-box;
  :hover {
    text-decoration: underline;
  }
}
.u-button-blue {
  border-color: #2f2dad;
  background-color: $button-color-blue;
  &:hover {
    background-color: $button-color-blue-hover;
  }
  &:focus {
    background-color: $button-color-blue-focus;
    border-width: 2px;
    border-color: #b5c1d8;
  }
  &:active {
    background-color: $button-color-blue-active;
  }
}
.u-button-gray {
  border-color: #404c5f;
  background-color: $button-color-gray;

  &:hover {
    background-color: $button-color-gray-hover;
  }
  &:focus {
    background-color: $button-color-gray-focus;
    border-width: 2px;
    border-color: #b5c1d8;
  }
  &:active {
    background-color: $button-color-gray-active;
  }
}
@media (min-width: 768px) {
  .u-button {
    height: 56px;
    font-size: 18px;
  }
}
</style>
