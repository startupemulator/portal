<template>
  <div class="guide-popup">
    <div class="guide-popup__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopup')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <u-title :text="'Guide'"></u-title>

      <h4>GitHub</h4>
      <p>Login: <span>startup</span></p>
      <p>Password: <span>12345678</span></p>
      <div class="slack">Slack</div>
      <a target="_blank" href="startup1.slack.com">startup1.slack.com</a>
    </div>
  </div>
</template>
<script>
import UTitle from "../atoms/uTitle.vue";
export default {
  components: { UTitle },
};
</script>

<style lang="scss" scoped>
.guide-popup {
  position: fixed;
  background: rgba(59, 70, 90, 0.6);
  backdrop-filter: blur(16px);
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 6;
  display: flex;
  align-items: flex-end;
  .guide-popup__content {
    position: relative;
    padding: 16px 24px 64px 24px;
    width: 100%;
    height: 430px;
    box-sizing: border-box;
    background: #232b39;
    border-radius: 12px;
    .sign-up-link__close {
      position: absolute;
      right: 10px;
      top: 16px;
      background: transparent;
    }
    h2 {
      font-weight: bold;
      font-size: 26px;
      line-height: 32px;
      margin-bottom: 16px;
    }
    h4 {
      font-weight: 600;
      font-size: 17px;
      line-height: 32px;
      margin-top: 0;
      margin-bottom: 4px;
    }
    p {
      margin: 0;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
    }
    .slack {
      margin-top: 20px;
    }
    a {
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      color: #fff !important;
      display: inline-block;
      margin-top: 16px;
    }
  }
}
@media (min-width: 1440px) {
  .guide-popup {
    align-items: center;
    justify-content: center;
    .guide-popup__content {
      width: 564px;
      height: auto;
      padding: 48px 48px 48px 48px;
      h2 {
        font-weight: bold;
        font-size: 35px;
        line-height: 40px;
        margin-top: 0;
      }
      h4 {
        font-weight: 600;
        font-size: 18px;
        line-height: 32px;
      }
      p {
        font-weight: normal;
        font-size: 17px;
        line-height: 24px;
      }
      .slack {
        font-weight: 600;
        font-size: 18px;
        line-height: 32px;
      }
      a {
        font-weight: normal;
        font-size: 17px;
        line-height: 24px;
      }
    }
  }
}
</style>
