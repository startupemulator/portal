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
          <U-button
            :button-name="'Continue with GitHub'"
            :button-class="'u-button-gray'"
          ></U-button>

          <U-button
            :button-name="'Continue with the email link'"
            :button-class="'u-button-gray'"
            @clickOnButton="showPopupEmailLink"
          ></U-button>
        </div>
      </div>
    </form>
    <popup-email-link
      v-if="popupEmailLink"
      @closePopupLinkEmail="showPopupEmailLink"
      @openPopupLinkSent="showPopupLinkSent"
    ></popup-email-link>
    <signing-up-link-sent
      v-if="popupSignUpLink"
      @closePopupLinkSent="showPopupLinkSent"
    ></signing-up-link-sent>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { email, minLength, required, sameAs } from "vuelidate/lib/validators";
import UBack from "@/components/theme/UBack.vue";
import UTitle from "../theme/UTitle.vue";
import UInput from "../theme/UInput.vue";
import UButton from "../theme/UButton.vue";
import PopupEmailLink from "../theme/PopupEmailLink.vue";
import SigningUpLinkSent from "../theme/SigningUpLinkSent.vue";
import SystemAlert from "../theme/SystemAlert.vue";

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

  async register() {
    this.$v.$touch();
    if (!this.$v.$error) {
      try {
        const newUser = await this.$strapi.register({
          email: this.email,
          username: this.name,
          password: this.password,
        });
        if (newUser !== null) {
          this.error = "";
          this.$nuxt.$router.push("/");
        }
      } catch (error) {
        this.error = error.message;
      }
    } else {
      this.$toast.error("Fill the form correctly.", {
        icon: "highlight_off",
        // theme: "outline",
        position: "top-right",
        duration: 3000,
      });
    }
  }

  showPopupEmailLink() {
    this.popupEmailLink = !this.popupEmailLink;
  }

  showPopupLinkSent() {
    if (this.popupSignUpLink) {
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
