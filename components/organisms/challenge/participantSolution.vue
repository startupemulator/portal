<template>
  <div
    class="participant-solution"
    :style="addFeedback ? 'margin: 0 auto' : ''"
  >
    <div v-if="!addFeedback">
      <UBack
        :title="'Task Name'"
        :is-button="true"
        @clikOnButton="$emit('clikOnButton')"
      ></UBack>

      <UTitle :text="solutionData.creator.username"></UTitle>
      <div class="startup-card__started-start-time">
        <div class="started-start-time__finished">
          <h3>Finished</h3>
          <p>27 Sep 2020</p>
        </div>
        <div class="started-start-time__duration">
          <h3>Duration</h3>
          <p>{{ solutionData.estimation }} days</p>
        </div>
      </div>
      <CommentExpert
        v-if="isExpert"
        :solution-data="solutionData"
      ></CommentExpert>
      <div v-if="isExpert" class="challenge-task__button">
        <U-button
          :button-name="'Add Feedback'"
          :button-class="'u-button-blue add-feedback'"
          @clickOnButton="toggleAddFeedback"
        ></U-button>
      </div>
      <Solutions :solution="solutionData.solutions"></Solutions>
      <div v-if="isExpert" class="used-technologies">
        <h3>Used technologies</h3>
        <UTags
          v-for="item in solutionData.technologies"
          :key="item.id"
          :title="item.title"
        ></UTags>
      </div>
      <h3
        v-if="feedbacks.length > 0 && isExpert"
        class="participant-solution__title"
      >
        Feedback
      </h3>
      <FeedbackCardChallenges
        v-for="feedback in renewableFeeadback.slice(0, showMoreTwoFeedbacks)"
        :key="feedback.id"
        :feedback="feedback"
        :user-id="userId"
      ></FeedbackCardChallenges>

      <U-button
        v-if="showMoreTwoFeedbacks < solutionData.feedbacks.length"
        :button-name="'Show 2 More Feedback'"
        :button-class="'u-button-gray'"
        @clickOnButton="showMoreFeedbacks"
      ></U-button>
    </div>

    <AddTeamFeedBack
      v-if="addFeedback"
      :directions="directions"
      :expert-id="expertId"
      :request-id="solutionData.id"
      :badges="badges"
      @updateFeedbacks="updateFeedbacks"
      @clikOnButton="toggleAddFeedback"
    ></AddTeamFeedBack>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Spiner from "~/components/molecules/spiner.vue";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import Solutions from "~/components/molecules/solutions.vue";
import FeedbackCardChallenges from "~/components/molecules/feedbackCardChallenges.vue";
import { Feedbacks } from "~/models/Feedbacks";
import { Challenge } from "~/models/Challenge";
import CommentExpert from "~/components/molecules/commentForExpert.vue";
import AddTeamFeedBack from "~/components/organisms/startup/addTeamFeedback.vue";
import { Directions } from "~/models/Directions";
import { Badges } from "~/models/Badges";
import { scrollToHeader } from "~/assets/jshelper/scrollToHeader.js";

@Component({
  components: {
    UButton,
    UTitle,
    UBack,
    Solutions,
    FeedbackCardChallenges,
    CommentExpert,
    AddTeamFeedBack,
    Spiner,
  },
})
export default class extends Vue {
  @Prop() challenge: Array<Challenge>;
  @Prop() userId: string;
  @Prop() isExpert: string;
  @Prop() expertId: string;
  @Prop() solutionData: Array<any>;
  @Prop() feedbacks!: Array<Feedbacks>;
  @Prop() directions: Array<Directions>;
  @Prop() badges: Array<Badges>;

  showMoreTwoFeedbacks = 2;
  addFeedback = false;
  loading = false;

  renewableFeeadback: Array<Feedbacks> = this.feedbacks || [];
  showMoreFeedbacks() {
    this.showMoreTwoFeedbacks += 2;
  }

  toggleAddFeedback() {
    this.addFeedback = !this.addFeedback;
  }

  async updateFeedbacks() {
    this.loading = true;
    try {
      const feedbacks = await this.$feedbacks();
      if (feedbacks !== null) {
        this.renewableFeeadback = feedbacks;
        this.loading = false;
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }

    this.addFeedback = !this.addFeedback;
  }

  mounted() {
    scrollToHeader();
  }
}
</script>

<style lang="scss" scoped>
.participant-solution {
  margin-top: 40px;
  padding: 0 16px;
  h2 {
    margin-bottom: 12px;
  }
  .startup-card__started-start-time {
    display: flex;
    margin-bottom: 40px;
    h3 {
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      color: #8c97ac;
      margin: 0;
    }
    p {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      margin: 0;
      padding: 0;
    }
    .started-start-time__finished,
    .started-start-time__duration {
      width: 164px;
    }
    .started-start-time__duration {
      margin-left: 16px;
    }
  }
  .participant-solution__title {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    margin-top: 4px;
  }
}
@media (min-width: 768px) {
  .participant-solution {
    margin-top: 48px;
    margin-left: 48px;
    padding: 0;
    max-width: 831px;
    box-sizing: border-box;
    h2 {
      margin-bottom: 20px;
    }
    .startup-card__started-start-time {
      .started-start-time__finished,
      .started-start-time__duration {
        width: 135px;
      }
    }
    .startup-card__sources {
      margin-top: 60px;
    }
    .participant-solution__title {
      font-weight: 600;
      font-size: 35px;
      line-height: 40px;
      margin-top: 24px;
      margin-bottom: 24px;
    }
    .u-button-gray {
      width: 241px;
      height: 48px;
    }
  }
}
</style>
