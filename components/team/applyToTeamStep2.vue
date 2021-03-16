<template>
  <div class="apply-to-team apply-to-team-step2">
    <U-title :text="'Apply to Startup ' + startup.title"></U-title>
    <U-select></U-select>
    <textarea class="apply-to-team__comment" placeholder="Comment"></textarea>
    <div class="apply-to-team__button">
      <U-button
        :button-class="'u-button-blue'"
        :button-name="'Apply'"
        @clickOnButton="$emit('popupApplied')"
      ></U-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import USelect from "../atoms/uSelect.vue";
import UButton from "../atoms/uButton.vue";
import UTitle from "../atoms/uTitle.vue";
import { Startup } from "../../models/Startup";

@Component({
  components: {
    UTitle,
    UButton,
    USelect,
  },
})
export default class extends Vue {
  @Prop() startup: Startup = {};
}
</script>
