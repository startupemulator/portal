<template>
  <div class="apply-to-team apply-to-team-step2">
    <U-Title :text="'Apply to Startup ' + startup.title"></U-Title>

    <U-Select
      :specialisations="specialisations"
      @choosenSpeciality="choosenSpeciality"
    ></U-Select>
    <p v-show="$v.speciality.$error" class="errorInput select">
      Please choose a specialty
    </p>
    <textarea
      v-model.trim="$v.comment.$model"
      class="apply-to-team__comment"
      placeholder="Comment"
    ></textarea>
    <p v-show="$v.comment.$error" class="errorInput">
      Please enter a comment of at least 10 characters
    </p>
    <div class="apply-to-team__button">
      <U-Button
        :button-class="'u-button-blue'"
        :button-name="'Apply'"
        @clickOnButton="apply"
      ></U-Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { minLength, sameAs, required, not } from "vuelidate/lib/validators";

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
  validations: {
    comment: {
      minLength: minLength(10),
      required,
    },
    speciality: {
      somePosition: not(sameAs("position")),
    },
  },
})
export default class extends Vue {
  @Prop() startup: Array<Startup>;
  @Prop() specialisations: Array<any>;
  comment: string = "";
  position: string = "Select a speciality";
  speciality: String = "Select a speciality";
  choosenSpeciality(data) {
    this.speciality = data;
  }

  apply() {
    this.$v.$touch();
    if (!this.$v.$error) {
      this.$emit("apply", {
        comment: this.comment,
        speciality: this.speciality,
      });
    }
  }
}
</script>
<style lang="scss">
.apply-to-team-step2 {
  .errorInput {
    top: 0;
  }

  .errorInput.select {
    top: 16px;
  }
}
</style>
