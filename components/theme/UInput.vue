<template>
  <label for="account-email" class="standart-label">
    <input
      v-model="email"
      :class="accountClass"
      :type="type"
      :placeholder="placeholder"
      class="standart-input"
    />
    <span v-if="emailInvalid" class="account-email-empty"
      >Please enter an email address</span
    ></label
  >
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    accountClass: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss">
.standart-label {
  .standart-input {
    background: #2e384a;
    border-radius: 12px;
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    color: #b5c1d8;
    border: 0;
    width: 100%;
    height: 48px;
    padding-left: 56px;
    box-sizing: border-box;

    &::placeholder {
      color: #b5c1d8;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 32px;
    }
  }
}
@media (min-width: 768px) {
  .standart-label {
    .standart-input {
      height: 56px;
      padding-left: 64px;
      font-size: 18px;
      line-height: 32px;
      &::placeholder {
        font-size: 18px;
        line-height: 32px;
      }
    }
  }
}
</style>
