<template>
  <div class="signing-up-link-sent popup">
    <div class="signing-up-link-sent__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="redirectToStartups"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <U-Title :text="'You successfully register'"></U-Title>
      <p>Please confirm your email</p>
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
export default class extends Vue {
  redirectToStartups() {
    this.$router.push("/startups");
  }
}
</script>
<style scoped>
.signing-up-link-sent .signing-up-link-sent__content {
  height: 250px;
  margin: 0 auto;
  margin-top: 175px;
}

.signing-up-link-sent p {
  margin-bottom: 24px;
}
@media (min-width: 768px) {
  .signing-up-link-sent .signing-up-link-sent__content {
    margin-top: 325px;
  }

  .signing-up-link-sent p {
    width: 468px;
  }
}
</style>
