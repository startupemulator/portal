<template>
  <div class="system-alert">
    <div class="system-alert__left-border"></div>
    <div class="system-alert__message">
      <h3>Something went wrong</h3>
      <p>
        {{ msg }}
        <span v-if="timer"
          >Time is <span>{{ timer }}</span> sec.</span
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class extends Vue {
  @Prop() private msg;
  @Prop() private timer;
}
</script>

<style lang="scss" scoped>
.system-alert {
  position: fixed;
  width: 343px;
  height: 148px;
  right: 16px;
  top: 12px;
  background: #2e384a;
  box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
  border-radius: 12px;
  color: #fff;
  display: flex;
  z-index: 99;
  .system-alert__left-border {
    min-width: 16px;
    height: 148px;
    background: #e94646;
    box-shadow: -4px 0 6px 1px rgba(233, 70, 70, 0.25),
      4px 0 6px 1px rgba(233, 70, 70, 0.25);
    border-radius: 12px 0 0 12px;
  }
  h3 {
    margin-bottom: 10px;
    position: relative;
    padding-left: 56px;
    padding-right: 25px;
    font-weight: bold;
    font-size: 17px;
    line-height: 24px;
    &::before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      background-image: url(../../assets/img/error.svg);
      left: 24px;
    }
  }
  p {
    margin-top: 0;
    padding-left: 56px;
    padding-right: 25px;
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
    color: #b5c1d8;
    span {
      display: block;
    }
    div {
      display: inline;
    }
  }
}
@media (min-width: 768px) {
  .system-alert {
    width: 489px;
    height: 120px;
    right: 32px;
    top: 128px;

    .system-alert__left-border {
      min-width: 16px;
      height: 120px;
    }
    h3 {
      padding-left: 60px;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
    }
    p {
      padding-left: 60px;
      font-weight: 300;
      font-size: 14px;
      line-height: 20px;
      span {
        display: inline;
      }
    }
  }
}
</style>
