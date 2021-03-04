<template>
  <div class="apply-to-team-step1">
    <U-title :text="'Your experience'"></U-title>
    <Duration-experiense-picker
      :title="'Total years of your experience'"
    ></Duration-experiense-picker>
    <technologi-piker
      :title="'Pick technologies you have an experience with'"
    ></technologi-piker>
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
import UTitle from "../theme/UTitle.vue";
import TechnologiPiker from "../theme/technologiPiker.vue";
import UButton from "~/components/theme/UButton";
import DurationExperiensePicker from "~/components/theme/DurationExperiensePicker";
export default {
  components: {
    DurationExperiensePicker,
    UTitle,
    TechnologiPiker,
    UButton,
  },
};
</script>
