<template>
  <div class="expert-user">
    <div class="profile-projects">
      <div class="profile-projects__header">
        <h3>Feedbacks</h3>
        <div class="profile-projects__header-project-quantity">
          <span>{{ feedbacksCount }}</span>
        </div>
      </div>
      <FeedBackCard
        v-for="feedback in feedbacks"
        :key="feedback.id"
        :feedback="feedback"
        :is-expert="isExpert"
        :user-id="userId"
        :is-expert-profile="true"
      ></FeedBackCard>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import FeedBackCard from "../../molecules/feedbackCard.vue";
import { Feedbacks } from "~/models/Feedbacks";

@Component({
  components: { FeedBackCard },
})
export default class extends Vue {
  @Prop() feedbacks: Array<Feedbacks>;
  @Prop() isExpert: Boolean;
  @Prop() isOwner: Boolean;
  @Prop() userId: string;

  feedbacksCount = this.feedbacks.length;
}
</script>
