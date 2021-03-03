<template>
  <div class="apply-to-team">
    <U-back :link="'/'"></U-back>
    <U-title :text="'Your experience'"></U-title>
    <Duration-experiense-picker></Duration-experiense-picker>
  </div>
</template>

<script>
import UBack from "~/components/theme/UBack";
import UTitle from "~/components/theme/UTitle";
import DurationExperiensePicker from "~/components/theme/DurationExperiensePicker";
export default {
  components: {
    UBack,
    UTitle,
    DurationExperiensePicker,
  },
};
</script>
