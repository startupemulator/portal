<template>
  <div class="empty-state">
    <p>Looks like there are no relevant projects for these filters</p>
    <div>
      <U-Button
        type="button"
        :button-name="'Reset All Filters'"
        class="u-button-gray"
        @clickOnButton="$emit('clickOnButton')"
      ></U-Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import UButton from "../atoms/uButton.vue";

@Component({
  components: { UButton },
})
export default class extends Vue {}
</script>
<style lang="scss">
.empty-state p {
  text-align: center;
}
@media (min-width: 768px) {
  .empty-state {
    margin: 0 auto;
    width: 448px;

    div {
      margin: 0 auto;
      width: 178px;

      .u-button {
        height: 48px;
      }
    }
  }
}
</style>
