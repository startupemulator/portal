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
