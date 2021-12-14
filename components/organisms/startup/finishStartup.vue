<template>
  <div class="finish-startup">
    <div class="finish-startup__content">
      <h3>Finish this startup?</h3>
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('clikOnButton')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <div class="finish-startup__content__buttons">
        <U-Button
          :button-name="'Yes, Finish'"
          :button-class="'u-button-blue'"
          @clickOnButton="$emit('finishStartup')"
        ></U-Button>
        <U-Button
          :button-name="'No, Don’t Finish'"
          :button-class="'u-button-gray'"
          @clickOnButton="$emit('clikOnButton')"
        ></U-Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import UButton from "~/components/atoms/uButton.vue";

@Component({
  components: { UButton },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.finish-startup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(59, 70, 90, 0.6);
  backdrop-filter: blur(16px);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .finish-startup__content {
    background: #232b39;
    border-radius: 12px;
    width: 343px;
    box-sizing: border-box;
    padding: 24px;
    padding-top: 40px;
    position: relative;

    h3 {
      font-weight: bold;
      font-size: 26px;
      line-height: 32px;
      margin-top: 0;
    }

    .sign-up-link__close {
      position: absolute;
      right: 16px;
      top: 16px;
      background: transparent;
    }
  }

  .u-button-gray {
    margin-top: 16px;
  }
}
@media (min-width: 768px) {
  .finish-startup {
    .finish-startup__content {
      width: 564px;
      padding: 48px;

      h3 {
        font-weight: bold;
        font-size: 35px;
        line-height: 40px;
      }
    }

    .finish-startup__content__buttons {
      display: flex;

      .u-button-gray {
        margin-top: 0;
        margin-left: 24px;
      }
    }
  }
}
</style>
