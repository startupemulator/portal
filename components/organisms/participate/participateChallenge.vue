<template>
  <div class="participate-challenge">
    <div class="participate-challenge__content">
      <U-Back link="/challenges"></U-Back>
      <U-title :text="'Participate in ' + challenge.title"></U-title>
      <Duration-picker
        :title="'Select your expected estimation for this challenge'"
        :estimations="estimations"
        :duration="duration"
        @clickOnDuration="chooseDuration"
      ></Duration-picker>

      <UInput
        :placeholder="'Or enter the number of days'"
        :value="duration"
        :account-class="
          $v.duration.$error
            ? 'create-account__email error'
            : 'create-account__email'
        "
        @textInput="textInput"
      ></UInput>
      <p v-show="$v.duration.$error" class="errorInput">
        Please enter an estimation
      </p>
      <div class="bottom-fixed-button">
        <U-button
          :button-name="'Start'"
          :button-class="'u-button-blue'"
          @clickOnButton="startChallenge"
        ></U-button>
      </div>
    </div>
    <PopupChallengeStarted
      v-if="popupChallengeStarted"
      :title="'The challenge has started'"
      :text-content="`Come back when you complete this challenge and get feedback from our
        experts. Also, feel free to request feedback when you are in progress.`"
    ></PopupChallengeStarted>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { required, minLength } from "vuelidate/lib/validators";
import { Estimation } from "../../../models/Estimation";
import DurationPicker from "~/components/molecules/durationPicker.vue";
import PopupChallengeStarted from "~/components/molecules/popupChallengeStarted.vue";
import { Challenge } from "~/models/Challenge";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import UInput from "~/components/atoms/uInput.vue";

@Component({
  components: {
    UBack,
    UTitle,
    UButton,
    DurationPicker,
    UInput,
    PopupChallengeStarted,
  },
  validations: {
    duration: {
      required,
      minLength: minLength(1),
    },
  },
})
export default class ParticipateChallenge extends Vue {
  @Prop() challenge: Challenge;
  @Prop() estimations: Estimation;
  duration: Number | String = "";

  @Prop() popupChallengeStarted = false;

  startChallenge() {
    this.$v.$touch();
    if (!this.$v.$error) {
      this.$emit("startChallenge", this.duration);
    }
  }

  textInput(days) {
    this.duration = days;
  }

  chooseDuration(el: { [key: string]: any }) {
    this.duration = el.value;
  }
}
</script>
<style lang="scss">
input {
  border: 2px solid transparent;
  &:focus {
    border: 2px solid #b5c1d8;
  }
}
.days-title {
  position: relative;
  &::after {
    position: absolute;
    content: "days";
    right: 24px;
    bottom: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #dbe4f3;
  }
}
.participate-challenge {
  .errorInput {
    top: 0;
  }
}
</style>
