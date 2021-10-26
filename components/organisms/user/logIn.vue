<template>
  <div class="account">
    <form>
      <div class="create-account">
        <U-Back link="/"></U-Back>
        <U-Title :text="'Log in'"></U-Title>
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
          ></U-Input>
          <p v-show="$v.password.$error" class="errorInput">
            Please enter a password of at least 8 characters
          </p>
        </div>

        <U-Button
          :button-name="'Log in'"
          :button-class="'u-button-blue create-account__log-in'"
          @clickOnButton="login"
        ></U-Button>
        <hr />
        <div class="create-account__buttons-continue">
          <A-Link
            :link="getAuthGithubLink()"
            :link-name="'Continue with GitHub'"
          ></A-Link>
          <U-Button
            :button-name="'Continue with the email link'"
            :button-class="'u-button-gray'"
            @clickOnButton="showPopupEmailLink"
          ></U-Button>
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
    <Popup-Email-Link
      v-if="popupEmailLink"
      @closePopupLinkEmail="showPopupEmailLink"
      @openPopupLinkSent="showPopupLinkSent"
      @sendLink="sendLoginLink"
    ></Popup-Email-Link>
    <Signing-Up-Link-Sent
      v-if="popupSignUpLink"
      @closePopupLinkSent="showPopupLinkSent"
    ></Signing-Up-Link-Sent>
  </div>
</template>

<script lang="ts">
import { email, minLength, required } from "vuelidate/lib/validators";
import { Component, Vue } from "nuxt-property-decorator";
import Toast from "../../../store/modules/Toast";
import { User } from "../../../models/User";
import PopupEmailLink from "~/components/molecules/popupEmailLink.vue";
import SigningUpLinkSent from "~/components/molecules/signingUpLinkSent.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import UButton from "~/components/atoms/uButton.vue";
import ALink from "~/components/atoms/uLink.vue";
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
    ALink,
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
        const userLogin = await this.$strapi.login({
          identifier: this.email,
          password: this.password,
        });
        if (userLogin) {
          const user: Partial<User> = await this.$getUserByEmail(this.email);
          if (user.profile.name === null || user.profile.name === "") {
            this.$nuxt.$router.push("/profile/?editProfile");
          } else {
            this.$nuxt.$router.push("/profile/projects");
          }
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

  getAuthGithubLink() {
    return `${this.$config.strapi.url}connect/github`;
  }
}
</script>
