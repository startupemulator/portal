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
      @removeGuideSources="removeGuideSources(item.id)"
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
        @clickOnButton="publish"
      ></U-button>
      <U-button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
      ></U-button>
    </div>
    <popup-created-start-up
      v-if="popupPublish"
      @closePopup="publish"
    ></popup-created-start-up>
  </div>
</template>
<script>
import Toast from "../../../store/modules/Toast";
import UButton from "~/components/atoms/uButton";
import CreateGuide from "~/components/molecules/createGuide";

import PopupCreatedStartUp from "~/components/molecules/popupCreatedStartUp";
// import {
//   enableScrolling,
//   disableScrolling,
// } from "~/assets/jshelper/toggleScroll";
export default {
  components: { UButton, CreateGuide, PopupCreatedStartUp },
  data() {
    return {
      popupPublish: false,
      guideSourseComponent: [
        { id: 1, type: "create-guide" },
        { id: 2, type: "create-guide" },
      ],
    };
  },

  methods: {
    addGuideSourse() {
      this.guideSourseComponent.push({
        id: this.guideSourseComponent.length + 1,
        type: "create-guide",
      });
    },
    removeGuideSources(i) {
      this.guideSourseComponent = this.guideSourseComponent.filter(
        (item) => item.id !== i
      );
    },
    async publish() {
      // this.popupPublish = !this.popupPublish;
      // this.popupPublish ? disableScrolling() : enableScrolling();
      try {
        const newStartup = await this.$strapi.create({
          id: "string",
          title: "string title",
          slug: "string-slug",
          description:
            "string string string string string string string string string",
          full_info: " string string string string string string string",
          start_date: new Date(),
          duration: 10,
          technologies: [],
          sources: [],
          secrets: [],
          applications: [],
          published_date: new Date(),
        });
        if (newStartup !== null) {
          this.error = "";
          console.log("newStartup");
        }
      } catch (e) {
        console.error(e);
        Toast.show({
          data: e.message,
          duration: 3000,
        });
      }
    },
  },
};
</script>
