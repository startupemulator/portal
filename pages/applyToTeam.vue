<template>
  <div class="experience">
    <app-header></app-header>
    <experience></experience>
    <app-footer></app-footer>

    <button-next v-if="step"></button-next>
    <button-apply v-else></button-apply>
  </div>
</template>
<script>
import AppHeader from "@/components/appHeader.vue";
import Experience from "@/components/team/applyToTeam.vue";
import AppFooter from "~/components/appFooter.vue";
import ButtonNext from "~/components/team/buttonNext.vue";

import { mapState } from "vuex";
import ButtonApply from '~/components/team/buttonApply.vue';
export default {
  components: {
    AppHeader,
    Experience,
    AppFooter,
    ButtonNext,
    ButtonApply,
  },
  computed: {
    ...mapState(["applyToTeam"]),
    step: (state) => state.applyToTeam.stepOne,
  },
  //  data: () => ({
  //   itemSize: null,
  // }),
  // methods: {
  //   onResize() {
  //     this.itemSize = document.documentElement.clientWidth > 700 ? false : true;
  //   },
  // },
  // created() {
  //   window.addEventListener('resize', this.onResize);
  //   this.onResize();
  // },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.onResize);
  // },
};
</script>