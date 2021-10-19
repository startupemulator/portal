<template>
  <div class="existing-sources">
    <p>{{ name }}</p>
    <div class="existing-sources__link-name">
      <div class="link-name__inputs">
        <UInput
          :type="'text'"
          :placeholder="'Enter an item name'"
          :value="guideName"
          @textInput="$emit('textInput', [$event, 'name'])"
        ></UInput>
        <textarea
          class="guide-comments"
          placeholder="Enter your comment"
          :value="guideComment"
          @blur="$emit('textInput', [$event.target.value, 'comment'])"
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

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import UInput from "~/components/atoms/uInput.vue";

@Component({
  components: {
    UInput,
  },
})
export default class extends Vue {
  @Prop({ default: "i" }) name: String;
  @Prop() guideName: String;
  @Prop() guideComment: String;
}
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
