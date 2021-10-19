<template>
  <div class="challenge-card">
    <div class="challenge-card__header">
      <div
        v-show="!isExpert && card.status !== null"
        class="challenge-card__header-startup-state"
      >
        <span
          :class="
            card.status === 'in_progress '
              ? 'started'
              : card.status === 'finished '
              ? 'finished'
              : ''
          "
          >{{ card.status }}</span
        >
        <span
          :class="
            userAccepted
              ? 'started ml-8'
              : userFinishedChallenge
              ? 'finished ml-8'
              : 'display-none'
          "
          >{{
            userAccepted ? "started" : userFinishedChallenge ? "finished" : ""
          }}</span
        >
      </div>

      <div
        v-show="!isExpert && card.status === null && userIsAccept"
        class="challenge-card__header-startup-state"
      >
        <span
          :class="
            userAccepted ? 'started' : userFinishedChallenge ? 'finished' : ''
          "
          >{{
            userAccepted ? "started" : userFinishedChallenge ? "finished" : ""
          }}</span
        >
      </div>

      <div
        v-if="isExpert && feedbackAsk !== 0"
        class="challenge-card__header-startup-state"
      >
        <span class="feedback">Waiting for feedback </span>
        <span class="feedback-count">{{ feedbackAsk }}</span>
      </div>
      <div class="challenge-card__header-title">
        <h4 v-if="$device.isMobile">
          {{ card.title | truncate(35, "...") }}
        </h4>
        <h4 v-else>
          {{ card.title | truncate(15, "...") }}
        </h4>
      </div>
    </div>
    <div class="challenge-card__content">
      <h4 v-if="$device.isMobile" class="challenge-card__content-description">
        {{ card.description | truncate(90, "...") }}
      </h4>
      <h4 v-else class="challenge-card__content-description">
        {{ card.description | truncate(70, "...") }}
      </h4>
      <div class="challenge-card__content-specialisation">
        <UTags
          v-for="specialisation in card.specialisations.slice(0, 2)"
          :id="specialisation.id + 'specialisations'"
          :key="specialisation.id"
          :title="specialisation.title"
          class="modificate-challenge-slider"
        ></UTags>
        <UTags
          v-show="card.specialisations.length > 2"
          :id="card.id + 'countSpecialisations'"
          :title="'+' + (card.specialisations.length - 2)"
          class="modificate-challenge-slider"
          @pick="$router.push(`/challenge/${card.slug}`)"
        ></UTags>
      </div>
      <DifficultyLevel :card="card"></DifficultyLevel>
      <div class="challenge-card__content_buttons">
        <U-button
          :button-name="'Details'"
          :button-class="'u-button-gray'"
          :is-link="'nuxt-link'"
          :href="'/challenge/' + card.slug"
          @clickOnButton="$emit('clikOnButton')"
        ></U-button>

        <U-button
          v-if="!userIsAccept"
          :button-name="'Accept'"
          :button-class="'u-button-blue'"
          :is-link="'nuxt-link'"
          :href="'/challenge/accept/' + card.slug"
          @clickOnButton="$emit('clikOnButton')"
        ></U-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UButton from "../atoms/uButton.vue";
import { Challenge } from "../../models/Challenge";
import UTags from "~/components/atoms/uTags.vue";
import DifficultyLevel from "~/components/atoms/difficultyLevel.vue";
import { AskFeedbacks } from "~/models/AskFeedbacks";
import { userChallenges } from "~/models/UserChallenges";

@Component({
  components: { UButton, UTags, DifficultyLevel },
})
export default class extends Vue {
  @Prop() i: number;
  @Prop() card: Challenge;
  @Prop() userId: string;
  @Prop() isExpert: Boolean;
  @Prop() feedBackForChallenges: Array<AskFeedbacks>;
  @Prop() userChallenges: Array<userChallenges>;

  userIsAccept = false;
  feedbackAsk = 0;
  userAccepted = false;
  userFinishedChallenge = false;
  mounted() {
    if (this.card.users && this.card.users.length !== 0) {
      this.card.users.forEach((el) => {
        if (+el.user === +this.userId || +el.user.id === +this.userId) {
          this.userIsAccept = true;
        }
      });
    }
    if (this.isExpert) {
      this.feedbackAsk = this.feedBackForChallenges.filter(
        (el) =>
          +el.challenge.id === +this.card.id &&
          +el.creator.id !== +this.userId &&
          !el.feedbacks.some((item) => +item.expert.id === +this.userId)
      ).length;
    }
    if (
      this.userChallenges &&
      this.userChallenges.length !== 0 &&
      this.userChallenges.some((el) => +el.challenge.id === +this.card.id) &&
      !this.feedBackForChallenges.some(
        (el) =>
          +el.challenge.id === +this.card.id && +el.creator.id === +this.userId
      )
    ) {
      this.userAccepted = true;
    }
    if (
      this.feedBackForChallenges &&
      this.feedBackForChallenges.some(
        (el) =>
          +el.challenge.id === +this.card.id && +el.creator.id === +this.userId
      )
    ) {
      this.userFinishedChallenge = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.challenge-card {
  background: #2e384a;
  box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
  border-radius: 12px;
  padding: 16px 24px 32px 24px;
  box-sizing: border-box;
  width: 343px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .challenge-card__header {
    display: flex;
    flex-direction: column;
    position: relative;

    .challenge-card__header-startup-state {
      background: #283040;
      box-shadow: inset 2px -2px 8px rgba(28, 35, 48, 0.25);
      border-radius: 0 12px 0 12px;
      padding: 8px;
      margin-left: auto;
      position: relative;
      top: -16px;
      right: -24px;
      margin-bottom: -16px;
      display: flex;
      align-items: center;

      span {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        padding: 2px 12px;
        background: #8c97ac;
        box-shadow: 0 -2px 8px rgba(140, 151, 172, 0.3),
          0 2px 8px rgba(140, 151, 172, 0.3);
        border-radius: 14px;
        display: block;

        &.started {
          background: #3cc28d;
          box-shadow: 0 -2px 8px rgba(60, 194, 141, 0.3),
            0 2px 8px rgba(60, 194, 141, 0.3);
        }

        &.finished {
          background: #f0663b;
          box-shadow: -4px 0 6px 1px rgba(240, 102, 59, 0.25),
            4px 0 6px 1px rgba(240, 102, 59, 0.25);
        }

        &.feedback {
          background: #19adc7;
          box-shadow: 0 -2px 8px rgba(25, 173, 199, 0.3),
            0 2px 8px rgba(25, 173, 199, 0.3),
            inset 0 -2px 4px 1px rgba(22, 135, 155, 0.15),
            inset 0 1px 4px rgba(255, 255, 255, 0.15);
        }

        &.feedback-count {
          background: #eaf42c;
          color: #4e5a71;
          margin-left: 8px;
          padding: 0;
          width: 24px;
          height: 24px;
          text-align: center;
          box-shadow: 0 -2px 8px rgba(234, 244, 44, 0.3),
            0 2px 8px rgba(234, 244, 44, 0.3),
            inset 0 -2px 4px 1px rgba(117, 122, 14, 0.15),
            inset 0 1px 4px rgba(255, 255, 255, 0.15);
        }

        &.ml-8 {
          margin-left: 8px;
        }

        &.display-none {
          display: none;
        }
      }
    }

    .challenge-card__header-title {
      h4 {
        margin-top: 16px;
        margin-bottom: 0;
        font-weight: bold;
        font-size: 26px;
        line-height: 32px;
        color: #fff;
        height: 64px;
        overflow: hidden;
      }
    }
  }

  .challenge-card__content {
    .challenge-card__content-description {
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      margin-top: 8px;
      margin-bottom: 0;
      height: 80px;
    }

    .challenge-card__content-specialisation {
      margin-top: 16px;

      .tags-item {
        font-weight: normal;
        font-size: 14px;
        line-height: 32px;
        color: #b5c1d8;
        padding: 0 15px;
        border: 1px solid #59667e;
        margin-right: 4px;
      }
    }

    .challenge-card__content_buttons {
      margin-top: 24px;
      display: flex;

      .u-button-blue {
        margin-left: 9px;
      }
    }
  }
}

.startup-block.challenges .challenge-card {
  margin-right: 16px;
  width: 327px;
  min-width: 327px;

  .modificate-challenge-slider {
    margin-bottom: 12px;
    margin-top: -6px;
  }

  .challenge-card__content .challenge-card__content_buttons {
    margin-top: 10px;
  }
}
@media (min-width: 768px) {
  .challenge-card {
    padding: 24px 32px 40px 32px;
    width: 318px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // &:not(:nth-child(4n)) {
    //   margin-right: 24px;
    // }

    .challenge-card__header {
      .challenge-card__header-title {
        h4 {
          margin-top: 0;
          height: auto;
          font-size: 35px;
          line-height: 40px;
        }
      }

      .challenge-card__header-startup-state {
        padding: 12px;
        top: -24px;
        right: -32px;
      }

      & ~ .challenge-card__header-title {
        margin-top: -16px;
      }
    }

    .challenge-card__content {
      .challenge-card__content-description {
        font-size: 17px;
        line-height: 24px;
        margin-top: 24px;
        min-height: 96px;
      }

      .challenge-card__content-specialisation {
        margin-top: 32px;
        margin-top: auto;
      }

      .challenge-card__content_buttons {
        margin-top: 32px;

        .u-button-blue {
          margin-left: 12px;
        }
      }
    }
  }

  .startup-block.challenges .challenge-card {
    width: 318px;
    min-width: 318px;
    margin-right: 24px;
    min-height: 484px;
  }
}
</style>
