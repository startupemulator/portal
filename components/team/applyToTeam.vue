<template>
  <div class="apply-to-team">
    <U-back v-if="applyToTeamStep1" :link="'/'"></U-back>
    <div
      v-if="!applyToTeamStep1"
      class="button-back"
      @click="applyToTeamGoStep2"
    >
      <button type="button" class="btn-back">
        <img src="@/assets/img/arrow.svg" alt="arrow" />
        <span>Back</span>
      </button>
    </div>
    <apply-to-team-step-1
      v-if="applyToTeamStep1"
      @applyToTeamGoStep2="applyToTeamGoStep2"
    ></apply-to-team-step-1>
    <apply-to-team-step-2
      v-if="applyToTeamStep2"
      @popupApplied="togglePopupApplied"
    ></apply-to-team-step-2>
    <popup-applied
      v-show="popupApplied"
      @closePopupLinkSent="togglePopupApplied"
    ></popup-applied>
  </div>
</template>
<script>
import applyToTeamStep2 from "../team/applyToTeamStep2";
import applyToTeamStep1 from "../team/applyToTeamStep1";
import PopupApplied from "../theme/PopupApplied";
import UBack from "~/components/theme/UBack";

export default {
  components: {
    UBack,
    applyToTeamStep2,
    applyToTeamStep1,
    PopupApplied,
  },
  data() {
    return {
      popupApplied: false,
      applyToTeamStep1: true,
      applyToTeamStep2: false,
    };
  },
  methods: {
    applyToTeamGoStep2() {
      this.applyToTeamStep1 = !this.applyToTeamStep1;
      this.applyToTeamStep2 = !this.applyToTeamStep2;
    },
    togglePopupApplied() {
      this.popupApplied = !this.popupApplied;
    },
  },
};
</script>
