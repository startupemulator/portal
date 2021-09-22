<template>
  <div class="account">
    <form>
      <div class="create-account">
        <U-Back link="/"></U-Back>
        <U-Title :text="'Log in'"></U-Title>
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
        <div>
          <U-input
            :placeholder="'Enter your password'"
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
            Please enter a password of at least 8 characters
          </p>
        </div>

        <U-button
          :button-name="'Log in'"
          :button-class="'u-button-blue create-account__log-in'"
          @clickOnButton="login"
        ></U-button>
        <hr />
        <div class="create-account__buttons-continue">
          <U-button
            :button-name="'Continue with GitHub'"
            :button-class="'u-button-gray'"
            :is-link="'nuxt-link'"
            :href="'/auth/github/connect'"
          ></U-button>
          <U-button
            :button-name="'Continue with the email link'"
            :button-class="'u-button-gray'"
            @clickOnButton="showPopupEmailLink"
          ></U-button>
        </div>
        <div class="account__go-to-sign-up">
          <span>Don’t have an account?</span>
          <U-Back
            link="/createAccount"
            :img="false"
            :title="'Sign up'"
          ></U-Back>
        </div>
      </div>
    </form>
    <popup-email-link
      v-if="popupEmailLink"
      @closePopupLinkEmail="showPopupEmailLink"
      @openPopupLinkSent="showPopupLinkSent"
      @sendLink="sendLoginLink"
    ></popup-email-link>
    <signing-up-link-sent
      v-if="popupSignUpLink"
      @closePopupLinkSent="showPopupLinkSent"
    ></signing-up-link-sent>
  </div>
</template>

<script lang="ts">
import { email, minLength, required } from "vuelidate/lib/validators";
import { Component, Vue } from "nuxt-property-decorator";
import Toast from "../../../store/modules/Toast";
import PopupEmailLink from "~/components/molecules/popupEmailLink.vue";
import SigningUpLinkSent from "~/components/molecules/signingUpLinkSent.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import UButton from "~/components/atoms/uButton.vue";
import {
  disableScrolling,
  enableScrolling,
} from "~/assets/jshelper/toggleScroll.js";
@Component({
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  components: {
    UBack,
    UTitle,
    UInput,
    UButton,
    PopupEmailLink,
    SigningUpLinkSent,
  },
})
export default class extends Vue {
  email: string = "";
  password: string = "";
  popupEmailLink: boolean = false;
  popupSignUpLink: boolean = false;
  async login() {
    this.$v.$touch();
    if (!this.$v.$error) {
      try {
        const user = await this.$strapi.login({
          identifier: this.email,
          password: this.password,
        });

        if (user) {
          if (user.user.profile === null) {
            await this.$createNewProfile(
              user.user.username,
              user.user.id.toString()
            );
          }
          this.$nuxt.$router.push("/profile/projects");
        }
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
