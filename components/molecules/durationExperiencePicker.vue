<template>
  <div class="technology-picker">
    <h2>{{ title }}</h2>
    <form>
      <U-Tags
        v-for="experience in experiences"
        :id="experience.id"
        :key="experience.id"
        :title="experience.title"
        :class="experience.id === checkedExperience ? 'checked' : ''"
        :type="'radio'"
        :name="'duration'"
        @pick="pickTechnology(experience.id)"
      >
      </U-Tags>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTags from "~/components/atoms/uTags.vue";
import { Experience } from "~/models/Experience";

@Component({
  components: { UTags },
})
export default class extends Vue {
  @Prop({ default: " " }) title: String;
  @Prop() duration: Number;
  @Prop() experiences: Array<Experience>;
  checkedExperience: Number = 0;
  pickTechnology(id) {
    this.checkedExperience = id;
    this.$emit("clickOnDuration", id);
  }

  mounted() {
    if (this.duration) {
      this.checkedExperience = this.duration;
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
