<template>
  <div class="signing-up-link-sent">
    <div class="signing-up-link-sent__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopupLinkSent')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <u-title :text="title"></u-title>
      <p>
        {{ textContent }}
      </p>
      <U-button
        :button-name="'Got It'"
        :button-class="'u-button-blue'"
      ></U-button>
    </div>
  </div>
</template>
<script>
import UButton from "../atoms/uButton";
export default {
  components: {
    UButton,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    textContent: {
      type: String,
      default: "",
    },
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
