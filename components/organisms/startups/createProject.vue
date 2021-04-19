<template>
  <div class="createProject-content">
    <U-back v-show="createprodjectSteps.stepOne" :link="'/'"></U-back>
    <div v-show="!createprodjectSteps.stepOne" class="button-back">
      <button type="button" class="btn-back" @click="goToStepBack">
        <img src="~/assets/img/arrow.svg" alt="arrow" />
        <span>Back</span>
      </button>
    </div>
    <U-title :text="'Create a startup'"></U-title>

    <div class="createProject-step1__progress-bar">
      <div class="createProject__progress-bar" :class="progressSpets"></div>
    </div>
    <create-project-step-1
      v-if="createprodjectSteps.stepOne"
      :start-up-data="startUpData"
      @goToStepTwo="goToStepTwo"
    ></create-project-step-1>
    <create-project-step-2
      v-if="createprodjectSteps.stepTwo"
      :technologies="technologies"
      :start-up-data="startUpData"
      @goToStepThree="goToStepThree"
    ></create-project-step-2>
    <create-project-step-3
      v-if="createprodjectSteps.stepThree"
      :start-up-data="startUpData"
      @goToStepFour="goToStepFour"
    ></create-project-step-3>
    <create-project-step-4
      v-if="createprodjectSteps.stepFour"
      :start-up-data="startUpData"
      @addSomeGiude="addSomeGiude"
    ></create-project-step-4>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import createProjectStep1 from "./createProjectStep-1.vue";
import createProjectStep2 from "./createProjectStep-2.vue";
import createProjectStep3 from "./createProjectStep-3.vue";
import createProjectStep4 from "./createProjectStep-4.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UBack from "~/components/atoms/uBack.vue";
import { Technology } from "~/models/Technology";
import { Startup } from "~/models/Startup";
@Component({
  components: {
    createProjectStep1,
    createProjectStep2,
    createProjectStep3,
    createProjectStep4,
    UTitle,
    UBack,
  },
})
export default class extends Vue {
  @Prop() technologies: Array<Technology>;
  createprodjectSteps: { [key: string]: boolean } = {
    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
  };

  startUpData: Array<Startup> = [];
  get progressSpets() {
    console.log(this.startUpData);
    return {
      "progress-bar__stepTwo": this.createprodjectSteps.stepTwo,
      "progress-bar__stepThree": this.createprodjectSteps.stepThree,
      "progress-bar__stepFour": this.createprodjectSteps.stepFour,
    };
  }

  goToStepTwo(firstStepData: Array<Startup>) {
    this.createprodjectSteps.stepOne = false;
    this.createprodjectSteps.stepTwo = true;
    if (this.startUpData.title) {
      this.startUpData.title = firstStepData.title;
      this.startUpData.date = firstStepData.date;
      this.startUpData.description = firstStepData.description;
      this.startUpData.duration = firstStepData.duration;
    } else {
      this.startUpData = firstStepData;
    }

    // this.startUpData = firstStepData;
  }

  goToStepBack() {
    if (!this.createprodjectSteps.stepOne && this.createprodjectSteps.stepTwo) {
      this.createprodjectSteps.stepOne = true;
      this.createprodjectSteps.stepTwo = false;
    } else if (
      !this.createprodjectSteps.stepTwo &&
      this.createprodjectSteps.stepThree
    ) {
      this.createprodjectSteps.stepThree = false;
      this.createprodjectSteps.stepTwo = true;
    } else if (
      !this.createprodjectSteps.stepThree &&
      this.createprodjectSteps.stepFour
    ) {
      this.createprodjectSteps.stepFour = false;
      this.createprodjectSteps.stepThree = true;
    }
  }

  goToStepThree(secodStepData) {
    this.createprodjectSteps.stepTwo = false;
    this.createprodjectSteps.stepThree = true;
    this.startUpData.specialists = [];
    this.startUpData.coleagues = [];
    console.log(secodStepData);
    secodStepData[0].forEach((el) => this.startUpData.specialists.push(el));
    secodStepData[1].forEach((el) => this.startUpData.coleagues.push(el));
  }

  goToStepFour(thirdStepData) {
    this.createprodjectSteps.stepThree = false;
    this.createprodjectSteps.stepFour = true;
    this.startUpData.sources = [];
    thirdStepData.forEach((el) => {
      this.startUpData.sources.push(el);
    });
  }

  addSomeGiude(data) {
    this.startUpData.guide = [];
    data.forEach((el) => {
      if (el.name) {
        this.startUpData.guide.push(el);
      }
    });
  }
}
</script>
