<template>
  <div class="add-team-feedback">
    <div class="add-team-feedback__header">
      <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
      <UTitle :text="title"></UTitle>
    </div>
    <div class="add-team-feedback__content">
      <!-- <pre style="color: #fff">{{ directions }} </pre> -->
      <Criterios
        v-for="(direction, i) in directions"
        :key="direction.id"
        :direction="direction"
        :i="i"
        @markDirection="markDirection"
      ></Criterios>
      <div class="add-team-feedback__comment">
        <p>Comment</p>
        <textarea placeholder="Enter your comment"></textarea>
      </div>
      <PickBadeg :title="'Pick a badge (Optional)'"></PickBadeg>
    </div>
    <div class="add-team-feedback__buttons">
      <U-button
        :button-name="'Submit'"
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
import { Component, Prop, Vue } from "nuxt-property-decorator";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import Criterios from "~/components/molecules/criterios.vue";
import PickBadeg from "~/components/molecules/pickBadge.vue";
import { Directions } from "~/models/Directions";

@Component({
  components: { UButton, UTitle, UBack, Criterios, PickBadeg },
})
export default class extends Vue {
  @Prop({ default: "Add feedback" }) title: string;
  @Prop() directions: Array<Directions>;
  markedDirection = [];
  markDirection(directionId: string, mark: string) {
    console.log(this.markedDirection.some((el) => +el.id === +directionId));
    if (this.markedDirection.some((el) => +el.id === +directionId)) {
      // console.log(
      //   this.markedDirection.findIndex((el) => +el.id === +directionId)
      // );
      this.markedDirection[
        this.markedDirection.findIndex((el) => +el.id === +directionId)
      ].mark = mark;
    } else {
      this.markedDirection.push({ id: directionId, mark });
    }
    console.log(this.markedDirection);
  }
}
</script>

<style lang="scss">
.add-team-feedback {
  width: 343px;
  margin: 0 auto;
  padding: 0 16px;
  margin-top: 40px;
  h2 {
    margin-bottom: 28px;
  }
  .add-team-feedback__comment {
    margin-top: 8px;
    p {
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin-top: 0;
      margin-bottom: 8px;
    }
    textarea {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      padding: 8px 16px;
      background: #2e384a;
      border-radius: 12px;
      color: #fff;
      width: 343px;
      height: 136px;
      border: 2px solid transparent;
      box-sizing: border-box;
      &::placeholder {
        color: #b5c1d8;
      }
      &:focus {
        border: 2px solid #b5c1d8;
      }
    }
  }
  .add-team-feedback__buttons {
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
  .add-team-feedback {
    width: 660px;
    padding: 0;
    margin-top: 48px;
    h2 {
      margin-bottom: 38px;
    }
    .add-team-feedback__comment {
      margin-top: 32px;
      p {
        margin-bottom: 10px;
      }
      textarea {
        font-size: 18px;
        line-height: 28px;
        padding: 12px 24px;
        width: 660px;
        height: 136px;

        &::placeholder {
          color: #b5c1d8;
        }
        &:focus {
          border: 2px solid #b5c1d8;
        }
      }
    }
    .add-team-feedback__buttons {
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
      margin-top: 24px;
      .u-button-gray {
        margin-left: 24px;
      }
    }
  }
}
</style>
