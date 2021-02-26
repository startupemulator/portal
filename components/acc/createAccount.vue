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
            validInput.fullName
              ? 'create-account__password error'
              : 'create-account__password'
          "
          :img="require('~/assets/img/profile.svg')"
          :btn-show-password="false"
          @textInput="checkName"
        ></U-input>
        <p v-show="validInput.fullName" class="errorInput">
          Please enter a password of at least 6 characters
        </p>
        <U-input
          :placeholder="'Enter your email'"
          :type="'email'"
          :account-class="
            validInput.email
              ? 'create-account__email error'
              : 'create-account__email'
          "
          :img="require('~/assets/img/email.svg')"
          @textInput="checkEmail"
        ></U-input>
        <p v-show="validInput.email" class="errorInput">
          Please enter an email address
        </p>
        <U-input
          :placeholder="'Set a password'"
          :type="'password'"
          :account-class="
            validInput.password
              ? 'create-account__password error'
              : 'create-account__password'
          "
          :img="require('~/assets/img/password.svg')"
          :btn-show-password="true"
          @textInput="checkPassword"
        ></U-input>
        <p v-show="validInput.password" class="errorInput">
          Please enter a password of at least 6 characters
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
      v-if="popupSiginigUpLink"
      @closePopupLinkSent="showPopupLinkSent"
    ></signing-up-link-sent>
  </div>
</template>
<script>
import UBack from "@/components/theme/UBack.vue";
import UTitle from "../theme/UTitle.vue";
import UInput from "../theme/UInput.vue";
import UButton from "../theme/UButton.vue";
import PopupEmailLink from "../theme/PopupEmailLink.vue";
import SigningUpLinkSent from "../theme/SigningUpLinkSent.vue";
import SystemAlert from "../theme/SystemAlert.vue";

export default {
  components: {
    UBack,
    UTitle,
    UInput,
    UButton,
    PopupEmailLink,
    SigningUpLinkSent,
    SystemAlert,
  },
  data: () => ({
    name: "",
    password: "",
    email: "",
    error: "",
    popupEmailLink: false,
    popupSiginigUpLink: false,
    alert: false,
    validInput: {
      email: false,
      password: false,
      fullName: false,
    },
    validaterugular: {
      email: /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
  }),
  computed: {},
  methods: {
    async register() {
      try {
        const newUser = await this.$strapi.register({
          email: this.email,
          username: this.name,
          password: this.password,
        });
        console.log(newUser);
        if (newUser !== null) {
          this.error = "";
          this.$nuxt.$router.push("/");
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    showPopupEmailLink() {
      this.popupEmailLink = !this.popupEmailLink;
    },
    showPopupLinkSent() {
      if (this.popupSiginigUpLink) {
        this.popupSiginigUpLink = !this.popupSiginigUpLink;
      } else {
        this.popupSiginigUpLink = !this.popupSiginigUpLink;
        this.popupEmailLink = !this.popupEmailLink;
      }
    },
    checkEmail(textValue) {
      this.validInput.email = !this.emailPattern.test(textValue);
      this.email = textValue;
    },
    checkPassword(textValue) {
      this.validInput.password = textValue.length < 6;
      this.password = textValue;
    },
    checkName(textValue) {
      this.validInput.fullName = textValue.length < 2;
      this.name = textValue;
    },
  },
};
</script>
