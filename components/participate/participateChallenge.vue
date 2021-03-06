<template>
  <div class="participate-challenge">
    <div class="participate-challenge__content">
      <U-Back link="/"></U-Back>
      <U-title :text="'Participate in ' + challenge.title"></U-title>
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

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Challenge } from "../../models/Challenge";
import UBack from "~/components/theme/UBack";
import UTitle from "~/components/theme/UTitle";
import UButton from "~/components/theme/UButton";
import DurationPicker from "~/components/theme/DurationPicker";
import AddInput from "~/components/theme/AddInput";
import PopupChallengeStarted from "~/components/theme/PopupChallengeStarted";

@Component({
  components: {
    UBack,
    UTitle,
    UButton,
    DurationPicker,
    AddInput,
    PopupChallengeStarted,
  },
})
export default class ParticipateChallenge extends Vue {
  @Prop() challenge: Challenge;
  popupChallengeStarted = false;
  numberDays = 3;

  togglePopupChallengeStarted() {
    this.popupChallengeStarted = !this.popupChallengeStarted;
  }
}
</script>
