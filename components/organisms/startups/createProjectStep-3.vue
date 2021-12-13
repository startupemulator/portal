<template>
  <div class="createProject-step3">
    <h2>Add existing sources</h2>
    <h3>
      Add links on design, userflows, repositories, etc., which will be used
      during the project’s development. You can skip this step for now.
    </h3>
    <Add-Existing-Source
      v-for="(sources, i) in startupData.sources"
      :key="sources.id"
      :name="'Link ' + (i + 1)"
      :link-name="sources.title"
      :link-href="sources.link"
      @removeExistingSources="removeExistingSources(sources.id)"
      @updateSources="updateSources($event, sources.id)"
    ></Add-Existing-Source>
    <div class="existing-sources__add-link">
      <U-button
        :button-name="'Add Link'"
        :button-class="'u-button-blue'"
        @clickOnButton="addExistingSourse"
      ></U-button>
    </div>
    <div class="createProject-step1__buttons">
      <U-button
        :button-name="'Next'"
        :button-class="'u-button-blue'"
        @clickOnButton="goToStepFour"
      ></U-button>
      <U-button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
        @clickOnButton="$emit('saveDraft')"
      ></U-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import Spinner from "../../../store/modules/Spinner";
import UButton from "~/components/atoms/uButton.vue";
import AddExistingSource from "~/components/molecules/addExistingSource.vue";
import { CreateProjectPage } from "~/store";

@Component({
  components: {
    UButton,
    AddExistingSource,
  },
})
export default class extends Vue {
  @Prop() startupData!: Array<any>;
  loading = false;
  CreateProjectPage;
  constructor() {
    super();
    this.CreateProjectPage = CreateProjectPage;
  }

  async addExistingSourse() {
    Spinner.show();
    await CreateProjectPage.addExistingSourse(this);
    Spinner.hide();
  }

  async removeExistingSources(id) {
    Spinner.show();
    await CreateProjectPage.removeExistingSources({
      context: this,
      sourcesId: id,
    });
    Spinner.hide();
  }

  async updateSources({ title, link }, sourceId) {
    Spinner.show();
    await CreateProjectPage.updateSources({
      context: this,
      sourceId,
      title,
      link,
    });

    Spinner.hide();
  }

  goToStepFour() {
    this.$emit("goToStepFour");
  }
}
</script>
