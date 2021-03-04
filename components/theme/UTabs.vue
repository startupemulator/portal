<template>
  <div class="u-tabs">
    <button
      type="button"
      :class="openPosition ? 'active-button' : ''"
      @click="activateButton"
    >
      Open positions
    </button>
    <button
      type="button"
      class="u-tabs-message"
      :class="fullyStarted ? 'active-button' : ''"
      @click="activateButton"
    >
      Fully staffed
      <div class="startup-card__started--messege">
        <span>99</span>
      </div>
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openPosition: true,
      fullyStarted: false,
    };
  },
  methods: {
    activateButton() {
      this.openPosition = !this.openPosition;
      this.fullyStarted = !this.fullyStarted;
    },
  },
};
</script>
<style lang="scss" scoped>
.u-tabs {
  margin-top: 32px;
  width: 248px;
  height: 56px;
  box-sizing: border-box;
  background: #232b39;
  box-shadow: inset 0 -2px 14px 1px rgba(26, 34, 47, 0.1),
    inset 0 1px 14px rgba(23, 29, 39, 0.3);
  border-radius: 12px;
  padding: 8px;
  border: 1px solid #2c3b56;
  justify-content: space-between;
  display: flex;

  button {
    font-weight: 500;
    font-size: 14px;
    line-height: 32px;
    box-sizing: border-box;
    background: transparent;
    color: #8c97ac;
    padding: 2px 10px;
    border-radius: 8px;
    transition: 0.2s;
  }
  button.active-button {
    color: #fff;
    background: #19adc7;
    padding: 4px 12px;
    box-shadow: inset 0 -2px 4px 1px #38a4b7,
      inset 0 1px 4px rgba(255, 255, 255, 0.3);
  }
}
@media (min-width: 768px) {
  .u-tabs {
    width: 332px;
    height: 72px;
    padding: 12px;
    margin-top: 28px;
    button {
      height: 48px;
      font-size: 17px;
      line-height: 32px;
      padding: 8px 10px;
    }
    button.active-button {
      color: #fff;
      background: #19adc7;
      padding: 8px 24px;
      box-shadow: inset 0 -2px 4px 1px #38a4b7,
        inset 0 1px 4px rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
