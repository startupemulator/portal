<template>
  <div class="createProgect-content">
    <U-back :link="'/'"></U-back>

    <U-title :text="'Create a startup'"></U-title>

    <div class="createProgect-step1__progress-bar">
      <div
        class="createProgect__progress-bar"
        :class="createprodjectSteps.stepTwo ? 'progress-bar__stepTwo' : ''"
      ></div>
    </div>

    <create-prodgect-step-1
      v-if="createprodjectSteps.stepOne"
      @goToStepTwo="goToStepTwo"
    ></create-prodgect-step-1>
    <create-prodgect-step-2
      v-if="createprodjectSteps.stepTwo"
    ></create-prodgect-step-2>
  </div>
</template>
<script>
// import { mapState } from "vuex";
import UBack from "../theme/UBack";
import UTitle from "../theme/UTitle";
import createProdgectStep1 from "./createProdgectStep-1.vue";
import CreateProdgectStep2 from "./createProdgectStep-2.vue";
export default {
  components: { createProdgectStep1, CreateProdgectStep2, UBack, UTitle },
  data() {
    return {
      createprodjectSteps: {
        stepOne: true,
        stepTwo: false,
      },
    };
  },
  methods: {
    goToStepTwo() {
      this.createprodjectSteps.stepOne = false;
      this.createprodjectSteps.stepTwo = true;
    },
  },
  // computed: {
  //   ...mapState(["device", "createprodjectSteps"]),
  // },
};
</script>
