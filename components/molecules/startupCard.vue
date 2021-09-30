<template>
  <div class="startup-card" :class="i > 3 ? 'startup-card_animation' : ''">
    {{ card.technologies.title }}
    <div v-show="!!card.state" class="startup-card__started">
      <div class="startup-card__started-state">
        <div
          v-if="askFeedbacks === 0"
          class="startup-card__started-title"
          :class="
            card.state === 'in_progress'
              ? 'started'
              : card.state === 'finished'
              ? 'finished'
              : card.state === 'feedback'
              ? 'feedback'
              : ''
          "
        >
          {{ card.state.split("_").join(" ") | capitalize }}
        </div>
        <div
          v-if="userStatus !== ''"
          class="startup-card__started-title user-status"
          :class="
            userStatus === 'Member'
              ? 'owner'
              : userStatus === 'Rejected'
              ? 'finished'
              : ''
          "
        >
          {{ userStatus }}
        </div>
        <div
          v-if="+card.owner.id === +userId && askFeedbacks === 0"
          class="startup-card__started-title owner"
        >
          Owner
        </div>
        <div v-if="askFeedbacks !== 0">
          <div class="startup-card__started-title feedback">
            Waiting for feedback
          </div>
        </div>

        <div
          v-if="
            (card.newFeedbacks && card.newFeedbacks !== 0) || askFeedbacks !== 0
          "
          class="startup-card__started-title askFeedbacks"
        >
          {{ card.newFeedbacks || askFeedbacks }}
        </div>
      </div>
    </div>

    <div class="startup-card-content">
      <h2 class="startup-card__started-name">
        {{ card.title | truncate(35, "...") }}
      </h2>
      <h3 class="startup-card__started-text">
        {{ card.description | truncate(70, "...") }}
      </h3>

      <div class="startup-card__started-technologies">
        <ul class="startup-card__started-technologies-items">
          <li
            v-for="skill in card.technologies"
            :key="skill.id"
            class="startup-card__started-technology"
          >
            {{ skill.title }}
          </li>
        </ul>
      </div>

      <div class="startup-card__started-start-time">
        <div class="started-start-time__start">
          <h3>Start</h3>
          <p>{{ card.start_date | formatDate }}</p>
        </div>
        <div class="started-start-time__duration">
          <h3>Duration</h3>
          <p>{{ card.duration }} days</p>
        </div>
      </div>
      <div class="startup-block__buttons">
        <U-button
          :button-name="'Details'"
          :button-class="'u-button-gray'"
          :style="
            card.state === 'finished' ||
            allPositionsStaffed ||
            !!(+card.owner.id === +userId) ||
            userAccepted
              ? 'width:100%'
              : ''
          "
          :is-link="'nuxt-link'"
          :href="'/startup/' + card.slug"
        ></U-button>

        <U-button
          v-if="
            !(+card.owner.id === +userId) &&
            !(card.state === 'finished') &&
            !userAccepted &&
            !allPositionsStaffed
          "
          :href="'/startup/apply/' + card.slug"
          :button-name="'Apply'"
          :is-link="'nuxt-link'"
          :button-class="'u-button-blue'"
        ></U-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UButton from "../atoms/uButton.vue";
import { Startup } from "~/models/Startup";
import { Technology } from "~/models/Technology";
@Component({
  components: { UButton },
})
export default class StartupCard extends Vue {
  @Prop() i: number;
  @Prop() card: Startup;
  @Prop() technology: Technology;
  @Prop() userId: Number;
  @Prop({
    default: () => {
      return [];
    },
  })
  waitingFeedback: Startup;

  userStatus = "";
  userAccepted = false;
  allPositionsStaffed = false;
  askFeedbacks = 0;

  async checkAskFeedBack() {
    try {
      const countReqests = await this.$askFeedbacksByStartupId(this.card.id);
      this.askFeedbacks = countReqests.length;
    } catch (e) {
      console.error(e);
    }
  }

  mounted() {
    if (this.waitingFeedback.some((el) => +el.id === +this.card.id)) {
      this.checkAskFeedBack();
    }
    if (this.card.positions.length !== 0 && this.userId !== null) {
      this.card.positions.forEach((item) => {
        if (
          item.applications.length !== 0 &&
          item.applications.some(
            (el) =>
              (el.status === "accepted" || el.status === "advanced") &&
              +el.user.id === +this.userId
          )
        ) {
          this.userAccepted = true;
          this.userStatus = "Member";
        }
        if (
          item.applications.length !== 0 &&
          item.applications.every(
            (el) => el.status === "waiting" && +el.user.id === +this.userId
          )
        ) {
          this.userStatus = "Applied";
        }
        if (
          item.applications.length !== 0 &&
          item.applications.every(
            (el) => el.status === "declined" && +el.user.id === +this.userId
          )
        ) {
          this.userStatus = "Rejected";
        }
      });
    }
    if (this.card.positions.every((el) => el.status === "staffed")) {
      this.allPositionsStaffed = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
