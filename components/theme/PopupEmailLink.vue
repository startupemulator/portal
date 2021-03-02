<template>
  <div class="sign-up-link">
    <div class="sign-up-link__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopupLinkEmail')"
      >
        <img src="@/assets/img/close.svg" alt="Close" />
      </button>
      <u-title :text="'Sign up with the email link'"></u-title>
      <p>
        Signing up link will be sent to your email. After signing up you can log
        in in the same way.
      </p>
      <form>
        <U-input
          :placeholder="'Enter your email'"
          :type="'email'"
          :account-class="
            validInput ? 'create-account__email error' : 'create-account__email'
          "
          :img="require('~/assets/img/email.svg')"
          @textInput="checkEmail"
        ></U-input>
        {{ emailToLink }}
        <div @click="$emit('openPopupLinkSent')">
          <U-button
            :button-name="'Log in'"
            :button-class="'u-button-blue create-account__log-in'"
          ></U-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import UButton from "./UButton.vue";
import UTitle from "./UTitle.vue";
import UInput from "./UInput.vue";
export default {
  components: { UTitle, UButton, UInput },
  data() {
    return {
      validInput: false,
      emailPattern: /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/,
    };
  },
  methods: {
    checkEmail(textValue) {
      if (this.emailPattern.test(textValue)) {
        this.validInput = false;
      } else {
        this.validInput = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sign-up-link {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(59, 70, 90, 0.6);
  backdrop-filter: blur(16px);
  display: flex;
  justify-content: center;
  .sign-up-link__content {
    position: relative;
    width: 343px;
    height: 362px;
    display: flex;
    flex-direction: column;
    background: #232b39;
    border-radius: 12px;
    padding: 0 24px;
    box-sizing: border-box;
    margin-top: 175px;
  }
  .sign-up-link__close {
    position: absolute;
    right: 10px;
    top: 16px;
    background-color: transparent;
  }
  h2 {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    margin-top: 40px;
    margin-bottom: 0;
  }
  p {
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    color: #fff;
    width: 260px;
  }
  .sign-up-in__email {
    margin-top: 8px;
    font-weight: 300;
    font-size: 16px;
    line-height: 32px;
    &::placeholder {
      font-weight: 300;
      font-size: 16px;
      line-height: 32px;
    }
  }
}
@media (min-width: 768px) {
  .sign-up-link {
    .sign-up-link__content {
      width: 564px;
      height: 362px;
      padding: 0 48px;
      margin-top: 254px;
    }
    .sign-up-link__close {
      right: 18px;
      top: 20px;
    }
    h2 {
      font-weight: bold;
      font-size: 35px;
      line-height: 40px;
      margin: 0;
      margin-top: 48px;
    }
    p {
      font-weight: 300;
      font-size: 17px;
      line-height: 24px;
      width: 468px;
    }
    .sign-up-in__email {
      margin-top: 4px;
      font-weight: 300;
      font-size: 16px;
      line-height: 32px;
      &::placeholder {
        font-weight: 300;
        font-size: 16px;
        line-height: 32px;
      }
    }
  }
}
</style>
