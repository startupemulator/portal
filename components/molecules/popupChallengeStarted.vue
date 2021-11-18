<template>
  <div class="signing-up-link-sent popup">
    <div class="signing-up-link-sent__content challenge-started">
      <button
        type="button"
        class="sign-up-link__close"
        @click="closeSiginUpPopup"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <U-Title :text="title"></-title>
      <p>
        {{ textContent }}
      </p>
      <U-Button
        :button-name="'Got It'"
        :button-class="'u-button-blue'"
        @clickOnButton="closeSiginUpPopup"
      ></U-Button>
    </div>
  </div>
</template>
<script>
import UButton from "../atoms/uButton";
import UTitle from "../atoms/uTitle.vue";
export default {
  components: {
    UButton,
    UTitle,
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
  methods: {
    closeSiginUpPopup() {
      this.$router.push("/challenges");
    },
  },
};
</script>

<style lang="scss" scoped>
.signing-up-link-sent .signing-up-link-sent__content {
  min-height: 312px;
  margin: 0 auto;
  margin-top: 175px;
}

.signing-up-link-sent__content {
  background: #232b39;
  border-radius: 12px;
  padding: 24px;
  width: 343px;
  box-sizing: border-box;
  position: relative;

  h2 {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
  }

  p {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #fff;
  }
}

.sign-up-link__close {
  background: transparent;
  position: absolute;
  right: 16px;
}

.signing-up-link-sent p {
  margin-bottom: 24px;
}
@media (min-width: 768px) {
  .signing-up-link-sent .signing-up-link-sent__content {
    min-height: 304px;
    margin-top: 325px;

    h2 {
      font-weight: bold;
      font-size: 35px;
      line-height: 40px;
      margin-top: 0;
    }

    p {
      font-weight: normal;
      font-size: 17px;
      line-height: 24px;
      color: #fff;
    }
  }

  .signing-up-link-sent__content {
    width: 564px;
    padding: 48px;
  }

  .signing-up-link-sent p {
    width: 468px;
  }

  .sign-up-link__close {
    background: transparent;
    position: absolute;
    right: 24px;
    top: 24px;
  }
}
</style>
