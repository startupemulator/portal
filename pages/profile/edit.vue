<template>
  <div class="edit-profile">
    <div class="edit-profile__header">
      <u-back :link="'/profile'"></u-back>
      <u-title :text="'Edit profile'"></u-title>
    </div>
    <div class="edit-profile__content">
      <p>Full name</p>

      <UInput
        v-model="userName"
        :placeholder="''"
        :account-class="
          $v.userName.$error
            ? 'create-account__password error'
            : 'create-account__password'
        "
        @textInput="textInput"
      ></UInput>
      <p v-show="$v.userName.$error" class="errorInput">
        Please enter a full name, least 6 characters
      </p>
      <DurationExperiensePicker
        :title="'Total years of your experience'"
        :experiences="EditProfilePage.experiences"
        :duration="choosenExperiences"
        @clickOnDuration="EditProfilePage.changeTotalExperience($event)"
      ></DurationExperiensePicker>
      <p v-show="$v.choosenExperiences.$error" class="errorInput">
        Please choose total years of your experience
      </p>
      <TechnologyPicker
        :title="'Pick technologies you have an experience with'"
        :technologies="EditProfilePage.technologies"
        :choosen-technologies="EditProfilePage.profile.technologies"
        @chosenTechnologi="EditProfilePage.pickTechnology($event)"
        @addTechnologies="addTechnologies"
        @removeTechnology="removeTechnology"
      ></TechnologyPicker>

      <div class="edit-profile__buttons">
        <u-button
          :button-name="'Save'"
          :button-class="'u-button-blue'"
          @clickOnButton="saveProfileUpdateData"
        ></u-button>
        <u-button
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
          @clickOnButton="$router.push('/profile')"
        ></u-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { minLength, required } from "vuelidate/lib/validators";
import Toast from "~/store/modules/Toast";
import DurationExperiensePicker from "~/components/molecules/durationExperiencePicker.vue";
import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import uBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import uButton from "~/components/atoms/uButton.vue";
import { EditProfilePage } from "~/store";
import Spinner from "~/store/modules/Spinner";

@Component({
  components: {
    uBack,
    UTitle,
    uButton,
    UInput,
    DurationExperiensePicker,
    TechnologyPicker,
  },
  validations: {
    userName: {
      required,
      minLength: minLength(6),
    },
    choosenExperiences: {
      required,
    },
  },
})
export default class extends Vue {
  EditProfilePage;

  constructor() {
    super();
    this.EditProfilePage = EditProfilePage;
  }

  async asyncData(context) {
    await EditProfilePage.init(context);
  }

  userName = EditProfilePage.profile?.name;
  choosenExperiences = EditProfilePage.profile.experience.id
    ? EditProfilePage.profile.experience.id
    : null;

  async saveProfileUpdateData() {
    this.$v.$touch();
    if (!this.$v.$error) {
      Spinner.show();
      try {
        await EditProfilePage.saveProfile(this);
      } catch (e) {
        console.error(e);
        Toast.show({
          data: e.message,
          duration: 3000,
        });
      } finally {
        Spinner.hide();
        if (EditProfilePage.profileUpdated) {
          this.$nuxt.$router.push("/profile");
        }
      }
    }
  }

  removeTechnology(technology) {
    EditProfilePage.removePersonalAddedTechnologies(technology);
  }

  addTechnologies(technologies) {
    EditProfilePage.addPersonalAddedTechnologies(technologies);
  }

  textInput(data) {
    this.userName = data;
    this.$v.$touch();
    EditProfilePage.changeFullName(data);
  }
}
</script>

<style lang="scss">
.edit-profile {
  .errorInput {
    top: 0;
  }
}
</style>
