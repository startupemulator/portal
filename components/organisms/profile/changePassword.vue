<template>
  <div class="change-password">
    <u-back :is-button="true" @clikOnButton="$emit('clickOnButton')"></u-back>
    <u-title
      :text="passwordType === 'update' ? 'Change password' : 'Create password'"
    ></u-title>
    <div class="change-password__content">
      <div v-if="passwordType === 'update'">
        <p>Current password</p>
        <U-Input
          :placeholder="'Enter your current password'"
          :type="'password'"
          :value="currentPassword"
          :account-class="
            $v.currentPassword.$error
              ? 'create-account__email error'
              : 'create-account__email'
          "
          :img="require('~/assets/img/password.svg')"
          :btn-show-password="true"
          @textInput="inputCurrentPassword"
        ></U-Input>

        <p v-show="$v.currentPassword.$error" class="errorInput">
          Please enter current password
        </p>
      </div>
      <p>New password</p>

      <U-Input
        :placeholder="'Enter your new password'"
        :type="'password'"
        :value="password"
        :account-class="
          $v.password.$error
            ? 'create-account__email error'
            : 'create-account__email'
        "
        :img="require('~/assets/img/password.svg')"
        :btn-show-password="true"
        @textInput="inputNewPassword"
      ></U-Input>
      <p v-show="$v.password.$error" class="errorInput">
        Please enter a password of at least 8 characters
      </p>
      <p>Confirm new password</p>

      <U-Input
        :placeholder="'Enter your new password one more time'"
        :type="'password'"
        :value="confirmPassword"
        :account-class="
          $v.confirmPassword.$error
            ? 'create-account__email error'
            : 'create-account__email'
        "
        :img="require('~/assets/img/password.svg')"
        :btn-show-password="true"
        @textInput="inputConfirmPassword"
      ></U-Input>
      <p v-show="$v.confirmPassword.$error" class="errorInput">
        Both passwords should be the same
      </p>
      <div class="change-password__buttons">
        <U-Button
          :button-name="'Change'"
          :button-class="'u-button-blue'"
          @clickOnButton="changePassword"
        ></U-Button>
        <U-Button
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
          @clickOnButton="$emit('clickOnButton')"
        ></U-Button>
      </div>
    </div>
    <Popup-Challenge-Started
      v-if="popupChallengeStarted"
      :title="'You successfully changed your password'"
      :text-content="''"
    ></Popup-Challenge-Started>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { minLength, required, sameAs } from "vuelidate/lib/validators";
import Toast from "../../../store/modules/Toast";
import Spinner from "../../../store/modules/Spinner";
import uBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import UButton from "~/components/atoms/uButton.vue";
import PopupChallengeStarted from "~/components/molecules/popupChallengeStarted.vue";

@Component({
  components: {
    uBack,
    UTitle,
    UInput,
    UButton,
    PopupChallengeStarted,
  },
  validations: {
    currentPassword: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      sameAsPassword: sameAs("password"),
      minLength: minLength(8),
    },
  },
})
export default class extends Vue {
  @Prop() userId: string;
  popupChallengeStarted = false;
  currentPassword = "";
  password = "";
  confirmPassword = "";
  passwordType = "";

  async changePassword() {
    this.$v.$touch();
    if (!this.$v.$error) {
      try {
        Spinner.show();
        let userPassword = null;
        if (this.passwordType === "update") {
          userPassword = await this.$updateUserPassword(
            this.password,
            this.currentPassword,
            this.confirmPassword
          );
        } else if (this.passwordType === "create") {
          userPassword = await this.$createPassword(
            this.password,
            this.confirmPassword
          );
        }
        if (userPassword !== null) {
          this.togglePopupChallengeStarted();
          Spinner.hide();
        } else {
          Spinner.hide();
          Toast.show({
            data: "Something wrong.",
            duration: 3000,
          });
        }
      } catch (e) {
        Spinner.hide();
        Toast.show({
          data: "Old password is invalid",
          duration: 3000,
        });
      }
    }
  }

  togglePopupChallengeStarted() {
    this.popupChallengeStarted = !this.popupChallengeStarted;
  }

  inputCurrentPassword(data) {
    this.currentPassword = data;
  }

  inputNewPassword(data) {
    this.password = data;
  }

  inputConfirmPassword(data) {
    this.confirmPassword = data;
  }

  async mounted() {
    try {
      const passwordType = await this.$passwordType();
      if (passwordType !== null) {
        this.passwordType = passwordType.type;
      }
      if (this.passwordType === "create") {
        this.currentPassword = "true";
      }
    } catch (e) {
      console.error(e);
    }
  }
}
</script>
<style lang="scss">
.change-password .signing-up-link-sent .signing-up-link-sent__content {
  min-height: 260px;
  padding: 48px;
}
</style>
