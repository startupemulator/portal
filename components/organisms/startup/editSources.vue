<template>
  <div class="edit-sources">
    <div class="edit-sources__header">
      <U-Back :is-button="true" @clikOnButton="$emit('clikOnButton')"></U-Back>
      <U-Title :text="'Edit sources'"></U-Title>
      <p>
        Add links on design, userflows, repositories, etc., which will be used
        during the project’s development. You can skip this step for now.
      </p>
    </div>
    <div class="edit-sources__content">
      <div v-for="(source, i) in sources" :key="source.id">
        <Add-Existing-Source
          :name="'Link ' + (i + 1)"
          :link-name="source.title"
          :link-href="source.link"
          @removeESource="removeExistingSources(source.id)"
          @updateSource="updateSourses($event, source.id)"
        ></Add-Existing-Source>
      </div>

      <div class="existing-sources__add-link">
        <U-Button
          :button-name="'Add Link'"
          :button-class="'u-button-blue'"
          @clickOnButton="createSource"
        ></U-Button>
      </div>
    </div>
    <div class="edit-sources__buttons">
      <U-Button
        :button-name="'Save'"
        :button-class="'u-button-blue'"
        @clickOnButton="saveSources"
      ></U-Button>
      <U-Button
        :button-name="'Cancel'"
        :button-class="'u-button-gray'"
        @clickOnButton="saveSources"
      ></U-Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import AddExistingSource from "../../molecules/addExistingSource.vue";
import Spinner from "../../../store/modules/Spinner";
import UButton from "~/components/atoms/uButton.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Sources } from "~/models/Sources";
import Toast from "~/store/modules/Toast";
import { Startup } from "~/store";

@Component({
  components: { UButton, UBack, UTitle, AddExistingSource },
})
export default class extends Vue {
  Startup;
  constructor() {
    super();
    this.Startup = Startup;
  }

  @Prop() sources: Array<Sources>;
  @Prop() startupId: string;

  async createSource() {
    Spinner.show();
    await Startup.createSource(this);
    Spinner.hide();
  }

  async removeExistingSources(id) {
    Spinner.show();
    await Startup.deleteSources({ context: this, id });
    Spinner.hide();
  }

  async updateSourses({ link, title }, id) {
    Spinner.show();
    await Startup.updateSources({ context: this, link, title, id });
    Spinner.hide();
  }

  saveSources() {
    Spinner.show();

    setTimeout(() => {
      Spinner.hide();
      Toast.show({
        data: "Startup data updated!",
        duration: 1000,
        success: true,
      });
    }, 900);
    this.$emit("saveSources");
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
