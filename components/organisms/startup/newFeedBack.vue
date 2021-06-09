<template>
  <div class="edit-add-realise">
    <pre style="color: #fff">{{ feedbacks }} </pre>
    <div class="edit-add-realise__content">
      <div class="edit-add-realise__header">
        <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
        <div class="edit-add-realise__header--title">
          <UTitle :text="'New feedback'"></UTitle>
          <span>{{ newFeedBacks }} </span>
        </div>
      </div>
      <FeedBackCard
        v-for="feedback in feedbacks"
        :key="feedback.id"
        :comment="feedback.description"
        :author="feedback.author"
        :user-id="userId"
        :published="feedback.published_at"
        :feedback="feedback"
        :is_expert="true"
        :u_button_blue="'Publish'"
        :u_button_gray="'Decline'"
        @updateFeedbacks="updateFeedbacks"
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

@Component({
  components: { UBack, UTitle, FeedBackCard },
})
export default class extends Vue {
  @Prop() feedbacks: Array<Feedbacks>;
  @Prop() userId: string;
  @Prop() newFeedBacks: string;

  updateFeedbacks(str) {
    console.log(str);
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
    width: 288px;
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
}
@media (min-width: 768px) {
  .edit-add-realise {
    width: 660px;
    margin-top: 42px;
    .edit-add-realise__header--title {
      width: 440px;

      span {
        margin-top: 34px;
        margin-left: 16px;
      }
    }
  }
}
</style>
