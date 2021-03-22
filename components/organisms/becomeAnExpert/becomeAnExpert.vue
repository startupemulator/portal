<template>
  <div class="become-expert">
    <div class="become-expert__content">
      <U-title :text="'Become an expert'"></U-title>
      <p>Full name</p>
      <U-input
        :placeholder="'Enter your full name'"
        :type="'text'"
        :img="require('~/assets/img/profile.svg')"
        :btn-show-password="false"
        :account-class="
          validInput.fullName
            ? 'create-account__password error'
            : 'create-account__password'
        "
        @textInput="checkName"
      ></U-input>
      <p v-show="validInput.fullName" class="errorInput">
        Please enter a password of at least 6 characters
      </p>
      <technology-picker
        :title="'Pick technologies you are expert in'"
      ></technology-picker>
      <div class="become-expert__buttons">
        <U-button
          :button-name="'Finish Signing Up'"
          :button-class="'u-button-blue create-account__log-in'"
        ></U-button>
      </div>
    </div>
  </div>
</template>

<script>
import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import UButton from "~/components/atoms/uButton.vue";
export default {
  components: { UTitle, UInput, UButton, TechnologyPicker },
  data: () => ({
    validInput: {
      fullName: false,
    },
  }),
  methods: {
    checkName(textValue) {
      textValue = textValue.trim();
      this.validInput.fullName = textValue.length < 6;
    },
    showAlert() {
      this.alert = !this.alert;
      setTimeout(() => (this.alert = !this.alert), 4000);
    },
  },
};
</script>
<style lang="scss">
.become-expert {
  width: 343px;
  min-height: 460px;
  margin: 0 auto;
}
.become-expert__content {
  margin-top: 48px;

  p {
    color: #fff;
    margin-top: 34px;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  .errorInput {
    margin: 0;
    margin-top: 16px;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #f87b7b;
  }
  .technology-picker h2 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-top: 32px;
    margin-bottom: 12px;
  }
  .technology-picker {
    form {
      min-height: 340px;
    }
  }
}
.become-expert__buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #232b39;
  border: 1px solid #3b465a;
  box-shadow: inset 0 0 10px 2px #262f3f;
  border-radius: 16px 16px 0 0;
  padding: 16px 16px 28px 16px;
  box-sizing: border-box;
  z-index: 5;
}
.become-expert ~ .main-footer {
  padding-bottom: 75px;
}
@media (min-width: 768px) {
  .become-expert {
    width: 660px;
  }
  .become-expert__content {
    margin-top: 72px;

    p {
      margin-top: 40px;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 17px;
      line-height: 32px;
    }
    .technology-picker h2 {
      font-size: 17px;
      line-height: 32px;
    }
    .technology-picker {
      form {
        min-height: 230px;
        width: 603px;
      }
    }
  }
  .become-expert__buttons {
    position: relative;
    width: 660px;
    background: transparent;
    border: 0;
    border-top: 1px solid #3b465a;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    box-sizing: border-box;
    button {
      margin-top: 32px;
      margin-left: 0;
      width: 660px;
    }
  }
  .become-expert ~ .main-footer {
    padding-bottom: 0;
  }
}
</style>
