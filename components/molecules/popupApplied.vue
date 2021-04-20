<template>
  <div class="signing-up-link-sent popup">
    <div class="signing-up-link-sent__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopupLinkSent')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <UTitle :text="'You successfully applied'"></UTitle>
      <p>
        You will receive an email notification when Product owner selects
        developer for a team. Also, you are able to apply to other startups.
      </p>
      <U-button
        :button-name="'Discover More Startups'"
        :button-class="'u-button-blue'"
        :is-link="'nuxt-link'"
        :href="'/startups'"
      ></U-button>
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
.signing-up-link-sent .signing-up-link-sent__content {
  min-height: 312px;
  margin-top: 175px;
}
.signing-up-link-sent p {
  margin-bottom: 24px;
}
@media (min-width: 768px) {
  .signing-up-link-sent .signing-up-link-sent__content {
    min-height: 304px;
    margin-top: 325px;
  }
  .signing-up-link-sent p {
    width: 468px;
  }
}
</style>
