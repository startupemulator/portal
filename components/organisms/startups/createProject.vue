<template>
  <div class="createProject-content">
    <U-back
      v-show="createprodjectSteps.stepOne"
      :link="'/profile/projects'"
    ></U-back>
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

    <CreateProjectStep1
      v-if="createprodjectSteps.stepOne"
      :estimations="estimations"
      :created-startup-id="createdStartupId"
      @goToStepTwo="goToStepTwo"
      @saveDraft="saveDraft"
    ></CreateProjectStep1>
    <CreateProjectStep2
      v-if="createprodjectSteps.stepTwo"
      :technologies="technologies"
      :startup-data="CreateProjectPage.draftStartup"
      :specialisations="specialisations"
      :created-startup-id="createdStartupId"
      @goToStepThree="goToStepThree"
      @saveDraft="saveDraft"
    ></CreateProjectStep2>
    <CreateProjectStep3
      v-if="createprodjectSteps.stepThree"
      :startup-data="CreateProjectPage.draftStartup"
      @goToStepFour="goToStepFour"
      @saveDraft="saveDraft"
    ></CreateProjectStep3>
    <CreateProjectStep4
      v-if="createprodjectSteps.stepFour"
      :startup-data="CreateProjectPage.draftStartup"
      @addSomeGiude="addSomeGiude"
      @saveDraft="saveDraft"
      @publish="publish"
    ></CreateProjectStep4>
    <PopupCreatedStartUp
      v-if="popupPublish"
      @closePopup="$nuxt.$router.push('/profile/projects')"
    ></PopupCreatedStartUp>
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
import { Startup } from "~/models/Startup";
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
  // @Prop() draftStartup!: Array<Startup>;
  createprodjectSteps: { [key: string]: boolean } = {
    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
  };

  createdStartupId: Number = CreateProjectPage.draftStartup.id
    ? CreateProjectPage.draftStartup.id
    : 0;

  // startupData: Array<Startup> = this.draftStartup;
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

  checkTechnologies() {
    if (CreateProjectPage.draftStartup.specialists !== undefined) {
      CreateProjectPage.draftStartup.specialists.forEach((specialist) => {
        if (specialist.technologiesId) {
          specialist.technologiesId.forEach((el) => {
            this.tehnologies.push(el);
          });
        } else if (specialist.technologies) {
          specialist.technologies.forEach((el) => {
            this.tehnologies.push(el.id);
          });
        }
      });
    }
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

  goToStepThree(secodStepData) {
    this.createprodjectSteps.stepTwo = false;
    this.createprodjectSteps.stepThree = true;
    CreateProjectPage.draftStartup.specialists = [];
    CreateProjectPage.draftStartup.coleagues = [];
    secodStepData[0].forEach((el) =>
      CreateProjectPage.draftStartup.specialists.push(el)
    );
    secodStepData[1].forEach((el) =>
      CreateProjectPage.draftStartup.coleagues.push(el)
    );

    this.checkTechnologies();
  }

  goToStepFour(thirdStepData) {
    this.createprodjectSteps.stepThree = false;
    this.createprodjectSteps.stepFour = true;
    CreateProjectPage.draftStartup.sources = [];
    thirdStepData.forEach((el) => {
      CreateProjectPage.draftStartup.sources.push(el);
    });
  }

  addSomeGiude(data) {
    CreateProjectPage.draftStartup.guide = [];
    data.forEach((el) => {
      if (el.name) {
        CreateProjectPage.draftStartup.guide.push(el);
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
        inviter: this.$strapi.user.id.toString(),
        startup: this.createdStartupId.toString(),
        position: data.position,
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
