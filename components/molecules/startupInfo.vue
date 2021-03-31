<template>
  <div class="startup-info">
    <div class="startup-info__form">
      <p>Startup name</p>
      <UInput
        :value="'Startup #1'"
        :placeholder="'Enter the startup name'"
      ></UInput>
      <p>Description</p>
      <textarea
        placeholder="Describe your idea and main goals of your startup to interest developers to join your team

"
      >
 The goal is to implement Learning Management Portal - a portal for managing the educational process and teaching materials as part of the university curriculum.
Our purposes are remove the manual work of the teacher; combine online learning tools in one tool; give students easy access to materials; simplify the implementation and validation of practical tasks; open access to current ratings."
        placeholder="Enter the startup name</textarea
      >
    </div>
    <p>Start date</p>

    <UDateInput></UDateInput>
    <p>Estimated finish date</p>

    <UDateInput></UDateInput>
    <div class="edit-startup-info__buttons">
      <U-button
        :button-name="'Save'"
        :button-class="'u-button-blue'"
      ></U-button>
      <U-button
        :button-name="'Cancel'"
        :button-class="'u-button-gray'"
        @clickOnButton="$emit('clickOnButton')"
      ></U-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import UInput from "~/components/atoms/uInput.vue";
import UButton from "~/components/atoms/uButton.vue";
import UDateInput from "~/components/atoms/uDateInput.vue";

@Component({
  components: { UButton, UInput, UDateInput },
})
export default class extends Vue {}
</script>

<style lang="scss">
.startup-info {
  color: #fff;
  textarea {
    width: 340px;
    height: 136px;
    background: #2e384a;
    border-radius: 12px;
    overflow: hidden;
    border: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    padding: 8px 16px;
    box-sizing: border-box;
    margin-bottom: 12px;
  }

  .startup-info__form {
    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #fff;
      margin-bottom: 0;
      margin-top: 32px;
    }
  }
  .standart-label input.standart-input {
    padding-left: 16px;
  }
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    margin-bottom: 10px;
  }
  .edit-startup-info__buttons {
    position: fixed;
    left: 0;
    bottom: 0;
    border: 1px solid #3b465a;
    background: #232b39;
    box-shadow: inset 0 0 10px 2px #262f3f;
    border-radius: 16px 16px 0 0;
    padding: 16px 16px 28px 16px;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    .u-button-gray {
      margin-left: 16px;
    }
  }
}
@media (min-width: 768px) {
  .startup-info {
    textarea {
      width: 660px;
      height: 136px;
      font-size: 18px;
      line-height: 28px;
      padding: 12px 24px;
      margin-bottom: 0;
    }
    p {
      font-weight: 500;
      font-size: 17px;
      line-height: 32px;
      margin-top: 24px;
    }
    .startup-info__form {
      p {
        font-weight: 500;
        font-size: 17px;
        line-height: 32px;
        margin-bottom: 8px;
        margin-top: 20px;
      }
    }
    .edit-startup-info__buttons {
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
      margin-top: 36px;
      .u-button-gray {
        margin-left: 24px;
      }
    }
  }
}
</style>
