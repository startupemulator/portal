<template>
  <div class="apply-to-team apply-to-team-step2">
    <UTitle :text="'Apply to Startup ' + startup.title"></UTitle>

    <USelect
      :specialisations="specialisations"
      @choosenSpeciality="choosenSpeciality"
    ></USelect>
    <textarea
      v-model="comment"
      class="apply-to-team__comment"
      placeholder="Comment"
    ></textarea>
    <div class="apply-to-team__button">
      <U-button
        :button-class="'u-button-blue'"
        :button-name="'Apply'"
        @clickOnButton="apply"
      ></U-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import USelect from "~/components/atoms/uSelect.vue";
import UButton from "~/components/atoms/uButton.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Startup } from "~/models/Startup";
@Component({
  components: {
    UTitle,
    UButton,
    USelect,
  },
})
export default class extends Vue {
  @Prop() startup: Array<Startup>;
  @Prop() specialisations: Array<any>;
  comment: string = "";
  speciality: String = "";
  choosenSpeciality(data) {
    this.speciality = data;
  }

  apply() {
    this.$emit("apply", [this.comment, this.speciality]);
  }
}
</script>
