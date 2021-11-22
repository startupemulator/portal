<template>
  <div class="add-team-feedback">
    <div class="add-team-feedback__header">
      <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
      <UTitle :text="title"></UTitle>
    </div>
    <div class="add-team-feedback__content">
      <Criterios
        v-for="(direction, i) in directions"
        :key="direction.id"
        :direction="direction"
        :i="i"
        @markDirection="markDirection"
      ></Criterios>
      <p v-show="$v.markedDirection.$error" class="errorInput">
        Please choose mininum 1 criterions
      </p>
      <div class="add-team-feedback__comment">
        <p>Comment</p>
        <textarea
          v-model.trim="$v.comment.$model"
          placeholder="Enter your comment"
        ></textarea>
      </div>
      <p v-show="$v.comment.$error" class="errorInput comment-error">
        Please enter a comment of at least 10 characters
      </p>
      <PickBadeg
        :title="'Pick a badge (Optional)'"
        :badges="badges"
        @addBadge="addBadge"
      ></PickBadeg>
    </div>
    <div class="add-team-feedback__buttons">
      <U-button
        :button-name="'Submit'"
        :button-class="'u-button-blue'"
        @clickOnButton="createFeedback"
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

import { minLength, required } from "vuelidate/lib/validators";
import Spinner from "../../../store/modules/Spinner";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import Criterios from "~/components/molecules/criterios.vue";
import PickBadeg from "~/components/molecules/pickBadge.vue";
import { Directions } from "~/models/Directions";
import { Badges } from "~/models/Badges";

@Component({
  components: { UButton, UTitle, UBack, Criterios, PickBadeg },
  validations: {
    markedDirection: {
      required,
      minLength: minLength(1),
    },
    comment: {
      required,
      minLength: minLength(10),
    },
  },
})
export default class extends Vue {
  @Prop({ default: "Add feedback" }) title: string;
  @Prop() directions: Array<Directions>;
  @Prop() badges: Array<Badges>;
  @Prop() expertId: string;
  @Prop() requestId: string;
  markedDirection = [];
  comment = "";
  badge = "";
  createdCriterions: Array<string> = [];
  async markDirection({
    directionId,
    satrsCount,
  }: {
    directionId: string;
    satrsCount: string;
  }) {
    if (
      this.markedDirection.some((el) => +el.id === +directionId) &&
      satrsCount !== "skip"
    ) {
      this.markedDirection[
        this.markedDirection.findIndex((el) => +el.id === +directionId)
      ].satrsCount = satrsCount;

      try {
        Spinner.show();
        const criterionId =
          this.markedDirection[
            this.markedDirection.findIndex((el) => +el.id === +directionId)
          ].criterionId;
        const criterion = await this.$updateCriterions(criterionId, satrsCount);
        if (criterion !== null) {
          Spinner.hide();
        }
      } catch (e) {
        console.error(e);
        Spinner.hide();
      }
    } else if (satrsCount !== "skip") {
      try {
        Spinner.show();
        const criterion = await this.$createCriterions(satrsCount, directionId);
        if (criterion !== null) {
          this.markedDirection.push({
            id: directionId,
            criterionId: criterion.id,
            satrsCount,
          });
          Spinner.hide();
        }
      } catch (e) {
        console.error(e);
        Spinner.hide();
      }
    }
    if (satrsCount === "skip") {
      try {
        const criterionId =
          this.markedDirection[
            this.markedDirection.findIndex((el) => +el.id === +directionId)
          ].criterionId;
        Spinner.show();
        const criterion = await this.$deleteCriterions(criterionId);
        if (criterion !== null) {
          Spinner.hide();
        }
      } catch (e) {
        console.error(e);
        Spinner.hide();
      }
      this.markedDirection.splice(
        this.markedDirection.findIndex((el) => +el.id === +directionId),
        1
      );
    }
  }

  addBadge(badge) {
    this.badge = badge.id;
  }

  async createFeedback() {
    this.$v.$touch();
    if (!this.$v.$error) {
      this.markedDirection.forEach((el) =>
        this.createdCriterions.push(el.criterionId)
      );
      Spinner.show();
      try {
        const createFeedback = await this.$createFeedback(
          this.expertId,
          this.comment,
          this.createdCriterions,
          this.badge,
          this.requestId
        );
        if (createFeedback !== null) {
          Spinner.hide();
          this.$emit("clikOnButton");
          this.$emit("teamNotificationFeedback");
        }
      } catch (e) {
        console.error(e);
        Spinner.hide();
      }
    }
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

  .errorInput.comment-error {
    top: 0;
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
