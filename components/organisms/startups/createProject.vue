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
      :estimations="estimations"
      :created-startup-id="createdStartupId"
      @goToStepTwo="goToStepTwo"
      @saveDraft="saveDraft"
    ></create-project-step-1>
    <create-project-step-2
      v-if="createprodjectSteps.stepTwo"
      :technologies="technologies"
      :start-up-data="startUpData"
      :specialisations="specialisations"
      :created-startup-id="createdStartupId"
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
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
// import Toast from "../../../store/modules/Toast";
import createProjectStep1 from "./createProjectStep-1.vue";
import createProjectStep2 from "./createProjectStep-2.vue";
import createProjectStep3 from "./createProjectStep-3.vue";
import createProjectStep4 from "./createProjectStep-4.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UBack from "~/components/atoms/uBack.vue";
import { Technology } from "~/models/Technology";
import { Startup } from "~/models/Startup";
import { Estimations } from "~/models/Estimations";
import { Specialisation } from "~/models/Specialisation";
import PopupCreatedStartUp from "~/components/molecules/popupCreatedStartup.vue";
// import {
//   enableScrolling,
//   disableScrolling,
// } from "~/assets/jshelper/toggleScroll";
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
  @Prop() estimations: Array<Estimations>;
  @Prop() specialisations: Array<Specialisation>;
  createprodjectSteps: { [key: string]: boolean } = {
    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
  };

  createdStartupId: Number = 0;

  startUpData: Array<Startup> = [];
  popupPublish: Boolean = false;
  get progressSpets() {
    return {
      "progress-bar__stepTwo": this.createprodjectSteps.stepTwo,
      "progress-bar__stepThree": this.createprodjectSteps.stepThree,
      "progress-bar__stepFour": this.createprodjectSteps.stepFour,
    };
  }

  async saveDraft() {
    try {
      const data = {
        title: "My new Startup with owner this if update somthing",
      };
      await this.$strapi.update("startups", "5", data);
      await this.$strapi.find("technologies");

      this.createprodjectSteps.stepOne = false;
      this.createprodjectSteps.stepTwo = true;
    } catch (e) {}
  }

  async publish() {
    try {
      await this.$strapi.update("startups", this.createdStartupId.toString(), {
        description: "new descriptiondescriptiondescriptiondescription",
      });
      // send specialists
      if (this.startUpData.specialists.some((el) => el.speciality_id)) {
        const newPositions = {
          startup: this.createdStartupId,
          technologies: [],
          specialisation: "",
        };
        this.startUpData.specialists.forEach((el) => {
          newPositions.technologies = el.technologiesId;
          newPositions.specialisation = el.speciality_id;
          this.createSpecialisation(newPositions);
        });
        const addedTechnologies = [];
        this.startUpData.specialists.forEach((el) =>
          el.technologiesId.forEach((item) => addedTechnologies.push(item))
        );
        this.addTechnologiesToStartup(addedTechnologies);
        let newTechnologies: Array<String> = [];
        this.startUpData.specialists.forEach((el) => {
          newTechnologies = newTechnologies.concat(el.newTechnologies);
        });
        newTechnologies.forEach((el) => this.createNewTechnologies(el));
      }
      // sent technologies & invites
      if (this.startUpData.coleagues.some((el) => el.email)) {
        this.newInvate(this.startUpData.coleagues);
      }
      // send sources
      if (this.startUpData.sources.some((el) => el.link)) {
        this.startUpData.sources.forEach((el) => {
          this.addLink(el);
        });
      }
      // send guide
      if (this.startUpData.guide.some((el) => el.name)) {
        this.startUpData.guide.forEach((el) => {
          this.addGuide(el);
        });
      }
    } catch (e) {}
  }

  goToStepTwo(data: Array<Startup> = []) {
    this.createprodjectSteps.stepOne = false;
    this.createprodjectSteps.stepTwo = true;
    this.createdStartupId = data.id;
    this.startUpData = data;
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

  async createSpecialisation(data) {
    try {
      await this.$strapi.create("positions", data);
    } catch (e) {
      console.error(e);
    }
  }

  async addTechnologiesToStartup(data) {
    try {
      await this.$strapi.update("startups", this.createdStartupId.toString(), {
        technologies: data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async createNewTechnologies(data) {
    try {
      await this.$strapi.create("technologies", {
        creator_id: this.$strapi.user.id,
        title: data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async newInvate(data) {
    try {
      await this.$strapi.create("invites", {
        inviter: this.$strapi.user.id,
        startup: this.createdStartupId.toString(),
        position: "1",
        email: data.email,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async addLink(data) {
    try {
      await this.$strapi.create("links", {
        title: data.title,
        url: data.link,
        startup: this.createdStartupId.toString(),
      });
    } catch (e) {
      console.error(e);
    }
  }

  async addGuide(data) {
    try {
      await this.$strapi.create("sources", {
        title: data.name,
        link: data.comment,
        startups: this.createdStartupId.toString(),
      });
    } catch (e) {
      console.error(e);
    }
  }
}
</script>
