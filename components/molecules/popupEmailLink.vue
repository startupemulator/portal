<template>
  <div class="sign-up-link popup">
    <div class="sign-up-link__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopupLinkEmail')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <u-title :text="'Sign up with the email link'"></u-title>
      <p>
        Signing up link will be sent to your email. After signing up you can log
        in in the same way.
      </p>
      <form>
        <U-Input
          :placeholder="'Enter your email'"
          :type="'email'"
          :value="email"
          :account-class="
            $v.email.$error
              ? 'create-account__email error'
              : 'create-account__email'
          "
          :img="require('~/assets/img/email.svg')"
          @textInput="checkEmail"
          @keydown="keydown"
        ></U-Input>
        <p v-show="$v.email.$error" class="errorInput">
          Please enter an email address
        </p>

        <div>
          <U-Button
            :button-name="'Log in'"
            :button-class="'u-button-blue create-account__log-in'"
            @clickOnButton="sendLink"
          ></U-Button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { email, required } from "vuelidate/lib/validators";
import UButton from "../atoms/uButton.vue";
import UTitle from "../atoms/uTitle.vue";
import UInput from "../atoms/uInput.vue";

@Component({
  validations: {
    email: {
      required,
      email,
    },
  },
  components: { UButton, UTitle, UInput },
})
export default class extends Vue {
  email: string = " ";
  sendLink() {
    if (!this.$v.$error) {
      this.$emit("sendLink", this.email);
    }
  }

  checkEmail(email) {
    this.email = email;
    this.$v.$touch();
  }

  keydown(email) {
    this.checkEmail(email);
    this.sendLink();
  }
}
</script>

<style lang="scss" scoped>
.sign-up-link {
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
    margin: 0 auto;
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
