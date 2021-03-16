<template>
  <div class="apply-to-team-step1">
    <U-title :text="'Your experience'"></U-title>
    <duration-experience-picker
      :title="'Total years of your experience'"
    ></duration-experience-picker>
    <technology-picker
      :title="'Pick technologies you have an experience with'"
    ></technology-picker>
    <div class="apply-to-team__button">
      <U-button
        :button-class="'u-button-blue'"
        :button-name="'Next'"
        @clickOnButton="$emit('applyToTeamGoStep2')"
      ></U-button>
    </div>
  </div>
</template>
<script>
import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton";
import DurationExperiencePicker from "~/components/molecules/durationExperiensePicker";
export default {
  components: {
    DurationExperiencePicker,
    UTitle,
    UButton,
    TechnologyPicker,
  },
};
</script>
