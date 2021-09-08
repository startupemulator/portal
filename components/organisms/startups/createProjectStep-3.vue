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
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";
import AddExistingSourse from "~/components/molecules/addExistingSource.vue";
import Spiner from "~/components/molecules/spiner.vue";

@Component({
  components: {
    UButton,
    AddExistingSourse,
    Spiner,
  },
})
export default class extends Vue {
  @Prop() startupData!: Array<any>;
  loading = false;

  existingSourseComponent: Array<any> = [];

  async updateSourses(data, i, id) {
    this.loading = true;
    try {
      const sources = await this.$updateSource(id, data[0], data[1]);
      if (sources !== null) {
        this.loading = false;
        this.existingSourseComponent[i].title = data[1];
        this.existingSourseComponent[i].link = data[1];
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  goToStepFour() {
    this.$emit("goToStepFour", this.existingSourseComponent);
  }

  async addExistingSourse() {
    this.loading = true;
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
      this.loading = false;
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  async removeExistingSources(id) {
    this.loading = true;
    try {
      const sources = await this.$deleteSource(id);
      if (+sources.id === +id) {
        this.existingSourseComponent = this.existingSourseComponent.filter(
          (item) => item.id !== id
        );
        this.loading = false;
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
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
