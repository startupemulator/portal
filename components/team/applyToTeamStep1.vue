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
import UTitle from "../theme/uTitle.vue";
import TechnologyPicker from "../theme/technologyPicker.vue";
import UButton from "~/components/theme/uButton";
import DurationExperiencePicker from "~/components/theme/durationExperiensePicker";
export default {
  components: {
    DurationExperiencePicker,
    UTitle,
    UButton,
    TechnologyPicker,
  },
};
</script>
