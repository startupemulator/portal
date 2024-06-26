<template>
  <div
    class="participant-solution"
    :style="addFeedback ? 'margin: 0 auto' : ''"
  >
    <div v-if="!addFeedback">
      <U-Back
        :title="'Task Name'"
        :is-button="true"
        @clikOnButton="$emit('clikOnButton')"
      ></U-Back>

      <U-Title :text="solutionData.creator.profile.name"></U-Title>
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
      <Comment-Expert
        v-if="isExpert"
        :solution-data="solutionData"
      ></Comment-Expert>
      <div v-if="isExpert" class="challenge-task__button">
        <U-Button
          :button-name="'Add Feedback'"
          :button-class="'u-button-blue add-feedback'"
          @clickOnButton="toggleAddFeedback"
        ></U-Button>
      </div>
      <Solutions :solution="solutionData.solutions"></Solutions>
      <div v-if="isExpert" class="used-technologies">
        <h3>Used technologies</h3>
        <U-Tags
          v-for="item in solutionData.technologies"
          :key="item.id"
          :title="item.title"
        ></U-Tags>
      </div>
      <h3
        v-if="feedbacks.length > 0 && isExpert"
        class="participant-solution__title"
      >
        Feedback
      </h3>
      <Feedback-Card-Challenges
        v-for="feedback in renewableFeeadback.slice(0, showMoreTwoFeedbacks)"
        :key="feedback.id"
        :feedback="feedback"
        :user-id="userId"
      ></Feedback-Card-Challenges>

      <U-Button
        v-if="showMoreTwoFeedbacks < solutionData.feedbacks.length"
        :button-name="'Show 2 More Feedback'"
        :button-class="'u-button-gray'"
        @clickOnButton="showMoreFeedbacks"
      ></U-Button>
    </div>

    <Add-Team-Feedback
      v-if="addFeedback"
      :directions="directions"
      :expert-id="expertId"
      :request-id="solutionData.id"
      :badges="badges"
      @updateFeedbacks="updateFeedbacks"
      @clikOnButton="toggleAddFeedback"
      @teamNotificationFeedback="teamNotificationFeedback"
    ></Add-Team-Feedback>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

import Spinner from "../../../store/modules/Spinner";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import Solutions from "~/components/molecules/solutions.vue";
import FeedbackCardChallenges from "~/components/molecules/feedbackCardChallenges.vue";
import { Feedbacks } from "~/models/Feedbacks";
import { Challenge } from "~/models/Challenge";
import CommentExpert from "~/components/molecules/commentForExpert.vue";
import AddTeamFeedback from "~/components/organisms/startup/addTeamFeedback.vue";
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
    AddTeamFeedback,
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

  renewableFeeadback: Array<Feedbacks> = this.feedbacks || [];
  showMoreFeedbacks() {
    this.showMoreTwoFeedbacks += 2;
  }

  toggleAddFeedback() {
    this.addFeedback = !this.addFeedback;
  }

  async teamNotificationFeedback() {
    const recipient = this.solutionData.creator.id;
    const comment = "add feedback";
    const link = this.challenge.slug;
    try {
      const newNotification = await this.$createNotificationForChallenge(
        this.userId,
        comment,
        link,
        "feedback",
        this.challenge.id
      );
      if (newNotification !== null) {
        await this.$createUserNotification(recipient, newNotification.id);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async updateFeedbacks() {
    Spinner.show();
    try {
      const feedbacks = await this.$feedbacks();
      if (feedbacks !== null) {
        this.renewableFeeadback = feedbacks;
        Spinner.hide();
      }
    } catch (e) {
      console.error(e);
      Spinner.hide();
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
