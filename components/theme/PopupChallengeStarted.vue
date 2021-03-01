<template>
  <div class="signing-up-link-sent">
    <div class="signing-up-link-sent__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopupLinkSent')"
      >
        <img src="@/assets/img/close.svg" alt="Close" />
      </button>
      <u-title :text="'The challenge has started'"></u-title>
      <p>
        Come back when you complete this challenge and get feedback from our
        experts. Also, feel free to request feedback when you are in progress.
      </p>
      <U-button
        :button-name="'Got It'"
        :button-class="'u-button-blue'"
      ></U-button>
    </div>
  </div>
</template>
<script>
import UButton from "./UButton";
export default {
  components: {
    UButton,
  },
};
</script>
<style scoped>
.signing-up-link-sent .signing-up-link-sent__content {
  min-height: 312px;
  margin-top: 175px;
}
.signing-up-link-sent p {
  margin-bottom: 24px;
}
@media (min-width: 768px) {
  .signing-up-link-sent .signing-up-link-sent__content {
    min-height: 304px;
    margin-top: 325px;
  }
  .signing-up-link-sent p {
    width: 468px;
  }
}
</style>
