<template>
  <div class="signing-up-link-sent popup">
    <div class="signing-up-link-sent__content successfully-sent">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopup')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <u-title :text="'You successfully created your startup'"></u-title>
      <p>
        It’s being pending now. You will receive an email notification when we
        approve your startup and add it to the main list.
      </p>
      <U-button
        :button-name="'Got It'"
        :is-link="'nuxt-link'"
        :href="'/profile/projects'"
        :button-class="'u-button-blue'"
      ></U-button>
    </div>
  </div>
</template>
<script>
import UTitle from "~/components/atoms/uTitle";
import UButton from "~/components/atoms/uButton";
export default {
  components: {
    UButton,
    UTitle,
  },
};
</script>
<style lang="scss" scoped>
.successfully-sent {
  position: relative;
  width: 343px;
  height: 343px;
  display: flex;
  flex-direction: column;
  background: #232b39;
  border-radius: 12px;
  padding: 0 24px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 175px;
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
  margin-left: 0;
  margin-top: 40px;
  margin-bottom: 0;
}

p {
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #fff;
  width: 260px;

  span {
    font-weight: bold;
  }
}

.u-button-blue {
  margin-top: 24px;

  button {
    margin-bottom: 16px;
  }
}
@media (min-width: 1280px) {
  .successfully-sent {
    width: 564px;
    height: 360px;
    padding: 0 48px;
  }

  h2 {
    font-weight: bold;
    font-size: 35px;
    line-height: 40px;
  }

  p {
    font-weight: normal;
    font-size: 17px;
    line-height: 24px;
    width: 100%;

    span {
      font-weight: bold;
    }
  }
}

.createProgect-step4 .signing-up-link-sent .signing-up-link-sent__content {
  min-height: 290px;
}

@media (min-width: 768px) {
  .createProgect-step4 .signing-up-link-sent .signing-up-link-sent__content {
    min-height: 344px;
  }
}
</style>
