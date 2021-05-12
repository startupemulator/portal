<template>
  <div class="edit-profile">
    <div class="edit-profile__header">
      <u-back :is-button="true" @clikOnButton="$emit('clickOnButton')"></u-back>
      <u-title :text="'Edit profile'"></u-title>
    </div>
    <div class="edit-profile__content">
      <p>Full name</p>

      <u-input :placeholder="''" :value="userData.username"></u-input>
      {{ experiences }}
      <DurationExperiensePicker
        :title="'Total years of your experience'"
        :experience="experiences"
      ></DurationExperiensePicker>
      <TechnologyPicker
        :title="'Pick technologies you have an experience with'"
      ></TechnologyPicker>
      <div class="edit-profile__buttons">
        <u-button
          :button-name="'Save'"
          :button-class="'u-button-blue'"
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
  @Prop() experiences: Array<Experience>;
}
</script>
