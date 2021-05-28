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
      @textInput="textInput($event, i, item.id)"
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
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import Spiner from "~/components/molecules/spiner.vue";

import UButton from "~/components/atoms/uButton.vue";
import CreateGuide from "~/components/molecules/createGuide.vue";

import PopupCreatedStartUp from "~/components/molecules/popupCreatedStartup.vue";

@Component({
  components: { UButton, CreateGuide, PopupCreatedStartUp, Spiner },
})
export default class extends Vue {
  @Prop() startupData!: Array<any>;
  popupPublish: Boolean = false;
  guideSourseComponent: Array<any> = [];
  loading = false;

  async addGuideSourse() {
    this.loading = true;
    const secret = await this.$createSecret("", "", this.startupData.id);
    if (secret !== null) {
      this.guideSourseComponent.push({
        id: secret.id,
        type: "create-guide",
        name: secret.title,
        comment: secret.description,
      });
    }
    try {
      this.loading = false;
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  async removeGuideSources(id) {
    this.loading = true;
    try {
      const secret = await this.$deleteSecret(id);
      if (+secret.id === +id) {
        this.guideSourseComponent = this.guideSourseComponent.filter(
          (item) => item.id !== id
        );
        this.loading = false;
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  async updateSecret(id, title = "", description = "") {
    this.loading = true;
    try {
      const secret = await this.$updateSecret(id, title, description);
      if (secret !== null) {
        this.loading = false;
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  textInput($event, i, id) {
    switch ($event[1]) {
      case "name":
        this.updateSecret(id, $event[0], this.guideSourseComponent[i].comment);
        this.guideSourseComponent[i].name = $event[0];
        break;
      case "comment":
        this.updateSecret(id, this.guideSourseComponent[i].name, $event[0]);
        this.guideSourseComponent[i].comment = $event[0];
        break;
      default:
    }
    this.$emit("addSomeGiude", this.guideSourseComponent);
  }

  mounted() {
    if (this.startupData.secrets && this.startupData.secrets.length !== 0) {
      this.startupData.secrets.forEach((el) => {
        const data = {
          id: el.id,
          comment: el.description,
          name: el.title,
          type: "create-guide",
        };
        this.guideSourseComponent.push(data);
      });
    }
  }

  beforeDestroy() {
    this.startupData.secrets = [];
    this.guideSourseComponent.forEach((el) => {
      const data = {
        id: el.id,
        description: el.comment,
        title: el.name,
        type: "create-guide",
      };
      this.startupData.secrets.push(data);
    });
  }
}
</script>
