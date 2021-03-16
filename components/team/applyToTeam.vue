<template>
  <div class="apply-to-team">
    <U-back v-if="applyToTeamStep1" :link="'/'"></U-back>
    <U-back
      v-if="!applyToTeamStep1"
      :is-button="true"
      @clikOnButton="applyToTeamGoStep2"
    ></U-back>
    <apply-to-team-step-1
      v-if="applyToTeamStep1"
      @applyToTeamGoStep2="applyToTeamGoStep2"
    ></apply-to-team-step-1>
    <apply-to-team-step-2
      v-if="applyToTeamStep2"
      :startup="startup || {}"
      @popupApplied="togglePopupApplied"
    ></apply-to-team-step-2>
    <popup-applied
      v-show="popupApplied"
      @closePopupLinkSent="togglePopupApplied"
    ></popup-applied>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UBack from "../theme/uBack.vue";
import PopupApplied from "../theme/popupApplied.vue";
import applyToTeamStep1 from "./applyToTeamStep1.vue";
import applyToTeamStep2 from "./applyToTeamStep2.vue";
import { Startup } from "~/models/Startup";

@Component({
  components: {
    UBack,
    applyToTeamStep2,
    applyToTeamStep1,
    PopupApplied,
  },
})
export default class extends Vue {
  @Prop() startup: Startup;

  private applyToTeamStep1: boolean = true;
  private applyToTeamStep2: boolean = false;
  private popupApplied: boolean = false;

  applyToTeamGoStep2() {
    this.applyToTeamStep1 = !this.applyToTeamStep1;
    this.applyToTeamStep2 = !this.applyToTeamStep2;
  }

  togglePopupApplied() {
    this.popupApplied = !this.popupApplied;
  }
}
</script>
