<template>
  <div class="create-project__super-admin">
    <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
    <UTitle :text="'Create a challenge'"></UTitle>
    <div class="create-project__super-admin-progress-bar">
      <div class="create-project__super-admin__progress-bar--progress"></div>
    </div>
    <p>Challenge name</p>
    <UInput :placeholder="'Enter the challenge name'"></UInput>
    <p>Description</p>
    <textarea
      placeholder="Provide a full description of the task


"
    ></textarea>
    <DifficultyLevelPicker></DifficultyLevelPicker>
    <p>Pick specialization this task is for</p>
    <Utags
      v-for="(item, i) in 4"
      :key="i"
      :title="'Full Stack Developer'"
    ></Utags>

    <div
      :is="item.type"
      v-for="(item, i) in existingSourseComponent"
      :key="item.id"
      :name="'Source Link ' + (i + 1)"
      @removeExistingSources="removeExistingSources(item.id)"
    ></div>
    <U-button
      :button-name="'Add Link'"
      :button-class="'u-button-blue add-link'"
      @clickOnButton="addExistingSourse"
    ></U-button>
    <div class="create-project__super-admin_button">
      <U-button
        :button-name="'Publish'"
        :button-class="'u-button-blue'"
      ></U-button>
      <U-button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
        @clickOnButton="$emit('clikOnButton')"
      ></U-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import UInput from "~/components/atoms/uInput.vue";
import Utags from "~/components/atoms/uTags.vue";
import DifficultyLevelPicker from "~/components/atoms/difficultyLevelPicker.vue";
import AddExistingSourse from "~/components/molecules/addExistingSource.vue";

@Component({
  components: {
    UButton,
    UTitle,
    UBack,
    UInput,
    Utags,
    AddExistingSourse,
    DifficultyLevelPicker,
  },
})
export default class extends Vue {
  data() {
    return {
      existingSourseComponent: [
        { id: 1, type: "add-existing-sourse" },
        { id: 2, type: "add-existing-sourse" },
      ],
    };
  }

  addExistingSourse() {
    this.existingSourseComponent.push({
      id: this.existingSourseComponent.length + 1,
      type: "add-existing-sourse",
    });
  }

  removeExistingSources(i) {
    this.existingSourseComponent = this.existingSourseComponent.filter(
      (item) => item.id !== i
    );
  }
}
</script>
<style lang="scss">
.create-project__super-admin {
  color: #fff;
  max-width: 660px;
  margin: 0 auto;
  margin-top: 40px;
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
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
    margin-bottom: 21px;
    border: 2px solid transparent;
    &:focus {
      border: 2px solid #b5c1d8;
    }
    &::placeholder {
      color: #b5c1d8;
    }
  }
  .create-project__super-admin-progress-bar {
    position: relative;
    max-width: 660px;
    height: 12px;
    border: 1px solid #4e5a71;
    box-sizing: border-box;
    box-shadow: inset 2px -1px 8px rgba(78, 100, 141, 0.5);
    border-radius: 16px;
    background: #232b39;
    .create-project__super-admin__progress-bar--progress {
      position: relative;
      top: -1px;
      left: -1px;
      background: #6295fc;
      box-shadow: -2px 0 8px rgba(98, 149, 252, 0.8),
        2px 0 8px rgba(98, 149, 252, 0.8);
      border-radius: 14px;
      height: 12px;
      width: 30%;
      transition: 0.2s;
    }
  }
  .create-project__super-admin_button {
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
  .create-project__super-admin {
    p {
      font-weight: 500;
      font-size: 17px;
      line-height: 32px;
    }
    .standart-label .standart-input {
      padding-left: 24px;
    }
    .create-project__super-admin_button {
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
    textarea {
      width: 660px;
      min-height: 136px;
      font-weight: normal;
      font-size: 18px;
      padding: 12px 24px;
    }
    .add-link {
      width: 121px;
      height: 48px;
      margin-top: 16px;
    }
  }
}
</style>
