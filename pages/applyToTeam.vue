<template>
  <div class="experience">
    <app-header></app-header>
    <experience></experience>
    <div v-if="!device">
      <button-next v-if="step"></button-next>
      <button-apply v-else></button-apply>
    </div>
    <app-footer></app-footer>
<div v-if="device">
    <button-next v-if="step"></button-next>
    <button-apply v-else></button-apply>
</div>
  </div>
</template>
<script>
import AppHeader from "@/components/appHeader.vue";
import Experience from "@/components/team/applyToTeam.vue";
import AppFooter from "~/components/appFooter.vue";
import ButtonNext from "~/components/team/buttonNext.vue";

import { mapState } from "vuex";
import ButtonApply from "~/components/team/buttonApply.vue";
export default {
  components: {
    AppHeader,
    Experience,
    AppFooter,
    ButtonNext,
    ButtonApply,
  },
  computed: {
    ...mapState(["applyToTeam", "device"]),
    step: (state) => state.applyToTeam.stepOne,
  }
};
</script>