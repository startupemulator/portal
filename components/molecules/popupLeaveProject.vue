<template>
  <div class="leave-project signing-up-link-sent popup">
    <div class="signing-up-link-sent__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopupLeaveproject')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <U-Title :text="'Do you really want to leave this project?'"></U-Title>

      <div class="leave-project__buttons">
        <U-Button
          :button-name="'Yes confirm'"
          :button-class="'u-button-blue'"
          @clickOnButton="$emit('leveProject')"
        ></U-Button>
        <U-button
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
          @clickOnButton="$emit('closePopupLeaveproject')"
        ></U-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import UButton from "../atoms/uButton.vue";
import UTitle from "../atoms/uTitle.vue";

@Component({
  components: {
    UButton,
    UTitle,
  },
})
export default class extends Vue {}
</script>
<style scoped>
.leave-project .signing-up-link-sent .signing-up-link-sent__content {
  min-height: 112px;
  margin-top: 175px;
}

.signing-up-link-sent p {
  margin-bottom: 24px;
}

.leave-project__buttons {
  margin-top: 24px;
}

.leave-project__buttons button {
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  .leave-project.signing-up-link-sent .signing-up-link-sent__content {
    min-height: 250px;
    margin-top: 325px;
  }

  .signing-up-link-sent p {
    width: 468px;
  }

  .leave-project__buttons {
    display: flex;
  }

  .leave-project__buttons .u-button-gray {
    margin-left: 24px;
  }
}
</style>
