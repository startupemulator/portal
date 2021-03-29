<template>
  <div class="challenge-task">
    <UBack :link="'/challenges'"></UBack>
    <div class="challenge-task__header">
      <UTitle :text="'Task Name'"></UTitle>
      <div
        class="challenge-task__header__startup-state"
        :class="isStarted ? 'in_progress' : finished ? 'finished' : ''"
      >
        In progress
      </div>
    </div>

    <UTags
      v-for="(item, i) in 2"
      :key="i"
      :title="i < 1 ? 'UI/UX Designer' : 'Front-end Developer'"
    ></UTags>

    <div v-if="isStarted" class="startup-card__started-start-time">
      <div class="started-start-time__finished">
        <h3>Started</h3>
        <p>27 Sep 2020</p>
      </div>
      <div class="started-start-time__duration">
        <h3>Estimation</h3>
        <p>3 months</p>
      </div>
    </div>
    <ul class="challenge-task__header-menu-list">
      <li class="challenge-task__header-menu-item">
        <button>
          <span>Get Feedback</span>
          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </button>
      </li>
      <li class="challenge-task__header-menu-item">
        <button>
          <span>Cancel Participation</span>
          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </button>
      </li>
    </ul>
    <p>
      The goal is to implement Learning Management Portal - a portal for
      managing the educational process and teaching materials as part of the
      university curriculum. Our purposes are remove the manual work of the
      teacher; combine online learning tools in one tool; give students easy
      access to materials; simplify the implementation and validation of
      practical tasks; open access to current ratings.
    </p>
    <div v-if="!isStarted" class="challenge-task__button">
      <U-button
        :button-name="'Take Part'"
        :button-class="'u-button-blue '"
      ></U-button>
    </div>

    <Sources :finished="true"></Sources>
    <Practicipants
      @clickOnButton="$emit('openParticipantSolution')"
    ></Practicipants>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import Sources from "~/components/molecules/sources.vue";
import Practicipants from "~/components/molecules/practicipants.vue";
import UTags from "~/components/atoms/uTags.vue";

@Component({
  components: { UButton, UTitle, UBack, Sources, Practicipants, UTags },
})
export default class extends Vue {
  @Prop() isStarted: Boolean;
}
</script>
<style lang="scss">
.challenge-task {
  margin-top: 40px;
  max-width: 831px;
  padding: 0 16px;
  .challenge-task__header {
    display: flex;
    align-items: center;
    h2 {
      margin-left: 0;
      margin-bottom: 12px;
    }
    .challenge-task__header__startup-state {
      margin-left: 16px;
      padding: 2px 12px;
      margin-top: 4px;
      &.in_progress {
        background: #3cc28d;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        box-shadow: 0 -2px 8px rgba(60, 194, 141, 0.3),
          0 2px 8px rgba(60, 194, 141, 0.3);
        border-radius: 14px;
      }
    }
  }
  .startup-card__started-start-time {
    display: flex;
    margin-bottom: 32px;
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

  p {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .challenge-task__button {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 16px 16px 28px 16px;
    background: #232b39;
    border: 1px solid #3b465a;
    box-shadow: inset 0 0 10px 2px #262f3f;
    border-radius: 16px 16px 0 0;
    box-sizing: border-box;
    width: 100%;
    display: flex;
  }
  .startup-card__sources h3 {
    margin-bottom: 16px;
  }
  .challenge-task__header-menu-list {
    background: #2e384a;
    box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
    border-radius: 12px;
    margin: 0;
    padding: 0;
    padding-top: 8px;
    padding-bottom: 8px;

    button {
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-weight: 500;
      font-size: 17px;
      line-height: 32px;
      padding: 8px 24px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
@media (min-width: 768px) {
  .challenge-task {
    padding: 0;
    margin-top: 48px;
    margin-left: 48px;
    .challenge-task__header {
      .challenge-task__header__startup-state {
        margin-top: 36px;
      }
    }
    h2 {
      margin-bottom: 24px;
    }
    p {
      font-size: 17px;
      line-height: 24px;
      margin-top: 40px;
      margin-bottom: 60px;
      max-width: 660px;
    }

    .challenge-task__button {
      position: static;
      border: none;
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 32px 0 16px 0;
      width: 195px;
      box-sizing: border-box;
      margin-top: 0;
    }
    .startup-card__started-start-time {
      .started-start-time__finished,
      .started-start-time__duration {
        width: 135px;
        margin-top: 14px;
      }
    }
    .challenge-task__header-menu-list {
      position: absolute;
      right: 30px;
      top: 216px;
      width: 318px;
      button {
        padding: 12px 24px;
      }
    }
  }
}
</style>
