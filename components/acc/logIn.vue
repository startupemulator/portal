<template>
  <div class="account">
    <!-- <transition name="slide-fade">
      <div v-if="togglePopup" class="sign-up-link-popup">
        <div v-if="sendEmail" class="sended-mail">
          <button type="button" class="sign-up-link__close">
            <img
              src="@/assets/img/close.svg"
              alt="Close"
              @click="
                togglePopup = !togglePopup;
                sendEmail = !sendEmail;
              "
            />
          </button>
          <h2>Signing up link was sent</h2>
          <h3>
            Signing up link was sent to your email. Follow the link to create an
            account.
          </h3>
        </div>

        <div v-if="!sendEmail" class="sign-up-link">
          <button type="button" class="sign-up-link__close">
            <img
              src="@/assets/img/close.svg"
              alt="Close"
              @click="togglePopup = !togglePopup"
            />
          </button>
          <h2>Sign up with the email link</h2>
          <p>
            Signing up link will be sent to your email. After signing up you can
            log in in the same way.
          </p>
          <form>
            <label for="account-email"></label>
            <input type="email" placeholder="Enter your email" />

            <button
              type="button "
              class="create-account-btn-sign"
              @click.prevent="checkPopupForm"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </transition> -->
    <!-- __________________________________ -->
    <!-- _______________________________________ -->
    <div class="create-account">
      <U-Back link="/"></U-Back>
      <U-Title :text="'Log in'"> </U-Title>
      <U-input
        :placeholder="'Enter your email'"
        :type="'email'"
        :account-class="'create-account__email'"
      ></U-input>
      <U-input
        :placeholder="'Enter your password'"
        :type="'password'"
        :account-class="'create-account__password'"
      ></U-input>
      <U-button
        :button-name="'Log in'"
        :button-class="['u-button-blue', 'create-account__log-in']"
      ></U-button>
      <hr />
      <div class="create-account__buttons-continue">
        <U-button
          :button-name="'Continue with GitHub'"
          :button-class="'u-button-gray'"
        ></U-button>
        <U-button
          :button-name="'Continue with the email link'"
          :button-class="'u-button-gray'"
        ></U-button>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapActions, mapState } from "vuex";
import { mapState } from "vuex";
import UBack from "@/components/theme/UBack.vue";
import UTitle from "../theme/UTitle.vue";
import UInput from "../theme/UInput.vue";
import UButton from "../theme/UButton.vue";
export default {
  components: {
    UBack,
    UTitle,
    UInput,
    UButton,
  },
  data: () => ({
    togglePopup: false,
    sendEmail: false,
    email: " ",
    password: true,
    emailInvalid: false,
    validaterugular: {
      email: /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
  }),
  computed: {
    ...mapState("login", [
      "togglePopup",
      "sendEmail",
      "email",
      "popupEmail",
      "popupEmailInvalid",
      "enterErrEmail",
      "inputedPassword",
      "password",
      "showPassword",
      "emailInvalid",
      "validaterugular",
    ]),
    // login(){
    //   return this.$store.state.login.name
    // }
  },
  methods: {
    checkEmail() {
      this.emailInvalid = true;
      this.validaterugular.email.test(this.email)
        ? (this.emailInvalid = false)
        : (this.emailInvalid = true);
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/css/variables.scss";
.account {
  max-width: 660px;
  min-height: 490px;
  margin: 0 auto;
  margin-top: 37px;
  .create-account {
    margin: 0 16px;
  }
  .create-account__password {
    margin-top: 16px;
  }
  .create-account__log-in {
    margin-top: 24px;
  }
  hr {
    background: #4e5a71;
    height: 1px;
    border: none;
    margin-top: 32px;
  }
  .create-account__buttons-continue {
    margin-top: 16px;
  }
}
@media (min-width: 768px) {
  .account {
    .create-account {
      margin: 0;
      .button-back {
        margin-top: 45px;
      }
    }
    .create-account__buttons-continue {
      display: flex;
      justify-content: space-between;
      .u-button {
        width: 318px;
        font-size: 18px;
        line-height: 32px;
      }
    }
  }
}
</style>
