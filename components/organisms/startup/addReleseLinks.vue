<template>
  <div class="edit-sources">
    <div class="edit-sources__header">
      <U-Back :is-button="true" @clikOnButton="$emit('clikOnButton')"></U-Back>
      <U-Title :text="'Add release links'"></U-Title>
      <p>Add links on your published product, a case, an article, etc.</p>
    </div>
    <div
      v-for="(release, i) in releases"
      :key="release.id"
      class="edit-sources__content"
    >
      <Add-Release-Link
        :name="'Link ' + (i + 1)"
        :link-name="release.title"
        :link-href="release.url"
        @removeSource="
          deleteReleaseLink({ releasePosition: i, id: release.id })
        "
        @updateSource="updateReleaseLink($event, i, release.id)"
      ></Add-Release-Link>
    </div>
    <div class="existing-sources__add-link">
      <U-Button
        :button-name="'Add Link'"
        :button-class="'u-button-blue'"
        @clickOnButton="createReleaseLink"
      ></U-Button>
    </div>
    <div class="edit-sources__buttons">
      <U-Button
        :button-name="'Save'"
        :button-class="'u-button-blue'"
        @clickOnButton="saveReleases"
      ></U-Button>
      <U-Button
        :button-name="'Cancel'"
        :button-class="'u-button-gray'"
        @clickOnButton="saveReleases"
      ></U-Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import AddReleaseLink from "../../molecules/addExistingSource.vue";
import Spinner from "../../../store/modules/Spinner";
import UButton from "~/components/atoms/uButton.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Releases } from "~/models/Releases";
import Toast from "~/store/modules/Toast";
import { Startup } from "~/store";

@Component({
  components: { UButton, UBack, UTitle, AddReleaseLink },
})
export default class extends Vue {
  @Prop() releases: Array<Releases>;
  @Prop() startupId: string;

  async createReleaseLink() {
    Spinner.show();
    await Startup.createReleaseLink(this);
    Spinner.hide();
  }

  async deleteReleaseLink({ releasePosition, id }) {
    Spinner.show();
    await Startup.deleteReleaseLink({ context: this, id, releasePosition });

    Spinner.hide();
  }

  async updateReleaseLink({ title, link }, i, id) {
    console.log(title, link, i, id);
    Spinner.show();
    await Startup.updateRelease({
      context: this,
      id,
      title,
      link,
      releasePosition: i,
    });

    Spinner.hide();
  }

  saveReleases() {
    Spinner.show();

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
    }

    .existing-sources__add-link {
      margin-top: 20px;

      .u-button {
        height: 48px;
        width: 121px;
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
