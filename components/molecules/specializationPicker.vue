<template>
  <div class="technology-picker">
    <h2>{{ title }}</h2>
    <form>
      <U-Tags
        v-for="specialisation in specialisations"
        :id="specialisation.id"
        :key="specialisation.id"
        :title="specialisation.title"
        :class="specialisation.checked ? 'checked' : ''"
        :type="'checkbox'"
        :name="'duration'"
        @pick="pickSpecialisation(specialisation.id)"
      >
      </U-Tags>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTags from "~/components/atoms/uTags.vue";
import { Specialisation } from "~/models/Specialisation";

@Component({
  components: { UTags },
})
export default class extends Vue {
  @Prop({ default: " " }) title: String;
  @Prop() specialisations: Array<Specialisation>;
  @Prop() choosenSpecialisation: Array<Specialisation>;

  pickSpecialisation(id) {
    this.$emit("pickSpecialisation", id);
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

.technology-picker .checked {
  background: rgba(89, 102, 126, 1);
}
</style>
