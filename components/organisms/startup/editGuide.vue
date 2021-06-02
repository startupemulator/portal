<template>
  <div class="edit-guide">
    <div class="edit-guide__header">
      <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
      <UTitle :text="'Edit guide'"></UTitle>
      <p>
        Add any links, comments, an information about messengers, logins and
        passwords, etc. All the information that you need to share with your
        future team.
      </p>
    </div>
    <div class="edit-guide__content">
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
      <div class="edit-guide__add-link">
        <U-button
          :button-name="'Add Link'"
          :button-class="'u-button-blue'"
          @clickOnButton="addGuideSourse"
        ></U-button>
      </div>
    </div>
    <div class="edit-guide__buttons">
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
import { Component, Vue, Prop } from "nuxt-property-decorator";

import UButton from "~/components/atoms/uButton.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import Spiner from "~/components/molecules/spiner.vue";
import Toast from "~/store/modules/Toast";
import CreateGuide from "~/components/molecules/createGuide.vue";
import { Secrets } from "~/models/Secrets";

@Component({
  components: { UButton, UBack, UTitle, CreateGuide, Spiner },
})
export default class extends Vue {
  @Prop() secrets: Array<Secrets>;
  @Prop() startupId: string;

  loading = false;
  newswcrets = [];
  guideSourseComponent: Array<any> = [];
  saveSources() {
    this.loading = true;
    this.newswcrets = [];
    setTimeout(() => {
      this.loading = false;
      Toast.show({
        data: "Startup data updated!",
        duration: 1000,
        success: true,
      });
    }, 900);
  }

  cancelSources() {
    this.loading = true;
    if (this.newswcrets.length !== 0) {
      this.newswcrets.forEach((el) => {
        this.removeGuideSources(el);
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
  }

  async addGuideSourse() {
    this.loading = true;
    try {
      const secret = await this.$createSecret("", "", this.startupId);
      if (secret !== null) {
        this.guideSourseComponent.push({
          id: secret.id,
          type: "create-guide",
          name: secret.title,
          comment: secret.description,
        });
      }
      this.newswcrets.push(secret.id);
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
    if (this.secrets) {
      this.guideSourseComponent = [];
      this.secrets.forEach((el) => {
        const data = {
          id: el.id,
          comment: el.description,
          name: el.title,
          type: "create-guide",
        };
        this.guideSourseComponent.push(data);
      });
    }
    console.log(this.secrets);
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
