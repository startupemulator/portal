<template>
  <div class="createProgect-content">
    <U-back v-show="createprodjectSteps.stepOne" :link="'/'"></U-back>
    <div v-show="!createprodjectSteps.stepOne" class="button-back">
      <button type="button" class="btn-back" @click="goToStepBack">
        <img src="@/assets/img/arrow.svg" alt="arrow" />
        <span>Back</span>
      </button>
    </div>
    <U-title :text="'Create a startup'"></U-title>

    <div class="createProgect-step1__progress-bar">
      <div class="createProgect__progress-bar" :class="progressSpets"></div>
    </div>

    <create-project-step-1
      v-if="createprodjectSteps.stepOne"
      @goToStepTwo="goToStepTwo"
    ></create-project-step-1>
    <create-project-step-2
      v-if="createprodjectSteps.stepTwo"
      @goToStepThree="goToStepThree"
    ></create-project-step-2>
    <create-project-step-3
      v-if="createprodjectSteps.stepThree"
      @goToStepFour="goToStepFour"
    ></create-project-step-3>
    <create-project-step-4
      v-if="createprodjectSteps.stepFour"
    ></create-project-step-4>
  </div>
</template>
<script>
// import { mapState } from "vuex";
import UBack from "../atoms/uBack";
import UTitle from "../atoms/uTitle";
import createProjectStep1 from "./createProjectStep-1.vue";
import createProjectStep2 from "./createProjectStep-2.vue";
import createProjectStep3 from "./createProjectStep-3.vue";
import createProjectStep4 from "./createProjectStep-4.vue";
export default {
  components: {
    createProjectStep1,
    createProjectStep2,
    createProjectStep3,
    createProjectStep4,
    UBack,
    UTitle,
  },
  data() {
    return {
      createprodjectSteps: {
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        stepFour: false,
      },
    };
  },
  computed: {
    progressSpets() {
      return {
        "progress-bar__stepTwo": this.createprodjectSteps.stepTwo,
        "progress-bar__stepThree": this.createprodjectSteps.stepThree,
        "progress-bar__stepFour": this.createprodjectSteps.stepFour,
      };
    },
  },
  methods: {
    goToStepTwo() {
      this.createprodjectSteps.stepOne = false;
      this.createprodjectSteps.stepTwo = true;
    },
    goToStepBack() {
      if (
        !this.createprodjectSteps.stepOne & this.createprodjectSteps.stepTwo
      ) {
        this.createprodjectSteps.stepOne = true;
        this.createprodjectSteps.stepTwo = false;
      } else if (
        !this.createprodjectSteps.stepTwo & this.createprodjectSteps.stepThree
      ) {
        this.createprodjectSteps.stepThree = false;
        this.createprodjectSteps.stepTwo = true;
      } else if (
        !this.createprodjectSteps.stepThree & this.createprodjectSteps.stepFour
      ) {
        this.createprodjectSteps.stepFour = false;
        this.createprodjectSteps.stepThree = true;
      }
    },
    goToStepThree() {
      this.createprodjectSteps.stepTwo = false;
      this.createprodjectSteps.stepThree = true;
    },
    goToStepFour() {
      this.createprodjectSteps.stepThree = false;
      this.createprodjectSteps.stepFour = true;
    },
  },
};
</script>
