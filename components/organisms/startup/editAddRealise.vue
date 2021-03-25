<template>
  <div class="edit-add-realise">
    <div class="edit-add-realise__content">
      <div class="edit-add-realise__header">
        <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
        <div class="edit-add-realise__header--title">
          <UTitle :text="'New feedback'"></UTitle>
          <span>2</span>
        </div>
      </div>
      <FeedBackCard
        v-for="testimonial in 1"
        :key="testimonial.id"
        :comment="testimonial.comment"
        :author="testimonial.author"
        :published="testimonial.published_at"
        :is_expert="true"
        :u_button_blue="'Publish'"
        :u_button_gray="'Decline'"
      >
      </FeedBackCard>
      <FeedBackCard
        v-for="testimonial in 1"
        :key="testimonial.id"
        :comment="testimonial.comment"
        :author="testimonial.author"
        :published="testimonial.published_at"
        :is_expert="true"
        :u_button_blue="'Publish'"
        :u_button_gray="'Decline'"
        :activity_state="true"
        :show_feedback="false"
      >
      </FeedBackCard>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import FeedBackCard from "~/components/molecules/feedBackCard.vue";

@Component({
  components: { UBack, UTitle, FeedBackCard },
})
export default class extends Vue {}
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
