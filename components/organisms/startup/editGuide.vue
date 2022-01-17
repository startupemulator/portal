<template>
  <div class="edit-guide">
    <div class="edit-guide__header">
      <U-Back :is-button="true" @clikOnButton="$emit('clikOnButton')"></U-Back>
      <U-Title :text="'Edit guide'"></U-Title>
      <p>
        Add any links, comments, an information about messengers, logins and
        passwords, etc. All the information that you need to share with your
        future team.
      </p>
    </div>
    <div class="edit-guide__content">
      <div>
        <Create-Guide
          v-for="(guide, i) in secrets"
          :key="guide.id"
          :name="'Item ' + (i + 1)"
          :guide-name="guide.title"
          :guide-comment="guide.description"
          @removeGuideSources="deleteSecret(guide.id)"
          @updateSecret="updateSecret($event, guide.id)"
        ></Create-Guide>
      </div>
      <div class="edit-guide__add-link">
        <U-Button
          :button-name="'Add item'"
          :button-class="'u-button-blue'"
          @clickOnButton="createSecret"
        ></U-Button>
      </div>
    </div>
    <div class="edit-guide__buttons">
      <U-Button
        :button-name="'Save'"
        :button-class="'u-button-blue'"
        @clickOnButton="saveSources"
      ></U-Button>
      <U-Button
        :button-name="'Cancel'"
        :button-class="'u-button-gray'"
        @clickOnButton="cancelSources"
      ></U-Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Spinner from "../../../store/modules/Spinner";
import UButton from "~/components/atoms/uButton.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import Toast from "~/store/modules/Toast";
import CreateGuide from "~/components/molecules/createGuide.vue";
import { Secrets } from "~/models/Secrets";
import { Startup } from "~/store";

@Component({
  components: { UButton, UBack, UTitle, CreateGuide },
})
export default class extends Vue {
  Startup;
  constructor() {
    super();
    this.Startup = Startup;
  }

  @Prop() secrets: Array<Secrets>;

  async createSecret() {
    Spinner.show();
    await Startup.createSecret(this);
    Spinner.hide();
  }

  async deleteSecret(id) {
    Spinner.show();
    await Startup.deleteSecret({ context: this, id });
    Spinner.hide();
  }

  async updateSecret({ title, description }, id) {
    Spinner.show();
    await Startup.updateSecret({ context: this, title, description, id });
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
    this.$emit("saveGuide");
  }

  cancelSources() {
    this.saveSources();
  }
}
</script>
<style lang="scss">
.edit-guide {
  color: #fff;
  max-width: 660px;
  margin: 0 auto;
  padding: 0 16px;
  margin-top: 36px;

  .edit-guide__header {
    h2 {
      margin-bottom: 12px;
    }

    p {
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
    }
  }

  .edit-guide__content {
    margin-top: 34px;

    .edit-guide__add-link {
      margin-top: 8px;

      .u-button {
        height: 40px;
      }
    }
  }

  .edit-guide__buttons {
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
  .edit-guide {
    margin-top: 48px;

    .edit-guide__header {
      p {
        margin-top: 14px;
        font-size: 17px;
        line-height: 24px;
        width: 600px;
      }
    }

    .edit-guide__content {
      margin-top: 48px;

      .edit-guide__add-link {
        margin-top: 20px;

        .u-button {
          height: 48px;
          width: 121px;
        }
      }
    }

    .edit-guide__buttons {
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
