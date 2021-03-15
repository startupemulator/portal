<template>
  <div class="badge-popup">
    <div class="badge-popup__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopup')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <img
        class="content__profile-image"
        src="~/assets/img/profile-image.svg"
        alt="profile-image"
      />
      <h2>Super boost</h2>
      <p>Startup #1</p>
      <div class="badge-popup__content-data">
        <div class="badge-popup__content-date">
          <span>Date</span>
          <div>29 Nov 2020</div>
        </div>
        <div class="badge-popup__content-form">
          <span>From</span>
          <div>Expert’s Full Name</div>
        </div>
      </div>
      <div class="badge-popup__content-message">
        <img src="~/assets/img/feedback.svg" alt="feedback" />
        <span
          >Some comment and feedback that this expert left with this bage,
          probably in a few lines. Some comment and feedback that this expert
          left with this bage, probably in a few lines.</span
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "nuxt-property-decorator";

export default class extends Vue {}
</script>
<style lang="scss" scoped>
.badge-popup {
  width: 100vw;
  height: 100vh;
  background: rgba(59, 70, 90, 0.6);
  backdrop-filter: blur(16px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  padding-top: 59px;
  color: #fff;
}
.badge-popup__content {
  position: relative;
  width: 343px;
  margin: 0 auto;
  background: #232b39;
  border-radius: 12px;
  padding: 16px 16px 32px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .sign-up-link__close {
    position: absolute;
    right: 10px;
    background: none;
  }
  .content__profile-image {
    width: 192px;
    height: 192px;
    margin-top: 25px;
    text-align: center;
    display: inline-block;
  }
  h2 {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    margin: 0;
    margin-top: 22px;
    text-align: center;
  }
  p {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    margin-top: 0;
  }
  .badge-popup__content-data {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    margin-left: 52px;
    margin-right: 52px;
    .badge-popup__content-date {
      min-width: 90px;
      margin-right: 40px;
    }
    .badge-popup__content-form {
      min-width: 90px;
    }

    span {
      color: #8c97ac;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
    }
    div {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .badge-popup__content-message {
    background: #2e384a;
    border-radius: 12px;
    padding: 24px;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    margin-top: 24px;
    width: 295px;

    img {
      margin-right: 24px;
    }
  }
}
@media (min-width: 768px) {
  .badge-popup {
    padding-top: 146px;
    .badge-popup__content {
      padding: 24px 24px 48px 24px;
      width: 564px;
      .sign-up-link__close {
        right: 18px;
        top: 22px;
      }
      .content__profile-image {
        margin-top: 22px;
      }
      h2 {
        font-weight: bold;
        font-size: 35px;
        line-height: 40px;
        margin-top: 24px;
      }
      p {
        font-weight: 500;
        font-size: 17px;
        line-height: 24px;
        margin-top: 12px;
      }
      .badge-popup__content-data {
        margin-top: 6px;
        margin-left: 120px;
        margin-right: 120px;
        .badge-popup__content-date {
          min-width: 87px;
          margin-right: 64px;
        }
        span {
          font-size: 14px;
          line-height: 24px;
        }
        div {
          font-size: 14px;
          line-height: 24px;
        }
      }
    }
    .badge-popup__content-message {
      width: 468px;
    }
  }
}
</style>
