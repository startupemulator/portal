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
      <u-title :text="'You successfully applied'"></u-title>
      <p>
        You will receive an email notification when Product owner selects
        developer for a team. Also, you are able to apply to other startups.
      </p>
      <U-button
        :button-name="'Discover More Startups'"
        :button-class="'u-button-blue'"
      ></U-button>
    </div>
  </div>
</template>
<script>
import UButton from "./UButton";
import UTitle from "./UTitle";
export default {
  components: {
    UButton,
    UTitle,
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
