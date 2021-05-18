<template>
  <div class="u-tab">
    <ul class="u-tab-list">
      <li v-for="button in tabs" :key="button.id" class="u-tabs">
        <button
          type="button"
          class="u-tabs-message"
          :class="button.active ? 'active-button' : ''"
          @click="activateButton(button.id)"
        >
          {{ button.title }}
          <div
            :class="
              button.message
                ? 'startup-card__started--messege'
                : 'tartup-card__started--disable'
            "
          >
            <span>{{ button.messageLenght }}</span>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    longTabs: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tabs: [
        {
          id: 0,
          title: "Open positions",
          active: false,
          message: false,
          messageLenght: 0,
        },
        {
          id: 1,
          title: "Fully staffed",
          active: true,
          message: true,
          messageLenght: 23,
        },
      ],
    };
  },
  methods: {
    activateButton(id) {
      this.tabs.forEach((tab) => {
        tab.id !== id ? (tab.active = false) : (tab.active = true);
      });
      this.$emit("activateButton", id);
    },
  },
};
</script>
<style lang="scss" scoped>
.u-tab {
  margin-top: 32px;
  background: #232b39;
  box-shadow: inset 0 -2px 14px 1px rgba(26, 34, 47, 0.1),
    inset 0 1px 14px rgba(23, 29, 39, 0.3);
  border-radius: 12px;
  border: 1px solid #2c3b56;
  box-sizing: border-box;
  display: inline-block;
}
.u-tab-list {
  display: flex;
  margin: 0;
  padding: 8px;
  border-radius: 12px;
  box-sizing: border-box;
}
.u-tabs {
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
  .u-tabs-message {
    display: flex;
    align-items: center;
  }

  .tartup-card__started--disable {
    display: none;
  }
  .startup-card__started--messege {
    box-shadow: 0 -2px 8px rgba(234, 244, 44, 0.3),
      0 2px 8px rgba(234, 244, 44, 0.3),
      inset 0 -2px 4px 1px rgba(117, 122, 14, 0.15),
      inset 0 1px 4px rgba(255, 255, 255, 0.15);
    border-radius: 14px;
    background: #eaf42c;
    width: 24px;
    height: 24px;
    margin-left: 8px;
    margin-top: 0;
    display: flex;
    justify-content: center;
    span {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #4e5a71;
      margin-bottom: 4px;
    }
  }
}
@media (min-width: 768px) {
  .u-tab {
    margin-top: 48px;
    .u-tab-list {
      padding: 12px;
    }
  }
  .u-tabs {
    button {
      padding: 8px 17px;
      font-weight: 500;
      font-size: 17px;
      line-height: 32px;
    }
    button.active-button {
      padding: 8px 24px;
    }
  }
}
</style>
