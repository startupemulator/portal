<template>
  <div class="createProject-content">
    <U-Back
      v-show="createprodjectSteps.stepOne"
      :link="'/profile/projects'"
    ></U-Back>
    <div v-show="!createprodjectSteps.stepOne" class="button-back">
      <button type="button" class="btn-back" @click="goToStepBack">
        <img src="~/assets/img/arrow.svg" alt="arrow" />
        <span>Back</span>
      </button>
    </div>
    <U-Title :text="'Create a startup'"></U-Title>

    <div class="createProject-step1__progress-bar">
      <div class="createProject__progress-bar" :class="progressSpets"></div>
    </div>

    <Create-Project-Step1
      v-if="createprodjectSteps.stepOne"
      :estimations="estimations"
      :created-startup-id="createdStartupId"
      @goToStepTwo="goToStepTwo"
    ></Create-Project-Step1>
    <Create-Project-Step2
      v-if="createprodjectSteps.stepTwo"
      :created-startup-id="createdStartupId"
      @goToStepThree="goToStepThree"
      @saveDraft="saveDraft"
    ></Create-Project-Step2>
    <Create-Project-Step3
      v-if="createprodjectSteps.stepThree"
      :startup-data="CreateProjectPage.draftStartup"
      @goToStepFour="goToStepFour"
      @saveDraft="saveDraft"
    ></Create-Project-Step3>
    <Create-Project-Step4
      v-if="createprodjectSteps.stepFour"
      :startup-data="CreateProjectPage.draftStartup"
      @saveDraft="saveDraft"
      @publish="publish"
    ></Create-Project-Step4>
    <Popup-Created-StartUp
      v-if="popupPublish"
      @closePopup="$nuxt.$router.push('/profile/projects')"
    ></Popup-Created-StartUp>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Toast from "../../../store/modules/Toast";
import { Estimation } from "../../../models/Estimation";
import Spinner from "../../../store/modules/Spinner";
import CreateProjectStep1 from "./createProjectStep-1.vue";
import CreateProjectStep2 from "./createProjectStep-2.vue";
import CreateProjectStep3 from "./createProjectStep-3.vue";
import CreateProjectStep4 from "./createProjectStep-4.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UBack from "~/components/atoms/uBack.vue";
import { Technology } from "~/models/Technology";
import { Specialisation } from "~/models/Specialisation";
import PopupCreatedStartUp from "~/components/molecules/popupCreatedStartup.vue";
import { CreateProjectPage } from "~/store";

@Component({
  components: {
    CreateProjectStep1,
    CreateProjectStep2,
    CreateProjectStep3,
    CreateProjectStep4,
    UTitle,
    UBack,
    PopupCreatedStartUp,
  },
})
export default class extends Vue {
  CreateProjectPage;
  constructor() {
    super();
    this.CreateProjectPage = CreateProjectPage;
  }

  @Prop() technologies: Array<Technology>;
  @Prop() estimations: Array<Estimation>;
  @Prop() specialisations: Array<Specialisation>;

  createprodjectSteps: { [key: string]: boolean } = {
    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
  };

  createdStartupId: Number = CreateProjectPage.draftStartup.id
    ? CreateProjectPage.draftStartup.id
    : 0;

  popupPublish = false;
  tehnologies: Array<string> = [];
  get progressSpets() {
    return {
      "progress-bar__stepTwo": this.createprodjectSteps.stepTwo,
      "progress-bar__stepThree": this.createprodjectSteps.stepThree,
      "progress-bar__stepFour": this.createprodjectSteps.stepFour,
    };
  }

  saveDraft() {
    this.publish("draft");
  }

  async publish(state = "review") {
    Spinner.show();
    try {
      const startupId: string = this.createdStartupId.toString();
      await this.$strapi.update("startups", startupId, {
        state,
      });

      await this.$addTechnologiesStartup(startupId, this.tehnologies);

      if (state === "draft") {
        Spinner.hide();
        Toast.show({
          data: "Draft saved.",
          duration: 1500,
          success: true,
        });
      } else {
        this.popupPublish = !this.popupPublish;
        Spinner.hide();
      }
    } catch (e) {
      Toast.show({
        data: "Something wrong.",
        duration: 3000,
      });
      console.error(e);
      Spinner.hide();
    }
  }

  goToStepTwo() {
    this.createprodjectSteps.stepOne = false;
    this.createprodjectSteps.stepTwo = true;
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

  goToStepThree() {
    this.createprodjectSteps.stepTwo = false;
    this.createprodjectSteps.stepThree = true;
    CreateProjectPage.draftStartup.specialists = [];
    CreateProjectPage.draftStartup.coleagues = [];
  }

  goToStepFour() {
    this.createprodjectSteps.stepThree = false;
    this.createprodjectSteps.stepFour = true;
  }
}
</script>
