<template>
  <div class="createProject-step3">
    <h2>Add existing sources</h2>
    <h3>
      Add links on design, userflows, repositories, etc., which will be used
      during the project’s development. You can skip this step for now.
    </h3>
    <div
      :is="item.type"
      v-for="(item, i) in existingSourseComponent"
      :key="item.id"
      :name="'Link ' + (i + 1)"
      :link-name="item.title"
      :link-href="item.link"
      @removeExistingSources="removeExistingSources(item.id)"
      @updateSourses="updateSourses($event, i, item.id)"
    ></div>
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
import AddExistingSourse from "~/components/molecules/addExistingSource.vue";

@Component({
  components: {
    UButton,
    AddExistingSourse,
  },
})
export default class extends Vue {
  @Prop() startupData!: Array<any>;
  loading = false;

  existingSourseComponent: Array<any> = [];

  async updateSourses(data, i, id) {
    Spinner.show();
    try {
      const sources = await this.$updateSource(id, data[0], data[1]);
      if (sources !== null) {
        Spinner.hide();
        this.existingSourseComponent[i].title = data[1];
        this.existingSourseComponent[i].link = data[1];
      }
    } catch (e) {
      console.error(e);
      Spinner.hide();
    }
  }

  goToStepFour() {
    this.$emit("goToStepFour", this.existingSourseComponent);
  }

  async addExistingSourse() {
    Spinner.show();
    try {
      const source = await this.$createSource(
        "",
        "https://",
        this.startupData.id
      );
      if (source !== null) {
        this.existingSourseComponent.push({
          id: source.id,
          title: source.title,
          link: source.link.trim(),
          type: "add-existing-sourse",
        });
      }
      Spinner.hide();
    } catch (e) {
      console.error(e);
      Spinner.hide();
    }
  }

  async removeExistingSources(id) {
    Spinner.show();
    try {
      const sources = await this.$deleteSource(id);
      if (+sources.id === +id) {
        this.existingSourseComponent = this.existingSourseComponent.filter(
          (item) => item.id !== id
        );
        Spinner.hide();
      }
    } catch (e) {
      console.error(e);
      Spinner.hide();
    }
  }

  mounted() {
    if (this.startupData.sources && this.startupData.sources.length !== 0) {
      this.startupData.sources.forEach((el) => {
        const data = {
          id: el.id,
          link: el.link,
          title: el.title,
          type: "add-existing-sourse",
        };
        this.existingSourseComponent.push(data);
      });
    }
  }
}
</script>
