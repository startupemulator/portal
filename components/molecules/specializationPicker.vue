<template>
  <div class="technology-picker">
    <h2>{{ title }}</h2>
    <form ref="specialisations">
      <uTags
        v-for="specialisation in specialisations"
        :id="specialisation.id"
        :key="specialisation.id"
        :title="specialisation.title"
        :checked-class="specialisation.checked ? 'checked' : ''"
        :type="'checkbox'"
        :name="'duration'"
        @pick="pickSpecialisation(specialisation.id)"
      >
      </uTags>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import uTags from "~/components/atoms/uTags.vue";
import { Specialisation } from "~/models/Specialisation";

@Component({
  components: { uTags },
})
export default class extends Vue {
  @Prop({ default: " " }) title: String;
  @Prop() specialisations: Array<Specialisation>;
  @Prop() choosenSpecialisation: Array<Specialisation>;

  pickSpecialisation(i) {
    this.specialisations.forEach((el) => {
      if (i === el.id) {
        this.$refs.specialisations.children.forEach((element, i) => {
          if (+i + 1 === +el.id) {
            element.classList.toggle("checked");
          }
        });

        this.$emit("pickSpecialisation", el);
      }
    });
  }

  mounted() {
    if (this.choosenSpecialisation !== null) {
      this.choosenSpecialisation.forEach((el) => {
        this.pickSpecialisation(el.id);
      });
    }
  }
}
</script>
<style lang="scss">
.technology-picker h2 {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 13px;
}
</style>
