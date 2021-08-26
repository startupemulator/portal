<template>
  <div class="my-profile-regular-user">
    <div class="profile__personal-achivements">
      <h3>Challenges achivements</h3>
      <div class="team-achivements__content">
        <div
          v-for="feedback in myChallengeFeedbacks"
          :key="feedback.id + 'startup'"
          class="arhivements-image"
        >
          <span v-if="feedback.badges.length !== 0">
            <img
              v-for="badge in feedback.badges"
              :key="badge.id + 'badge'"
              :src="badge.image[0].url"
              alt="profile-imag"
              @click="togglePopup(feedback, badge)"
            />
          </span>
        </div>
      </div>
    </div>

    <div class="profile__team-achivements">
      <h3>Startups achivements</h3>
      <div class="team-achivements__content">
        <div
          v-for="feedback in myStartupFeedbacks"
          :key="feedback.id + 'startup'"
          class="arhivements-image"
        >
          <span v-if="feedback.badges.length !== 0">
            <img
              v-for="badge in feedback.badges"
              :key="badge.id + 'badge'"
              :src="badge.image[0].url"
              alt="profile-imag"
              @click="togglePopup(feedback, badge)"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { Feedbacks } from "~/models/Feedbacks";

@Component({
  components: {},
})
export default class extends Vue {
  @Prop() myStartupFeedbacks: Array<Feedbacks>;
  @Prop() myChallengeFeedbacks: Array<Feedbacks>;

  togglePopup(feedback, badge) {
    this.$emit("togglePopup", feedback, badge);
  }
}
</script>
