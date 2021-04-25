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
      :link-name="item.name"
      :link-href="item.link"
      @removeExistingSources="removeExistingSources(item.id)"
      @textInput="textInput($event, i)"
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
import UButton from "~/components/atoms/uButton.vue";
import AddExistingSourse from "~/components/molecules/addExistingSource.vue";

@Component({
  components: {
    UButton,
    AddExistingSourse,
  },
})
export default class extends Vue {
  @Prop() startUpData!: Array<any>;
  existingSourseComponent: Array<any> = [
    { id: 1, type: "add-existing-sourse" },
    { id: 2, type: "add-existing-sourse" },
  ];

  textInput($event, i) {
    switch ($event[1]) {
      case "name":
        this.existingSourseComponent[i].title = $event[0];
        break;
      case "url":
        this.existingSourseComponent[i].link = $event[0];
        break;
      default:
    }
  }

  goToStepFour() {
    this.$emit("goToStepFour", this.existingSourseComponent);
  }

  addExistingSourse() {
    this.existingSourseComponent.push({
      id: this.existingSourseComponent.length + 1,
      type: "add-existing-sourse",
    });
  }

  removeExistingSources(i) {
    this.existingSourseComponent = this.existingSourseComponent.filter(
      (item) => item.id !== i
    );
  }

  mounted() {
    if (this.startUpData.sources) {
      this.existingSourseComponent = this.startUpData.sources;
    }
  }
}
</script>
