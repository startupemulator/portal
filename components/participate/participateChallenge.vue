<template>
  <div class="participate-challenge">
    <div class="participate-challenge__content">
      <U-Back link="/"></U-Back>
      <U-title :text="'Participate in Task Name'"></U-title>
      <Duration-picker
        :title="'Select your expected estimation for this challenge'"
      ></Duration-picker>

      <Add-input :placeholder="'Or enter the number of days'"></Add-input>
      <div class="bottom-fixed-button">
        <U-button
          :button-name="'Start'"
          :button-class="'u-button-blue'"
          @clickOnButton="togglePopupChallengeStarted"
        ></U-button>
      </div>
    </div>
    <popup-challenge-started
      v-if="popupChallengeStarted"
      @closePopupLinkSent="togglePopupChallengeStarted"
    ></popup-challenge-started>
  </div>
</template>
<script>
import UBack from "../theme/UBack.vue";
import UTitle from "../theme/UTitle.vue";
import AddInput from "../theme/AddInput";
import UButton from "../theme/UButton.vue";
import DurationPicker from "../theme/DurationPicker.vue";
import PopupChallengeStarted from "../theme/PopupChallengeStarted.vue";

export default {
  components: {
    UBack,
    UTitle,
    UButton,
    DurationPicker,
    AddInput,
    PopupChallengeStarted,
  },
  data() {
    return {
      numberDays: "",
      popupChallengeStarted: false,
    };
  },
  methods: {
    togglePopupChallengeStarted() {
      this.popupChallengeStarted = !this.popupChallengeStarted;
    },
  },
};
</script>
