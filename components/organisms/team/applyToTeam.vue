<template>
  <div class="apply-to-team">
    <U-back v-if="applyToTeamStep1" :link="'/'"></U-back>

    <U-back
      v-if="!applyToTeamStep1"
      :is-button="true"
      @clikOnButton="applyToTeamGoStep2"
    ></U-back>
    <ApplyToTeamStep1
      v-if="applyToTeamStep1"
      :experiences="experiences"
      :technologies="technology"
      :duration="duration"
      @applyToTeamGoStep2="applyToTeamGoStep2"
      @chooseDuration="chooseDuration"
    ></ApplyToTeamStep1>

    <ApplyToTeamStep2
      v-if="applyToTeamStep2"
      :startup="startup || {}"
      :specialisations="specialisations"
      @popupApplied="togglePopupApplied"
    ></ApplyToTeamStep2>
    <PopupApplied
      v-show="popupApplied"
      @closePopupLinkSent="togglePopupApplied"
    ></PopupApplied>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import ApplyToTeamStep1 from "~/components/organisms/team/applyToTeamStep1.vue";
import ApplyToTeamStep2 from "~/components/organisms/team/applyToTeamStep2.vue";
import PopupApplied from "~/components/molecules/popupApplied.vue";
import UBack from "~/components/atoms/uBack.vue";
import { Technology } from "~/models/Technology";
import { Startup } from "~/models/Startup";
import { Experience } from "~/models/Experience";

@Component({
  components: {
    UBack,
    ApplyToTeamStep2,
    ApplyToTeamStep1,
    PopupApplied,
  },
})
export default class extends Vue {
  @Prop() technology: Array<Technology>;
  @Prop() startup: Array<Startup>;
  @Prop() experiences: Array<Experience>;
  @Prop() specialisations: Array<any>;

  private applyToTeamStep1: boolean = true;
  private applyToTeamStep2: boolean = false;
  private popupApplied: boolean = false;
  duration: Number = 0;
  applyToTeamGoStep2() {
    this.applyToTeamStep1 = !this.applyToTeamStep1;
    this.applyToTeamStep2 = !this.applyToTeamStep2;
  }

  togglePopupApplied() {
    this.popupApplied = !this.popupApplied;
  }

  chooseDuration($event) {
    this.duration = $event.id;
  }
}
</script>
