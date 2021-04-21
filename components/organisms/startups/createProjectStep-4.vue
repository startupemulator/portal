<template>
  <div class="createProject-step3 createProject-step4">
    <h2>Create a guide for your team</h2>
    <h3>
      Add links on design, userflows, repositories, etc., which will be used
      during the project’s development. You can skip this step for now.
    </h3>
    <div
      :is="item.type"
      v-for="(item, i) in guideSourseComponent"
      :key="item.id"
      :name="'Item ' + (i + 1)"
      :guide-name="item.name"
      :guide-comment="item.comment"
      @removeGuideSources="removeGuideSources(item.id)"
      @textInput="textInput($event, i)"
    ></div>
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

import UButton from "~/components/atoms/uButton.vue";
import CreateGuide from "~/components/molecules/createGuide.vue";

import PopupCreatedStartUp from "~/components/molecules/popupCreatedStartup.vue";

@Component({ components: { UButton, CreateGuide, PopupCreatedStartUp } })
export default class extends Vue {
  @Prop() startUpData!: Array<any>;
  popupPublish: Boolean = false;
  guideSourseComponent: Array<any> = [
    { id: 1, type: "create-guide" },
    { id: 2, type: "create-guide" },
  ];

  addGuideSourse() {
    this.guideSourseComponent.push({
      id: this.guideSourseComponent.length + 1,
      type: "create-guide",
    });
  }

  removeGuideSources(i) {
    this.guideSourseComponent = this.guideSourseComponent.filter(
      (item) => item.id !== i
    );
  }

  textInput($event, i) {
    switch ($event[1]) {
      case "name":
        this.guideSourseComponent[i].name = $event[0];
        break;
      case "comment":
        this.guideSourseComponent[i].comment = $event[0];
        break;
      default:
    }
    this.$emit("addSomeGiude", this.guideSourseComponent);
  }

  mounted() {
    if (this.startUpData.guide) {
      this.startUpData.guide.forEach((el, i) => {
        if (el.name) {
          this.guideSourseComponent[i] = el;
        }
      });
    }
  }
}
</script>
