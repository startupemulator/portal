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
      :startup-data="startupData"
      :estimations="estimations"
      :created-startup-id="createdStartupId"
      @goToStepTwo="goToStepTwo"
      @saveDraft="saveDraft"
    ></create-project-step-1>
    <create-project-step-2
      v-if="createprodjectSteps.stepTwo"
      :technologies="technologies"
      :startup-data="startupData"
      :specialisations="specialisations"
      :created-startup-id="createdStartupId"
      @goToStepThree="goToStepThree"
      @saveDraft="saveDraft"
    ></create-project-step-2>
    <create-project-step-3
      v-if="createprodjectSteps.stepThree"
      :startup-data="startupData"
      @goToStepFour="goToStepFour"
      @saveDraft="saveDraft"
    ></create-project-step-3>
    <create-project-step-4
      v-if="createprodjectSteps.stepFour"
      :startup-data="startupData"
      @addSomeGiude="addSomeGiude"
      @saveDraft="saveDraft"
      @publish="publish"
    ></create-project-step-4>
    <popup-created-start-up
      v-if="popupPublish"
      @closePopup="$nuxt.$router.push('/myProjects')"
    ></popup-created-start-up>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Toast from "../../../store/modules/Toast";
import { Estimation } from "../../../models/Estimation";
import createProjectStep1 from "./createProjectStep-1.vue";
import createProjectStep2 from "./createProjectStep-2.vue";
import createProjectStep3 from "./createProjectStep-3.vue";
import createProjectStep4 from "./createProjectStep-4.vue";
import Spiner from "~/components/molecules/spiner.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UBack from "~/components/atoms/uBack.vue";
import { Technology } from "~/models/Technology";
import { Startup } from "~/models/Startup";
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
    Spiner,
  },
})
export default class extends Vue {
  @Prop() technologies: Array<Technology>;
  @Prop() estimations: Array<Estimation>;
  @Prop() specialisations: Array<Specialisation>;
  createprodjectSteps: { [key: string]: boolean } = {
    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
  };

  createdStartupId: Number = 0;
  loading = false;
  startupData: Array<Startup> = [];
  popupPublish = false;
  get progressSpets() {
    return {
      "progress-bar__stepTwo": this.createprodjectSteps.stepTwo,
      "progress-bar__stepThree": this.createprodjectSteps.stepThree,
      "progress-bar__stepFour": this.createprodjectSteps.stepFour,
    };
  }

  saveDraft() {
    this.createprodjectSteps.stepOne = false;
    this.createprodjectSteps.stepTwo = true;
  }

  async publish() {
    try {
      this.loading = true;
      await this.$strapi.update("startups", this.createdStartupId.toString(), {
        description: this.startupData.description,
      });
      // send specialists
      if (this.startupData.specialists.some((el) => el.speciality_id)) {
        const newPositions = {
          startup: this.createdStartupId,
          technologies: [],
          specialisation: "",
        };
        this.startupData.specialists.forEach((el) => {
          newPositions.technologies = el.technologiesId;
          newPositions.specialisation = el.speciality_id;
          this.createSpecialisation(newPositions);
        });
        const addedTechnologies = [];
        this.startupData.specialists.forEach((el) =>
          el.technologiesId.forEach((item) => addedTechnologies.push(item))
        );
        this.addTechnologiesToStartup(addedTechnologies);
        let newTechnologies: Array<String> = [];
        this.startupData.specialists.forEach((el) => {
          newTechnologies = newTechnologies.concat(el.newTechnologies);
        });
        newTechnologies.forEach((el) => this.createNewTechnologies(el));
      }
      // sent technologies & invites
      if (this.startupData.coleagues.length !== 0) {
        this.newInvate(this.startupData.coleagues);
      }
      // send sources
      if (
        this.startupData.sources &&
        !!this.startupData.sources.some((el) => el.link)
      ) {
        console.log(!!this.startupData.sources);
        console.log(!!this.startupData.sources.some((el) => el.link));
        this.startupData.sources.forEach((el) => {
          this.addLink(el);
        });
      }
      // send guide
      if (this.startupData.guide) {
        this.startupData.guide.forEach((el) => {
          this.addGuide(el);
        });
      }
      this.popupPublish = !this.popupPublish;
      this.loading = false;
    } catch (e) {
      Toast.show({
        data: "Something wrong.",
        duration: 3000,
      });
      console.error(e);
      this.loading = false;
    }
  }

  goToStepTwo(data: Array<Startup> = []) {
    this.createprodjectSteps.stepOne = false;
    this.createprodjectSteps.stepTwo = true;
    this.createdStartupId = data.id;

    if (this.startupData.length !== 0) {
      this.startupData.title = data.title;
      this.startupData.description = data.description;
      this.startupData.start_date = data.start_date;
      this.startupData.duration = data.duration;
    } else {
      this.startupData = data;
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
    this.startupData.specialists = [];
    this.startupData.coleagues = [];
    secodStepData[0].forEach((el) => this.startupData.specialists.push(el));
    secodStepData[1].forEach((el) => this.startupData.coleagues.push(el));
  }

  goToStepFour(thirdStepData) {
    this.createprodjectSteps.stepThree = false;
    this.createprodjectSteps.stepFour = true;
    this.startupData.sources = [];
    thirdStepData.forEach((el) => {
      this.startupData.sources.push(el);
    });
  }

  addSomeGiude(data) {
    this.startupData.guide = [];
    data.forEach((el) => {
      if (el.name) {
        this.startupData.guide.push(el);
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

  async addGuide(data) {
    try {
      await this.$strapi.create("secrets", {
        title: data.name,
        description: data.comment,
        startup: this.createdStartupId.toString(),
      });
    } catch (e) {
      console.error(e);
    }
  }

  async addLink(data) {
    try {
      await this.$strapi.create("sources", {
        title: data.title,
        link: data.link,
        startups: this.createdStartupId.toString(),
      });
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
}
</script>
