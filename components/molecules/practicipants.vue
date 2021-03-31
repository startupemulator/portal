<template>
  <div class="practicipants">
    <div class="practicipants-header">
      <h4>Previous participants</h4>
      <span>2</span>
    </div>
    <ul class="practicipants-list">
      <li v-for="(item, i) in 6" :key="i" class="practicipants-item">
        <div class="practicipants-item__data">
          <span class="practicipants-item__name">Full Name</span>
          <p class="practicipants-item__date">27 Sep 2020</p>
        </div>

        <div class="practicipants-item__button">
          <U-button
            :button-name="'See Solution'"
            :button-class="'u-button-transpend'"
            @clickOnButton="$emit('clickOnButton')"
          ></U-button>
          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";
@Component({ components: { UButton } })
export default class extends Vue {}
</script>
<style lang="scss" scoped>
.practicipants {
  .practicipants-header {
    display: flex;
    align-items: center;
    h4 {
      font-weight: bold;
      font-size: 26px;
      line-height: 32px;
      margin-top: 10px;
      margin-bottom: 0;
    }
    span {
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
      color: #fff;
      background: #59667e;
      border-radius: 14px;
      width: 24px;
      height: 24px;
      text-align: center;
      margin-left: 8px;
    }
  }
  .practicipants-list {
    margin: 0;
    padding: 0;

    .practicipants-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #4e5a71;
      padding-bottom: 19px;
      margin-top: 20px;

      span {
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
      }
      p {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #8c97ac;
        margin: 0;
        margin-top: 4px;
      }
    }
    .practicipants-item__button {
      display: flex;
      align-items: center;
      margin-right: 3px;
      width: 140px;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}
@media (min-width: 768px) {
  .practicipants {
    margin-top: 24px;
    .practicipants-header {
      h4 {
        font-weight: 600;
        font-size: 35px;
        line-height: 40px;
      }
      span {
        margin-top: 24px;
        margin-left: 12px;
      }
    }
    .practicipants-list {
      .practicipants-item {
        padding-bottom: 16px;
        padding-top: 16px;
        margin-top: 0;
        box-sizing: border-box;
      }
    }

    .practicipants-item__data {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 515px;
    }
  }
}
</style>
