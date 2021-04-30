<template>
  <div class="technology-picker">
    <h2>{{ title }}</h2>
    <form ref="utags">
      <uTags
        v-for="technology in experiences"
        :id="technology.id"
        :key="technology.id"
        :title="technology.title"
        :checked-class="technology.checked ? 'checked' : ''"
        :type="'radio'"
        :name="'duration'"
        @pick="pickTechnologi(technology.id)"
      >
      </uTags>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import uTags from "~/components/atoms/uTags.vue";
import { Experience } from "~/models/Experience";

@Component({
  components: { uTags },
})
export default class extends Vue {
  @Prop({ default: " " }) title: String;
  @Prop() duration: Number;
  @Prop() experiences: Array<Experience>;

  pickTechnologi(i) {
    this.experiences.forEach((el) => {
      if (i === el.id) {
        this.$refs.utags.children.forEach((element, i) => {
          element.classList.remove("checked");
          if (i + 1 === el.id) {
            element.classList.add("checked");
          }
        });
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
