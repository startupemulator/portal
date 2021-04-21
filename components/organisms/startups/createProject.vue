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
      @saveDraft="saveDraft"
    ></create-project-step-1>
    <create-project-step-2
      v-if="createprodjectSteps.stepTwo"
      :technologies="technologies"
      :start-up-data="startUpData"
      @goToStepThree="goToStepThree"
      @saveDraft="saveDraft"
    ></create-project-step-2>
    <create-project-step-3
      v-if="createprodjectSteps.stepThree"
      :start-up-data="startUpData"
      @goToStepFour="goToStepFour"
      @saveDraft="saveDraft"
    ></create-project-step-3>
    <create-project-step-4
      v-if="createprodjectSteps.stepFour"
      :start-up-data="startUpData"
      @addSomeGiude="addSomeGiude"
      @saveDraft="saveDraft"
      @publish="publish"
    ></create-project-step-4>
    <popup-created-start-up
      v-if="popupPublish"
      @closePopup="popupPublish = !popupPublish"
    ></popup-created-start-up>
    <pre>{{ startUpData }}</pre>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Toast from "../../../store/modules/Toast";
import createProjectStep1 from "./createProjectStep-1.vue";
import createProjectStep2 from "./createProjectStep-2.vue";
import createProjectStep3 from "./createProjectStep-3.vue";
import createProjectStep4 from "./createProjectStep-4.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UBack from "~/components/atoms/uBack.vue";
import { Technology } from "~/models/Technology";
import { Startup } from "~/models/Startup";
import PopupCreatedStartUp from "~/components/molecules/popupCreatedStartup.vue";
import {
  enableScrolling,
  disableScrolling,
} from "~/assets/jshelper/toggleScroll";
@Component({
  components: {
    createProjectStep1,
    createProjectStep2,
    createProjectStep3,
    createProjectStep4,
    UTitle,
    UBack,
    PopupCreatedStartUp,
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
  popupPublish: Boolean = false;
  get progressSpets() {
    return {
      "progress-bar__stepTwo": this.createprodjectSteps.stepTwo,
      "progress-bar__stepThree": this.createprodjectSteps.stepThree,
      "progress-bar__stepFour": this.createprodjectSteps.stepFour,
    };
  }

  saveDraft() {}

  async publish() {
    try {
      const newStartup = await this.$strapi.create("startup", {
        title: this.startUpData.title,
        slug: "Unknown Type: uid",
        description: this.startUpData.description,
        full_info: "string",
        start_date: "string",
        duration: this.startUpData.duration,
        state: "not_started",
        technologies: ["string"],
        sources: this.startUpData.sources,
        secrets: ["string"],
        applications: this.startUpData.guide,
        published_at: "2021-04-20T07:45:34.953Z",
        created_by: new Date(),
        updated_by: "string",
      });
      if (newStartup !== null) {
        this.error = "";
        console.log("newStartup");
        this.popupPublish = !this.popupPublish;
        this.popupPublish ? disableScrolling() : enableScrolling();
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
    }
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
