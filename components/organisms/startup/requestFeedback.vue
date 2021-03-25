<template>
  <div class="request-feedback">
    <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
    <UTitle :text="'Request feedback'"></UTitle>
    <TechnologyPicker
      :title="'Pick technologies you need feedback in'"
      :add-technology="false"
    ></TechnologyPicker>
    <div class="request-feedback__comment">
      <h4>Comment</h4>
      <textarea placeholder="Enter your comment to our experts"></textarea>
    </div>
    <div class="request-feedback--button">
      <UButton
        :button-name="'Request'"
        :button-class="'u-button-blue'"
        @clickOnButton="toggleUPopup"
      ></UButton>
    </div>
    <UPopup
      v-show="UPopup"
      :title="'You successfully requested feedback from our experts'"
      :text-content="'Experts will receive your request and give feedback about your startup.'"
      @closePopupLinkSent="toggleUPopup"
    ></UPopup>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import UPopup from "~/components/molecules/popupChallengeStarted.vue";

@Component({
  components: { UBack, UTitle, TechnologyPicker, UButton, UPopup },
})
export default class extends Vue {
  UPopup = false;
  toggleUPopup() {
    this.UPopup = !this.UPopup;
  }
}
</script>

<style lang="scss" scoped>
.request-feedback {
  width: 343px;
  margin: 0 auto;
  margin-top: 40px;
  color: #fff;
  .request-feedback__comment {
    h4 {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 8px;
    }
    textarea {
      background: #2e384a;
      border-radius: 12px;
      width: 343px;
      height: 112px;
      padding: 8px 16px;
      color: #fff;
      box-sizing: border-box;
      border: none;
      &::placeholder {
        color: #b5c1d8;
      }
    }
  }
  .request-feedback--button {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 16px 16px 28px 16px;
    background: #232b39;
    border: 1px solid #3b465a;
    box-shadow: inset 0 0 10px 2px #262f3f;
    border-radius: 16px 16px 0 0;
  }
}
@media (min-width: 768px) {
  .request-feedback {
    width: 660px;
    margin-top: 48px;
    .request-feedback__comment {
      h4 {
        font-size: 17px;
        line-height: 32px;
      }
      textarea {
        width: 660px;
        height: 136px;
        padding: 12px 24px;
        font-size: 18px;
        line-height: 28px;
        &::placeholder {
          color: #b5c1d8;
        }
      }
    }
    .request-feedback--button {
      position: static;
      padding: 32px 0 28px 0;
      background: transparent;
      border: none;
      border-top: 1px solid #3b465a;
      box-shadow: none;
      border-radius: 0;
      margin-top: 24px;
    }
  }
}
</style>
