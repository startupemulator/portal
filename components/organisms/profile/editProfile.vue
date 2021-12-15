<template>
  <div class="edit-profile">
    <div class="edit-profile__header">
      <u-back :is-button="true" @clikOnButton="$emit('clickOnButton')"></u-back>
      <U-Title :text="'Edit profile'"></U-Title>
    </div>
    <div class="edit-profile__content">
      <p>Full name</p>

      <U-Input
        v-model="userName"
        :placeholder="''"
        :account-class="
          $v.userName.$error
            ? 'create-account__password error'
            : 'create-account__password'
        "
        @textInput="textInput"
      ></U-Input>
      <p v-show="$v.userName.$error" class="errorInput">
        Please enter a full name, least 6 characters
      </p>
      <Duration-Experiense-Picker
        :title="'Total years of your experience'"
        :experiences="experiences"
        :duration="userExperience ? userExperience.id : null"
        @clickOnDuration="clickOnDuration"
      ></Duration-Experiense-Picker>
      <p v-show="$v.choosenExperiences.$error" class="errorInput">
        Please choose total years of your experience
      </p>
      <Technology-Picker
        :key="updateKey"
        :title="'Pick technologies you have an experience with'"
        :technologies="technologies"
        :choosen-technologies="choosenTechnologies"
        @chosenTechnologi="chosenTechnologi"
        @addTechnologies="addTechnologies"
        @removeTechnology="removeTechnology"
      ></Technology-Picker>

      <div class="edit-profile__buttons">
        <U-Button
          :button-name="'Save'"
          :button-class="'u-button-blue'"
          @clickOnButton="saveProfileUpdateData"
        ></U-Button>
        <U-Button
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
          @clickOnButton="$emit('clickOnButton')"
        ></U-Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { minLength, required } from "vuelidate/lib/validators";
import DurationExperiensePicker from "../../molecules/durationExperiencePicker.vue";
import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import uBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import uButton from "~/components/atoms/uButton.vue";
import { Experience } from "~/models/Experience";
import { Technology } from "~/models/Technology";

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
  @Prop() userData!: Array<any>;
  @Prop() userExperience: Array<any>;
  @Prop() experiences: Array<Experience>;
  @Prop() technologies: Array<Technology>;
  @Prop() myTechnologies: Array<Technology>;
  choosenTechnologies = [];
  profileUpdateData = {};
  updateKey = 0;
  userName = this.userData.profile.name;
  choosenExperiences = "";
  saveProfileUpdateData() {
    this.$v.$touch();
    this.profileUpdateData.userName = this.userName;
    this.profileUpdateData.userId = this.userData.id;
    if (!this.$v.$error) {
      this.$emit("saveProfileUpdateData", this.profileUpdateData);
    }
  }

  removeTechnology(data) {
    this.$emit("removeTechnology", data);
  }

  clickOnDuration(data) {
    this.choosenExperiences = data.id;
    this.profileUpdateData.experiences = data;
  }

  chosenTechnologi(data, id) {
    this.profileUpdateData.technologies = id;
  }

  addTechnologies(data) {
    this.profileUpdateData.newTechnologies = data;
    this.$emit("addTechnologies", data);
  }

  textInput(data) {
    this.$v.$touch();
    this.userName = data;
  }

  mounted() {
    this.updateKey += 1;
    this.profileUpdateData.technologies = [];
    this.myTechnologies.forEach((el) => {
      if (el.is_public) {
        this.profileUpdateData.technologies.push(el.id);
      }

      this.choosenTechnologies.push({
        id: el.id,
        title: el.title,
        is_public: el.is_public,
      });
    });
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
