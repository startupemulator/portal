<template>
  <div class="edit-guide">
    <div class="edit-guide__header">
      <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
      <UTitle :text="'Edit '"></UTitle>
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
        @removeGuideSources="removeGuideSources(item.id)"
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
      ></U-button>
      <U-button
        :button-name="'Cancel'"
        :button-class="'u-button-gray'"
        @clickOnButton="$emit('clikOnButton')"
      ></U-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import UButton from "~/components/atoms/uButton.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";

import CreateGuide from "~/components/molecules/createGuide";

@Component({
  components: { UButton, UBack, UTitle, CreateGuide },
})
export default class extends Vue {
  data() {
    return {
      popupPublish: false,
      guideSourseComponent: [
        { id: 1, type: "create-guide" },
        { id: 2, type: "create-guide" },
      ],
    };
  }

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
    textarea {
      background: #2e384a;
      border-radius: 12px;
      width: 343px;
      min-height: 48px;
      padding: 8px 16px;
      box-sizing: border-box;
      color: #fff;
      outline: none;
      font-weight: normal;
      font-size: 16px;
      //   line-height: 32px;
      border: 2px solid transparent;
      &:focus {
        border: 2px solid #b5c1d8;
      }
      &::placeholder {
        color: #b5c1d8;
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
      textarea {
        width: 620px;
        min-height: 56px;
        font-weight: normal;
        font-size: 18px;
        // line-height: 32px;
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
