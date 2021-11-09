<template>
  <div class="technology-picker">
    <h2>{{ title }}</h2>
    <form>
      <U-Tags
        v-for="technology in estimations"
        :id="technology.id"
        :key="technology.id"
        :title="technology.title"
        :class="+technology.value === +duration ? 'checked' : ''"
        :type="'radio'"
        :name="'duration'"
        @pick="pickDuration(technology.id)"
      >
      </U-Tags>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Estimation } from "../../models/Estimation";
import UTags from "~/components/atoms/uTags.vue";

@Component({
  components: { UTags },
})
export default class extends Vue {
  @Prop({ default: " " }) title: String;
  @Prop() duration: String | Number;
  @Prop() estimations: Array<Estimation>;

  pickDuration(i) {
    this.estimations.forEach((el) => {
      if (i === el.id) {
        this.$emit("clickOnDuration", el);
      }
    });
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
