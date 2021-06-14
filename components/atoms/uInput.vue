<template>
  <label class="standard-label">
    <img v-if="img" :src="img" alt="icon" />
    <input
      :class="accountClass"
      :type="showPassword ? type : 'text'"
      :placeholder="placeholder"
      :img="img"
      :value="value"
      class="standard-input"
      @blur="$emit('textInput', $event.target.value)"
    />
    <button
      v-if="btnShowPassword"
      class="btnShowPassword"
      type="button"
      @click="typeToggle"
    >
      <img src="~/assets/img/eye.svg" alt="show password" />
    </button>
    <span v-if="false" class="account-email-empty"
      >Please enter an email address</span
    ></label
  >
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "text",
    },
    type: {
      type: String,
      default: "",
    },
    accountClass: {
      type: [Array, String],
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    btnShowPassword: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return {
      showPassword: true,
    };
  },
  methods: {
    typeToggle() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
<style lang="scss">
.standard-label {
  position: relative;
  img {
    position: absolute;
    top: -2px;
    left: 15px;
  }
  .btnShowPassword {
    position: absolute;
    border: none;
    background-color: transparent;
    left: 290px;
    top: 0;
  }
  .standard-input {
    background: #2e384a;
    border-radius: 12px;
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    color: #fff;
    width: 100%;
    height: 48px;
    padding-left: 56px;
    box-sizing: border-box;
    border: 2px solid transparent;
    transition: 0.3s;

    &::placeholder {
      color: #b5c1d8;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
    }
    &:focus {
      border: 2px solid #b5c1d8;
    }
  }
}
.delete-startup__input .standard-input {
  padding-left: 16px;
}
.standard-label .standard-input.error {
  border: 1px solid #e94646;
}
@media (min-width: 768px) {
  .standard-label {
    img {
      position: absolute;
      top: -2px;
      left: 24px;
    }
    .btnShowPassword {
      left: 590px;
    }
    .standard-input {
      height: 56px;
      padding-left: 64px;
      font-size: 18px;
      line-height: 32px;
      &::placeholder {
        font-size: 18px;
      }
    }
  }
  .update-startup__input .standard-input {
    padding-left: 24px;
  }
}
</style>
