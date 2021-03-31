<template>
  <div class="challenge-task">
    <UBack :link="'/challenges'" :title="'Challenges'"></UBack>
    <UTitle :text="'Task name'"></UTitle>
    <div class="challenge-task__menu">
      <ul class="challenge-task__menu-list">
        <li
          class="challenge-task__menu-item"
          @click="$emit('clickOnMenuButton')"
        >
          <span>Edit Challenge </span>
          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </li>
      </ul>
    </div>
    <Utag :title="'UI/UX Designer'"></Utag>
    <Utag :title="'Front-end Developer'"></Utag>

    <p>
      The goal is to implement Learning Management Portal - a portal for
      managing the educational process and teaching materials as part of the
      university curriculum. Our purposes are remove the manual work of the
      teacher; combine online learning tools in one tool; give students easy
      access to materials; simplify the implementation and validation of
      practical tasks; open access to current ratings.
    </p>
    <U-button
      :button-name="'Take Part'"
      :button-class="'u-button-blue challenge-task--button'"
    ></U-button>
    <Sources :finished="true"></Sources>
    <div class="previos-participants">
      <h3>Previous participants <span>2</span></h3>
      <div class="previos-participants__content">
        <div class="challenge-task__participants">
          <div class="participants">
            <span>Full Name</span>
            <p>27 Sep 2020</p>
          </div>
          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </div>
      </div>
      <div class="previos-participants__content">
        <div class="challenge-task__participants">
          <div class="participants">
            <span>Name Surname</span>
            <p>27 Sep 2020</p>
          </div>
          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Utag from "~/components/atoms/uTags.vue";
import UButton from "~/components/atoms/uButton.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import Sources from "~/components/molecules/sources.vue";

@Component({
  components: { UButton, UBack, UTitle, Utag, Sources },
})
export default class extends Vue {}
</script>

<style lang="scss">
.challenge-task {
  color: #fff;
  .startup-card__sources {
    margin-top: 36px;
  }
  .previos-participants {
    .previos-participants__content {
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 16px;
    }
    h3 {
      font-weight: bold;
      font-size: 26px;
      line-height: 32px;
      display: flex;
      align-items: center;
      span {
        width: 24px;
        height: 24px;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        background: #59667e;
        border-radius: 14px;
        margin-left: 8px;
        text-align: center;
      }
    }
    .challenge-task__participants {
      display: flex;
      padding: 16px 16px 16px 24px;
      background: #2e384a;
      box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
      border-radius: 12px;
      height: 88px;
      align-items: center;
      box-sizing: border-box;
      span {
        font-weight: normal;
        font-size: 17px;
        line-height: 32px;
      }
      p {
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: #8c97ac;
        margin: 0;
      }
      img {
        width: 16px;
        margin-left: 24px;
        cursor: pointer;
      }
    }
  }
  .challenge-task__menu {
    background: #2e384a;
    box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
    border-radius: 12px;
    position: relative;
    width: 318px;
    box-sizing: border-box;
    padding: 0 8px;
    margin-bottom: 16px;
    .challenge-task__menu-list {
      margin: 0;
      padding: 8px 0;
    }
    .challenge-task__menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
@media (min-width: 768px) {
  .challenge-task {
    .u-button.challenge-task--button {
      width: 195px;
      height: 56px;
    }
    .challenge-task__menu {
      position: absolute;
      right: 30px;
      top: 216px;
    }
  }
}
</style>
