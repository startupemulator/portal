<template>
  <div class="signing-up-link-sent">
    <div class="signing-up-link-sent__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopupLinkSent')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <u-title :text="'Signing up link was sent'"></u-title>
      <p>
        Signing up link was sent to your email.
        <span>Follow the link to create an account</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.signing-up-link-sent {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(59, 70, 90, 0.6);
  backdrop-filter: blur(16px);
  display: flex;
  justify-content: center;
  z-index: 5;
  .signing-up-link-sent__content {
    position: relative;
    width: 343px;
    height: 196px;
    display: flex;
    flex-direction: column;
    background: #232b39;
    border-radius: 12px;
    padding: 0 24px;
    box-sizing: border-box;
    margin-top: 262px;
  }
  .sign-up-link__close {
    position: absolute;
    right: 10px;
    top: 16px;
    background-color: transparent;
  }
  h2 {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    margin-top: 40px;
    margin-bottom: 0;
  }
  p {
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    color: #fff;
    width: 295px;
  }
}
@media (min-width: 768px) {
  .signing-up-link-sent {
    .signing-up-link-sent__content {
      position: relative;
      width: 564px;
      height: 200px;
      padding: 0 48px;
      margin-top: 332px;
    }
    .sign-up-link__close {
      right: 18px;
      top: 22px;
    }
    h2 {
      font-weight: bold;
      font-size: 35px;
      line-height: 40px;
      margin: 0;
      margin-top: 46px;
    }
    p {
      font-weight: 300;
      font-size: 17px;
      line-height: 24px;
      width: 428px;
    }
  }
}
</style>
