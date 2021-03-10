<template>
  <div class="signing-up-link-sent">
    <div class="signing-up-link-sent__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopup')"
      >
        <img src="@/assets/img/close.svg" alt="Close" />
      </button>
      <u-title :text="'You successfully created your startup'"></u-title>
      <p>
        It’s being pending now. You will receive an email notification when we
        approve your startup and add it to the main list.
      </p>
      <U-button
        :button-name="'Got It'"
        :button-class="'u-button-blue'"
      ></U-button>
    </div>
  </div>
</template>
<script>
import UTitle from "~/components/theme/UTitle";
import UButton from "~/components/theme/UButton";
export default {
  components: {
    UButton,
    UTitle,
  },
};
</script>
<style scoped>
.createProgect-step4 .signing-up-link-sent .signing-up-link-sent__content {
  min-height: 290px;
}

@media (min-width: 768px) {
  .createProgect-step4 .signing-up-link-sent .signing-up-link-sent__content {
    min-height: 344px;
  }
}
</style>
