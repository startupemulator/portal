<template>
  <div class="update-startup">
    <div v-if="!isStartStartup" class="update-startup__content">
      <button
        type="button"
        class="update-startup__close"
        @click="$emit('closePopupLinkEmail')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <U-Title :text="'Delete this startup?'"></U-Title>
      <p>
        Enter the name of your startup
        <span>{{ moveAwayStartupName | truncate(40, "...") }}</span> to confirm
        deletion.
      </p>
      <form>
        <U-input
          :placeholder="'Enter this startup’s name'"
          :class="'update-startup__input'"
          @textInput="textInput"
        ></U-input>

        <div class="update-startup__buttons">
          <U-button
            :button-name="'Yes, Delete'"
            :button-class="'u-button-blue'"
            @clickOnButton="deleteStartup"
          ></U-button>
          <U-button
            :button-name="'No, Don’t Delete'"
            :button-class="'u-button-gray '"
            @clickOnButton="$emit('clickOnButton')"
          ></U-button>
        </div>
      </form>
    </div>
    <div v-else class="update-startup__content" style="height: 200px">
      <button
        type="button"
        class="update-startup__close"
        @click="$emit('closePopupLinkEmail')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <u-title :text="'Start this startup?'"></u-title>
      <form>
        <div class="update-startup__buttons">
          <U-button
            :button-name="'Yes, Start'"
            :button-class="'u-button-blue'"
            @clickOnButton="$emit('startStartup')"
          ></U-button>
          <U-button
            :button-name="'No, Don’t Start'"
            :button-class="'u-button-gray '"
            @clickOnButton="$emit('clickOnButton')"
          ></U-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import UButton from "../atoms/uButton.vue";
import UTitle from "../atoms/uTitle.vue";
import UInput from "../atoms/uInput.vue";
@Component({ components: { UTitle, UButton, UInput } })
export default class extends Vue {
  @Prop() moveAwayStartup: string;
  @Prop() moveAwayStartupName: string;
  @Prop() isStartStartup: boolean;
  startupName: string = "";
  textInput(e) {
    this.startupName = e;
  }

  deleteStartup() {
    this.$emit("deleteStartup", this.startupName, this.moveAwayStartup);
  }
}
</script>
<style lang="scss" scoped>
.update-startup {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(59, 70, 90, 0.6);
  backdrop-filter: blur(16px);
  display: flex;
  justify-content: center;
  z-index: 5;

  .update-startup__content {
    position: relative;
    width: 343px;
    height: 362px;
    display: flex;
    flex-direction: column;
    background: #232b39;
    border-radius: 12px;
    padding: 0 24px;
    box-sizing: border-box;
    margin-top: 175px;

    .standart-label.update-startup__input {
      margin-top: 8px;
      display: block;
    }
  }

  .update-startup__close {
    position: absolute;
    right: 10px;
    top: 16px;
    background-color: transparent;
  }

  h2 {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    margin-left: 0;
    margin-top: 40px;
    margin-bottom: 0;
  }

  p {
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    color: #fff;
    width: 260px;

    span {
      font-weight: bold;
    }
  }

  .update-startup__buttons {
    margin-top: 24px;

    button {
      margin-bottom: 16px;
    }
  }
}
@media (min-width: 1280px) {
  .update-startup {
    .update-startup__content {
      width: 564px;
      height: 360px;
      padding: 0 48px;
      margin-top: 342px;
    }

    h2 {
      font-weight: bold;
      font-size: 35px;
      line-height: 40px;
    }

    p {
      font-weight: normal;
      font-size: 17px;
      line-height: 24px;
      width: 100%;

      span {
        font-weight: bold;
      }
    }

    .update-startup__buttons {
      display: flex;

      .u-button-gray {
        margin-left: 24px;
      }
    }
  }
}
</style>
