<template>
  <div class="account">
    <form>
      <div class="create-account">
        <System-Alert v-if="error !== ''"></System-Alert>
        <U-Back link="/"></U-Back>
        <U-Title :text="'Create an account'"> </U-Title>
        <U-Input
          :placeholder="'Enter your full name'"
          :type="'text'"
          :value="name.trim()"
          :account-class="
            $v.name.$error
              ? 'create-account__password error'
              : 'create-account__password'
          "
          :img="require('~/assets/img/profile.svg')"
          :btn-show-password="false"
          @textInput="checkName"
        ></U-Input>
        <p v-show="$v.name.$error" class="errorInput">
          Please enter a full name, no more than 40 characters
        </p>
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
        ></U-Input>
        <p v-show="$v.email.$error" class="errorInput">
          Please enter an email address
        </p>
        <div>
          <U-Input
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
          ></U-Input>
          <p v-show="$v.password.$error" class="errorInput">
            Please enter a password of at least 8 characters
          </p>
        </div>
        <div>
          <U-Input
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
          ></U-Input>
          <p v-show="$v.repeatPassword.$error" class="errorInput">
            Both passwords should be the same
          </p>
        </div>
        <div>
          <U-Button
            :button-name="'Sign Up'"
            :button-class="'u-button-blue create-account__log-in'"
            @clickOnButton="register"
          ></U-Button>
        </div>
        <hr />
        <Login-With-Another-Sources
          @showPopupEmailLink="showPopupEmailLink"
        ></Login-With-Another-Sources>
        <div class="account__go-to-sign-up">
          <span>Already have an account?</span>
          <U-Back link="/login" :img="false" :title="'Log in'"></U-Back>
        </div>
      </div>
    </form>
    <Popup-Email-Link
      v-if="popupEmailLink"
      @closePopupLinkEmail="showPopupEmailLink"
      @sendLink="sendLoginLink"
    ></Popup-Email-Link>
    <Signing-Up-Link-Sent
      v-if="popupSignUpLink"
      @closePopupLinkSent="showPopupLinkSent"
    ></Signing-Up-Link-Sent>
    <Confirm-Email v-if="popupConfirmEmail"></Confirm-Email>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import {
  email,
  minLength,
  maxLength,
  required,
  sameAs,
} from "vuelidate/lib/validators";
import Toast from "../../../store/modules/Toast";
import PopupEmailLink from "~/components/molecules/popupEmailLink.vue";
import SigningUpLinkSent from "~/components/molecules/signingUpLinkSent.vue";
import SystemAlert from "~/components/molecules/systemAlert.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import UButton from "~/components/atoms/uButton.vue";
import LoginWithAnotherSources from "~/components/molecules/loginWithAnotherSources.vue";
import ConfirmEmail from "~/components/molecules/popupConfirmEmail.vue";
import {
  disableScrolling,
  enableScrolling,
} from "~/assets/jshelper/toggleScroll.js";
@Component({
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(40),
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
    LoginWithAnotherSources,
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
        const newUser = await this.$createUser(this.email, this.password);

        if (newUser !== null) {
          const user = await this.$getUserByEmail(this.email);
          await this.$updateProfileName(user.profile.id, this.name);
          this.error = "";
          this.popupConfirmEmail = true;
        } else {
          const checkUserEmail = await this.$getUserByEmail(this.email);
          if (checkUserEmail !== null) {
            Toast.show({
              data: `user with ${this.email} email is registred`,
              duration: 5000,
            });
          }
        }
      } catch (e) {
        console.error(e);
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
    this.name = textValue.trim();
    this.$v.name.$touch();
  }

  async sendLoginLink(email) {
    try {
      const result = await this.$sendLoginLink(email);
      if (result !== null) {
        this.showPopupLinkSent();
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: "Some thing wrong, try later.",
        duration: 3000,
      });
    }
  }
}
</script>
