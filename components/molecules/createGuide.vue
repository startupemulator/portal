<template>
  <div class="existing-sources">
    <p>{{ name }}</p>
    <div class="existing-sources__link-name">
      <div class="link-name__inputs">
        <U-input :type="'text'" :placeholder="'Enter an item name'"></U-input>
        <textarea
          class="guide-comments"
          placeholder="Enter your comment"
        ></textarea>
      </div>
      <button
        class="button-remove-link"
        type="button"
        @click="$emit('removeGuideSources')"
      >
        <img src="~/assets/img/close.svg" alt="" />
      </button>
    </div>
  </div>
</template>
<script>
import UInput from "../atoms/uInput.vue";

export default {
  components: { UInput },
  props: {
    name: {
      type: String,
      default: "i",
    },
  },
  data() {
    return {
      dd: true,
    };
  },
};
</script>
<style lang="scss">
.existing-sources__link-name {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 340px;
  label {
    width: 100%;
  }
  .button-remove-link {
    position: relative;
    background: transparent;
    margin-left: 10px;
    margin-top: 15px;
    right: -5px;
  }
  .link-name__inputs label {
    margin-bottom: 8px;
    display: inline-block;
    .standart-input {
      padding-left: 16px;
    }
  }
}
.createProject-step4 {
  .standard-label .standard-input {
    padding-left: 16px;
  }
}
.existing-sources {
  .standard-label .standard-input {
    padding-left: 8px;
  }
  textarea {
    background: #2e384a;
    border-radius: 12px;
    width: 343px;
    min-height: 48px;
    padding: 8px 16px;
    box-sizing: border-box;
    color: #fff;
    outline: none;
    font-weight: normal;
    font-size: 16px;
    //   line-height: 32px;
    border: 2px solid transparent;
    &:focus {
      border: 2px solid #b5c1d8;
    }
    &::placeholder {
      color: #b5c1d8;
    }
  }
}

@media (min-width: 768px) {
  .existing-sources__link-name {
    width: 660px;
    label {
      width: 620px;
    }
  }

  .existing-sources {
    textarea {
      width: 620px;
      min-height: 56px;
      font-weight: normal;
      font-size: 18px;
      // line-height: 32px;
    }
    .standard-label .standard-input {
      padding-left: 16px;
    }
  }
}
</style>
