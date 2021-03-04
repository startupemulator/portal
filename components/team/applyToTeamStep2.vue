<template>
  <div class="apply-to-team apply-to-team-step2">
    <U-title :text="'Apply to Startup #1'"></U-title>
    <U-select></U-select>
    <textarea
      class="apply-to-team__comment"
      placeholder="Comment


"
    ></textarea>
    <div class="apply-to-team__button">
      <U-button
        :button-class="'u-button-blue'"
        :button-name="'Apply'"
        @clickOnButton="$emit('popupApplied')"
      ></U-button>
    </div>
  </div>
</template>
<script>
import UTitle from "../theme/UTitle.vue";
import USelect from "../theme/USelect";
import UButton from "~/components/theme/UButton";

export default {
  components: {
    UTitle,
    UButton,
    USelect,
  },
};
</script>
