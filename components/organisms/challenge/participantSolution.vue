<template>
  <div class="participant-solution">
    <UBack
      :title="'Task Name'"
      :is-button="true"
      @clikOnButton="$emit('clikOnButton')"
    ></UBack>
    <UTitle :text="'Full Name'"></UTitle>
    <div class="startup-card__started-start-time">
      <div class="started-start-time__finished">
        <h3>Finished</h3>
        <p>27 Sep 2020</p>
      </div>
      <div class="started-start-time__duration">
        <h3>Duration</h3>
        <p>3 months</p>
      </div>
    </div>
    <!-- <Sources
      :finished="true"
      :title="'Solution'"
      :link1="'Link 1'"
      :link2="'Link 2'"
    ></Sources>
    <h3 class="participant-solution__title">Feedback</h3>
    <FeedBackCard
      :comment="'Some comment and feedback from an expert that belongs to some exact action in this list.'"
    ></FeedBackCard>
    <FeedBackCard
      :profile-img="false"
      :comment="'Some comment and feedback from an expert that belongs to some exact action in this list.'"
    ></FeedBackCard> -->
    <U-button
      :button-name="'Show 2 More Feedback'"
      :button-class="'u-button-gray'"
    ></U-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import Sources from "~/components/molecules/sources.vue";
import FeedBackCard from "~/components/molecules/feedbackCard.vue";

@Component({
  components: { UButton, UTitle, UBack, Sources, FeedBackCard },
})
export default class extends Vue {}
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
