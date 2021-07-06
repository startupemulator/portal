<template>
  <div class="account">
    <form>
      <div class="create-account">
        <SystemAlert v-if="error !== ''"></SystemAlert>
        <U-Back link="/"></U-Back>
        <U-Title :text="'Create an account'"> </U-Title>
        <U-input
          :placeholder="'Enter your full name'"
          :type="'text'"
          :value="name"
          :account-class="
            $v.name.$error
              ? 'create-account__password error'
              : 'create-account__password'
          "
          :img="require('~/assets/img/profile.svg')"
          :btn-show-password="false"
          @textInput="checkName"
        ></U-input>
        <p v-show="$v.name.$error" class="errorInput">
          Please enter a full name
        </p>
        <U-input
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
        ></U-input>
        <p v-show="$v.email.$error" class="errorInput">
          Please enter an email address
        </p>
        <U-input
          :placeholder="'Set a password'"
          :type="'password'"
          :value="password"
          :account-class="
            $v.password.$error
              ? 'create-account__password error'
              : 'create-account__password'
          "
          :img="require('~/assets/img/password.svg')"
          :btn-show-password="true"
          @textInput="checkPassword"
        ></U-input>
        <p v-show="$v.password.$error" class="errorInput">
          Please enter a password of at least 6 characters
        </p>
        <U-input
          :placeholder="'Repeat a password'"
          :value="repeatPassword"
          :type="'password'"
          :account-class="
            $v.repeatPassword.$error
              ? 'create-account__password error'
              : 'create-account__password'
          "
          :img="require('~/assets/img/password.svg')"
          :btn-show-password="true"
          @textInput="checkRepeatPassword"
        ></U-input>
        <p v-show="$v.repeatPassword.$error" class="errorInput">
          Both passwords should be the same
        </p>
        <div>
          <U-button
            :button-name="'Sign Up'"
            :button-class="'u-button-blue create-account__log-in'"
            @clickOnButton="register"
          ></U-button>
        </div>
        <hr />
        <div class="create-account__buttons-continue">
          <nuxt-link to="/auth/github/connect">
            <U-button
              :button-name="'Continue with GitHub'"
              :button-class="'u-button-gray'"
            ></U-button>
          </nuxt-link>
          <U-button
            :button-name="'Continue with the email link'"
            :button-class="'u-button-gray'"
            @clickOnButton="showPopupEmailLink"
          ></U-button>
        </div>
        <div class="account__go-to-sign-up">
          <span>Don’t have an account?</span>
          <U-Back link="/login" :img="false" :title="'Log in'"></U-Back>
        </div>
      </div>
    </form>
    <PopupEmailLink
      v-if="popupEmailLink"
      @closePopupLinkEmail="showPopupEmailLink"
      @openPopupLinkSent="showPopupLinkSent"
    ></PopupEmailLink>
    <SigningUpLinkSent
      v-if="popupSignUpLink"
      @closePopupLinkSent="showPopupLinkSent"
    ></SigningUpLinkSent>
    <ConfirmEmail v-if="popupConfirmEmail"></ConfirmEmail>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { email, minLength, required, sameAs } from "vuelidate/lib/validators";
import Toast from "../../../store/modules/Toast";
import PopupEmailLink from "~/components/molecules/popupEmailLink.vue";
import SigningUpLinkSent from "~/components/molecules/signingUpLinkSent.vue";
import SystemAlert from "~/components/molecules/systemAlert.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import UButton from "~/components/atoms/uButton.vue";
import ConfirmEmail from "~/components/molecules/popupConfirmEmail.vue";
import {
  disableScrolling,
  enableScrolling,
} from "~/assets/jshelper/toggleScroll.js";
@Component({
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
  components: {
    UBack,
    UTitle,
    UInput,
    UButton,
    PopupEmailLink,
    SigningUpLinkSent,
    SystemAlert,
    ConfirmEmail,
  },
})
export default class CreateAccount extends Vue {
  name = "";
  email = "";
  password = "";
  repeatPassword = "";
  error = "";
  popupEmailLink = false;
  popupSignUpLink = false;
  popupConfirmEmail = false;

  async register() {
    this.$v.$touch();
    if (!this.$v.$error) {
      try {
        await this.$createUser(this.email, this.name, this.password);

        this.error = "";
        this.popupConfirmEmail = true;
      } catch (e) {
        Toast.show({
          data: e.message,
          duration: 3000,
        });
      }
    } else {
      Toast.show({
        data: "Fill the form correctly.",
        duration: 3000,
      });
    }
  }

  showPopupEmailLink() {
    this.popupEmailLink ? enableScrolling() : disableScrolling();
    this.popupEmailLink = !this.popupEmailLink;
  }

  showPopupLinkSent() {
    if (this.popupSignUpLink) {
      this.popupSignUpLink ? enableScrolling() : disableScrolling();
      this.popupSignUpLink = !this.popupSignUpLink;
    } else {
      this.popupSignUpLink = !this.popupSignUpLink;
      this.popupEmailLink = !this.popupEmailLink;
    }
  }

  checkEmail(textValue: string) {
    this.email = textValue;
    this.$v.email.$touch();
  }

  checkPassword(textValue: string) {
    this.password = textValue;
    this.$v.password.$touch();
  }

  checkRepeatPassword(textValue: string) {
    this.repeatPassword = textValue;
    this.$v.repeatPassword.$touch();
  }

  checkName(textValue: string) {
    this.name = textValue;
    this.$v.name.$touch();
  }
}
</script>
