<template>
  <div class="edit-add-realise">
    <div class="edit-add-realise__content">
      <div class="edit-add-realise__header">
        <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
        <div class="edit-add-realise__header--title">
          <UTitle :text="'Expert feedback'"></UTitle>
          <span v-if="newFeedBacks !== 0">{{ newFeedBacks }} </span>
        </div>
      </div>
      <div v-if="newFeedBacks === 0" class="emty-state-feedbacks">
        <p class="emty-state-feedbacks__title">There is no any feedback yet</p>
        <span
          >Request the first feeback about your startup from our experts.</span
        >
        <div class="emty-state-feedbacks__button">
          <Ubutton
            :button-name="'Request Feedback'"
            :button-class="'u-button-blue'"
            @clickOnButton="$emit('requestFeedback')"
          ></Ubutton>
        </div>
      </div>
      <FeedBackCard
        v-for="feedback in feedbacks"
        :key="feedback.published_at"
        :comment="feedback.description"
        :author="feedback.author"
        :user-id="userId"
        :published="feedback.published_at"
        :feedback="feedback"
        :is-expert="isExpert"
        :is-owner="isOwner"
        :u_button_blue="'Publish'"
        :u_button_gray="'Decline'"
        @updateFeedbacks="updateFeedbacks"
        @publickFeedback="$emit('publickFeedback')"
      >
      </FeedBackCard>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import FeedBackCard from "../../molecules/feedbackCard.vue";
import { Feedbacks } from "~/models/Feedbacks";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import Ubutton from "~/components/atoms/uButton.vue";
@Component({
  components: { UBack, UTitle, FeedBackCard, Ubutton },
})
export default class extends Vue {
  @Prop() feedbacks: Array<Feedbacks>;
  @Prop() userId: string;
  @Prop() newFeedBacks: string;
  @Prop() isExpert: boolean;
  @Prop() isOwner: boolean;
  updateFeedbacks(str) {
    this.$emit("updateFeedbacks");
  }
}
</script>
<style lang="scss" scoped>
.edit-add-realise {
  width: 343px;
  margin: 0 auto;
  margin-top: 36px;
  .edit-add-realise__header--title {
    display: flex;
    align-items: center;
    width: 330px;
    h2 {
      margin-right: 0;
      margin-left: 0;
    }
    span {
      width: 24px;
      height: 24px;
      left: 0;
      top: 10px;
      background: #eaf42c;
      box-shadow: 0 -2px 8px rgba(234, 244, 44, 0.3),
        0 2px 8px rgba(234, 244, 44, 0.3),
        inset 0 -2px 4px 1px rgba(117, 122, 14, 0.15),
        inset 0 1px 4px rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #4e5a71;
      margin-left: 12px;
      margin-bottom: 4px;
    }
  }
  .emty-state-feedbacks {
    padding: 32px 16px 64px;
    border: 2px dashed #8c97ac;
    box-sizing: border-box;
    border-radius: 12px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
    }
    span {
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
    }
    .emty-state-feedbacks__button {
      margin-top: 32px;
      width: 100%;
    }
  }
}
@media (min-width: 768px) {
  .edit-add-realise {
    width: 660px;
    margin-top: 42px;
    .edit-add-realise__header--title {
      width: 500px;

      span {
        margin-top: 34px;
        margin-left: 16px;
      }
    }

    .emty-state-feedbacks {
      padding: 100px 48px;

      p {
        font-size: 35px;
        line-height: 40px;
      }
      span {
        font-size: 17px;
        line-height: 24px;
        width: 377px;
      }
      .emty-state-feedbacks__button {
        margin-top: 40px;
        width: 275px;
      }
    }
  }
}
</style>
