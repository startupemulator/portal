<template>
  <div class="createProject-step3 createProject-step4">
    <h2>Create a guide for your team</h2>
    <h3>
      Add links on design, userflows, repositories, etc., which will be used
      during the project’s development. You can skip this step for now.
    </h3>
    <CreateGuide
      v-for="(guide, i) in CreateProjectPage.draftStartup.secrets"
      :key="guide.id"
      :name="'Item ' + (i + 1)"
      :guide-name="guide.title"
      :guide-comment="guide.description"
      @removeGuideSources="removeGuideSources(guide.id)"
      @updateSecret="updateSources($event, guide.id)"
    ></CreateGuide>
    <div class="existing-sources__add-link">
      <U-button
        :button-name="'Add item'"
        :button-class="'u-button-blue'"
        @clickOnButton="addGuideSourse"
      ></U-button>
    </div>
    <div class="createProject-step1__buttons">
      <U-button
        :button-name="'Publish'"
        :button-class="'u-button-blue'"
        @clickOnButton="$emit('publish')"
      ></U-button>
      <U-button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
        @clickOnButton="$emit('saveDraft')"
      ></U-button>
    </div>
    <popup-created-start-up
      v-if="popupPublish"
      @closePopup="publish"
    ></popup-created-start-up>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import Spinner from "../../../store/modules/Spinner";
import UButton from "~/components/atoms/uButton.vue";
import CreateGuide from "~/components/molecules/createGuide.vue";
import { CreateProjectPage } from "~/store";
import PopupCreatedStartUp from "~/components/molecules/popupCreatedStartup.vue";

@Component({
  components: { UButton, CreateGuide, PopupCreatedStartUp },
})
export default class extends Vue {
  CreateProjectPage;
  constructor() {
    super();
    this.CreateProjectPage = CreateProjectPage;
  }

  @Prop() startupData!: Array<any>;
  popupPublish: Boolean = false;
  guideSourseComponent: Array<any> = [];

  async addGuideSourse() {
    Spinner.show();
    await CreateProjectPage.addGuideSourse(this);
    Spinner.hide();
  }

  async removeGuideSources(sourceId) {
    Spinner.show();
    await CreateProjectPage.removeGuideSources({ context: this, sourceId });

    Spinner.hide();
  }

  async updateSources({ title, description }, guideId) {
    Spinner.show();
    await CreateProjectPage.updateGuideSources({
      context: this,
      guideId,
      title,
      description,
    });
    Spinner.hide();
  }
}
</script>
