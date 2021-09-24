<template>
  <div class="become-expert">
    <div class="become-expert__content">
      <U-title :text="'Become an expert'"></U-title>
      <p>Full name</p>
      <U-input
        :value="userName"
        :placeholder="'Enter your full name'"
        :type="'text'"
        :img="require('~/assets/img/profile.svg')"
        :btn-show-password="false"
        :account-class="
          $v.fullName.$error
            ? 'create-account__password error'
            : 'create-account__password'
        "
        @textInput="checkName"
      ></U-input>
      <p v-show="$v.fullName.$error" class="errorInput">
        Please enter a name of at least 4 characters
      </p>
      <TechnologyPicker
        :technologies="technologies"
        @chosenTechnologi="chosenTechnologi"
        @addTechnologies="addTechnologies"
      ></TechnologyPicker>
      <div class="become-expert__buttons">
        <U-button
          :button-name="'Finish Signing Up'"
          :button-class="'u-button-blue create-account__log-in'"
          @clickOnButton="finishSigningUp"
        ></U-button>
      </div>
    </div>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { minLength, required } from "vuelidate/lib/validators";

import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import UButton from "~/components/atoms/uButton.vue";
import { Technology } from "~/models/Technology";
import Toast from "~/store/modules/Toast";
import Spiner from "~/components/molecules/spiner.vue";

@Component({
  components: {
    TechnologyPicker,
    UTitle,
    UInput,
    UButton,
    Spiner,
  },
  validations: {
    fullName: {
      required,
      minLength: minLength(4),
    },
  },
})
export default class extends Vue {
  @Prop() technologies: Array<Technology>;
  @Prop() userId: String;
  @Prop() userName!: String;
  fullName = this.userName ? this.userName : "";
  choosenTechnology: String = "";
  addedTechnologies: Array<String> = [];
  loading = false;

  checkName(textValue: String) {
    this.fullName = textValue.trim();
    this.$v.fullName.$touch();
  }

  chosenTechnologi(choosenTechnology, id) {
    this.choosenTechnology = id;
  }

  addTechnologies(data) {
    this.addedTechnologies = data;
  }

  async finishSigningUp() {
    this.$v.$touch();
    if (!this.$v.$error) {
      this.loading = true;
      try {
        const findProfile = await this.$profile(this.userId);
        if (this.addedTechnologies.length > 0) {
          await this.addedTechnologies.forEach((el) => {
            this.$createTechnologies(this.userId, el.name);
          });
        }
        await this.$updateProfileName(findProfile.id, this.fullName);
        this.loading = false;
        this.$nuxt.$router.push("/profile/projects");
      } catch (e) {
        this.loading = false;
        Toast.show({
          data: e.message,
          duration: 3000,
        });
      }
    } else {
      this.loading = false;
      Toast.show({
        data: "Fill the form correctly.",
        duration: 3000,
      });
    }
  }
}
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
        min-height: auto;
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
    margin-top: 32px;
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
