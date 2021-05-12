<template>
  <div class="edit-profile">
    <!-- <pre style="color: #fff">{{ myTechnologies }}</pre> -->
    <div class="edit-profile__header">
      <u-back :is-button="true" @clikOnButton="$emit('clickOnButton')"></u-back>
      <u-title :text="'Edit profile'"></u-title>
    </div>
    <div class="edit-profile__content">
      <p>Full name</p>

      <UInput
        :placeholder="''"
        :value="userData.username"
        @textInput="textInput"
      ></UInput>
      <DurationExperiensePicker
        :title="'Total years of your experience'"
        :experiences="experiences"
        :duration="userExperience.id"
        @clickOnDuration="clickOnDuration"
      ></DurationExperiensePicker>
      <TechnologyPicker
        :key="updateKey"
        :title="'Pick technologies you have an experience with'"
        :technologies="technologies"
        :choosen-technologies="choosenTechnologies"
        @chosenTechnologi="chosenTechnologi"
        @addTechnologies="addTechnologies"
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
          @clickOnButton="$emit('clickOnButton')"
        ></u-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
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
})
export default class extends Vue {
  @Prop() userData: Array<any>;
  @Prop() userExperience: Array<any>;
  @Prop() experiences: Array<Experience>;
  @Prop() technologies: Array<Technology>;
  @Prop() myTechnologies: Array<Technology>;
  choosenTechnologies = [];
  profileUpdateData = {};
  updateKey = 0;
  saveProfileUpdateData() {
    this.$emit("saveProfileUpdateData", this.profileUpdateData);
  }

  clickOnDuration(data) {
    this.profileUpdateData.experiences = data;
  }

  chosenTechnologi(data, id) {
    this.profileUpdateData.technologies = id;
  }

  addTechnologies(data) {
    this.profileUpdateData.newTwchnologies = data;
  }

  textInput(data) {
    this.profileUpdateData.username = data;
  }

  mounted() {
    this.updateKey += 1;
    this.myTechnologies.forEach((el) => this.choosenTechnologies.push(el.id));
  }
}
</script>
