<template>
  <div class="regular-user">
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
        <div v-if="myChallengeFeedbacks.length === 0" class="no_achivements">
          <div class="no_achivements__content">
            <p>There is no any challenges achievements yet</p>
          </div>
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

        <div v-if="myStartupFeedbacks.length === 0" class="no_achivements">
          <div class="no_achivements__content">
            <p>There is no any startups achievements yet</p>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-projects">
      <div class="profile-projects__header">
        <h3>Projects</h3>
        <div class="profile-projects__header-project-quantity">
          <span>{{ startups.length }}</span>
        </div>
      </div>
      <div v-if="startups.length === 0" class="no_projects">
        <div class="no_achivements__content">
          <p>There is no any projects yet</p>
        </div>
      </div>
    </div>
    <div class="start-ups_cards-content startup-block">
      <div class="transition__startup-card">
        <Startup-card
          v-for="card in startups"
          :key="card.id"
          :card="card"
          :user-id="userId"
          :button_apply="false"
          :button_details="true"
        ></Startup-card>
      </div>
    </div>
    <u-button
      :class="'u-button-gray u-button-gray__show-more'"
      :button-name="'Show 1 More Project'"
    ></u-button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Startup } from "~/models/Startup";
import StartupCard from "~/components/molecules/startupCard.vue";
import { Feedbacks } from "~/models/Feedbacks";

@Component({
  components: {
    StartupCard,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
  @Prop() userId: string;
  @Prop() myStartupFeedbacks: Array<Feedbacks>;
  @Prop() myChallengeFeedbacks: Array<Feedbacks>;

  togglePopup(feedback, badge) {
    this.$emit("togglePopup", feedback, badge);
  }
}
</script>
