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
      :technologies="technology"
      @applyToTeamGoStep2="applyToTeamGoStep2"
    ></ApplyToTeamStep1>
    <ApplyToTeamStep2
      v-if="applyToTeamStep2"
      :startup="startup || {}"
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
