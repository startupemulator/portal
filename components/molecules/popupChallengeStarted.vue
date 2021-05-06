<template>
  <div class="signing-up-link-sent popup">
    <div class="signing-up-link-sent__content challenge-started">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$router.push('/challenges')"
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
        @clickOnButton="$router.push('/challenges')"
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
.popup .challenge-started {
  height: 312px;
}
@media (min-width: 768px) {
  .signing-up-link-sent .signing-up-link-sent__content {
    min-height: 304px;
    margin-top: 325px;
  }
  .signing-up-link-sent p {
    width: 468px;
  }
  .request-feedback .signing-up-link-sent .signing-up-link-sent__content {
    min-height: 360px;
  }
}
</style>
