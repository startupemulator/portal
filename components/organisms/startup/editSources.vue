<template>
  <div class="edit-sources">
    <div class="edit-sources__header">
      <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
      <UTitle :text="'Edit sources'"></UTitle>
      <p>
        Add links on design, userflows, repositories, etc., which will be used
        during the project’s development. You can skip this step for now.
      </p>
    </div>
    <div class="edit-sources__content">
      <div
        :is="item.type"
        v-for="(item, i) in existingSourseComponent"
        :key="item.id"
        :name="'Link ' + (i + 1)"
        :link-name="item.title"
        :link-href="item.link"
        @removeExistingSources="removeExistingSources(item.id)"
        @textInput="textInput($event, i, item.id)"
      ></div>
      <div class="existing-sources__add-link">
        <U-button
          :button-name="'Add Link'"
          :button-class="'u-button-blue'"
          @clickOnButton="addExistingSourse"
        ></U-button>
      </div>
    </div>
    <div class="edit-sources__buttons">
      <U-button
        :button-name="'Save'"
        :button-class="'u-button-blue'"
        @clickOnButton="saveSources"
      ></U-button>
      <U-button
        :button-name="'Cancel'"
        :button-class="'u-button-gray'"
        @clickOnButton="cancelSources"
      ></U-button>
    </div>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import AddExistingSourse from "../../molecules/addExistingSource.vue";
import UButton from "~/components/atoms/uButton.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Sources } from "~/models/Sources";
import Spiner from "~/components/molecules/spiner.vue";
import Toast from "~/store/modules/Toast";

@Component({
  components: { UButton, UBack, UTitle, AddExistingSourse, Spiner },
})
export default class extends Vue {
  @Prop() sources: Array<Sources>;
  @Prop() startupId: string;
  loading = false;
  newsources = [];

  existingSourseComponent: Array<any> = [];
  saveSources() {
    this.loading = true;
    this.newsources = [];
    setTimeout(() => {
      this.loading = false;
      Toast.show({
        data: "Startup data updated!",
        duration: 1000,
        success: true,
      });
    }, 900);
    this.$emit("saveSources");
  }

  cancelSources() {
    if (this.newsources.length !== 0) {
      this.loading = true;
      this.newsources.forEach((el) => {
        this.removeExistingSources(el);
      });
    }

    setTimeout(() => {
      this.loading = false;
      Toast.show({
        data: "Startup data updated!",
        duration: 1000,
        success: true,
      });
    }, 900);
    this.$emit("cancelSources");
  }

  async addExistingSourse() {
    this.loading = true;
    try {
      const source = await this.$createSource("", "https://", this.startupId);
      if (source !== null) {
        this.existingSourseComponent.push({
          id: source.id,
          title: source.title,
          link: source.link.trim(),
          type: "add-existing-sourse",
        });
        this.newsources.push(source.id);
      }
      this.loading = false;
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  textInput($event, i, id) {
    switch ($event[1]) {
      case "name":
        this.updateSources(id, $event[0], this.existingSourseComponent[i].link);
        this.existingSourseComponent[i].title = $event[0];
        break;
      case "url":
        this.updateSources(
          id,
          this.existingSourseComponent[i].title,
          $event[0]
        );
        this.existingSourseComponent[i].link = $event[0];
        break;
      default:
    }
  }

  async updateSources(id, title = "", link = "") {
    this.loading = true;
    try {
      const sources = await this.$updateSource(id, title, link);
      if (sources !== null) {
        this.loading = false;
      }
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
    if (this.sources) {
      this.existingSourseComponent = [];
      this.sources.forEach((el) => {
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
<style lang="scss" scoped>
.edit-sources {
  color: #fff;
  max-width: 660px;
  margin: 0 auto;
  padding: 0 16px;
  margin-top: 36px;
  .edit-sources__header {
    h2 {
      margin-bottom: 12px;
    }
    p {
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
    }
  }
  .edit-sources__content {
    margin-top: 34px;
    .existing-sources__add-link {
      margin-top: 8px;

      .u-button {
        height: 40px;
      }
    }
  }
  .edit-sources__buttons {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 16px 16px 28px 16px;
    background: #232b39;
    border: 1px solid #3b465a;
    box-shadow: inset 0 0 10px 2px #262f3f;
    border-radius: 16px 16px 0 0;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    .u-button-gray {
      margin-left: 16px;
    }
  }
}
@media (min-width: 768px) {
  .edit-sources {
    margin-top: 48px;
    .edit-sources__header {
      p {
        margin-top: 14px;
        font-size: 17px;
        line-height: 24px;
        width: 600px;
      }
    }
    .edit-sources__content {
      margin-top: 48px;
      .existing-sources__add-link {
        margin-top: 20px;

        .u-button {
          height: 48px;
          width: 121px;
        }
      }
    }
    .edit-sources__buttons {
      position: static;
      border: none;
      border-top: 1px solid #3b465a;
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 36px 0;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      margin-top: 32px;
      .u-button-gray {
        margin-left: 24px;
      }
    }
  }
}
</style>
