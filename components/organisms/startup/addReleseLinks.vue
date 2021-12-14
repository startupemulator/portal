<template>
  <div class="edit-sources">
    <div class="edit-sources__header">
      <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
      <UTitle :text="'Add release links'"></UTitle>
      <p>Add links on your published product, a case, an article, etc.</p>
    </div>
    <div class="edit-sources__content">
      <div
        :is="item.type"
        v-for="(item, i) in existingSourseComponent"
        :key="item.id"
        :name="'Link ' + (i + 1)"
        :link-name="item.title"
        :link-href="item.url"
        @removeExistingSources="removeExistingReleases(item.id)"
        @textInput="textInput($event, i, item.id)"
      ></div>
      <div class="existing-sources__add-link">
        <U-button
          :button-name="'Add Link'"
          :button-class="'u-button-blue'"
          @clickOnButton="addExistingReleases"
        ></U-button>
      </div>
    </div>
    <div class="edit-sources__buttons">
      <U-button
        :button-name="'Save'"
        :button-class="'u-button-blue'"
        @clickOnButton="saveReleases"
      ></U-button>
      <U-button
        :button-name="'Cancel'"
        :button-class="'u-button-gray'"
        @clickOnButton="cancelReleases"
      ></U-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import AddExistingSourse from "../../molecules/addExistingSource.vue";
import Spinner from "../../../store/modules/Spinner";
import UButton from "~/components/atoms/uButton.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Releases } from "~/models/Releases";
import Toast from "~/store/modules/Toast";

@Component({
  components: { UButton, UBack, UTitle, AddExistingSourse },
})
export default class extends Vue {
  @Prop() releases: Array<Releases>;
  @Prop() startupId: string;
  newsReleases = [];

  existingSourseComponent: Array<any> = [];
  saveReleases() {
    Spinner.show();
    this.newsReleases = [];
    setTimeout(() => {
      Spinner.hide();
      Toast.show({
        data: "Releases updated!",
        duration: 1000,
        success: true,
      });
    }, 900);
    this.$emit("saveReleaseLinks");
  }

  cancelReleases() {
    this.$emit("clikOnButton");
    if (this.newsReleases.length !== 0) {
      Spinner.show();
      this.newsReleases.forEach((el) => {
        this.removeExistingReleases(el);
      });
    }

    setTimeout(() => {
      Spinner.hide();
      Toast.show({
        data: "Releases removed!",
        duration: 1000,
        success: true,
      });
    }, 100);
  }

  async addExistingReleases() {
    Spinner.show();
    try {
      const release = await this.$createRelease("", "https://", this.startupId);
      if (release !== null) {
        this.existingSourseComponent.push({
          id: release.id,
          title: release.title,
          url: release.url.trim(),
          type: "add-existing-sourse",
        });
        this.newsReleases.push(release.id);
      }
      Spinner.hide();
    } catch (e) {
      console.error(e);
      Spinner.hide();
    }
  }

  textInput($event, i, id) {
    switch ($event[1]) {
      case "name":
        this.updateReleases(id, $event[0], this.existingSourseComponent[i].url);
        this.existingSourseComponent[i].title = $event[0];
        break;
      case "url":
        this.updateReleases(
          id,
          this.existingSourseComponent[i].title,
          $event[0]
        );
        this.existingSourseComponent[i].url = $event[0];
        break;
      default:
    }
  }

  async updateReleases(id, title = "", url = "") {
    Spinner.show();
    try {
      const release = await this.$updateRelease(id, title, url);
      if (release !== null) {
        Spinner.hide();
      }
    } catch (e) {
      console.error(e);
      Spinner.hide();
    }
  }

  async removeExistingReleases(id) {
    Spinner.show();
    try {
      const release = await this.$deleteRelease(id);

      if (+release.id === +id) {
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
    if (this.releases) {
      this.existingSourseComponent = [];
      this.releases.forEach((el) => {
        const data = {
          id: el.id,
          url: el.url,
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
