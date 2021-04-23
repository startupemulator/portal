<template>
  <div class="technology-picker">
    <h2>{{ title }}</h2>
    <form>
      <uTags
        v-for="technology in technologies"
        :id="technology.id"
        :key="technology.id"
        :title="technology.title"
        :checked-class="technology.checked ? 'checked' : ''"
        :type="'radio'"
        :name="'duration'"
        @pick="pickTechnologi($event, technology.id)"
      >
        {{ technology.title }}
      </uTags>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import uTags from "~/components/atoms/uTags.vue";
@Component({
  components: { uTags },
})
export default class extends Vue {
  @Prop({ default: " " }) title: String;
  @Prop() duration: String;
  technologies: Array<any> = [
    { id: 1, checked: false, title: "1–2 days" },
    { id: 2, checked: false, title: "1 week" },
    { id: 3, checked: false, title: "Up to 2 weeks" },
    { id: 4, checked: false, title: "Up to 1 month" },
    { id: 5, checked: false, title: "More than 1 month" },
  ];

  pickTechnologi(item, i) {
    this.$emit("aeb");
    this.technologies.forEach((el) => {
      if (i === el.id) {
        el.checked = !el.checked;
        this.$emit("clickOnDuration", el);
      } else if (i !== el.id) {
        el.checked = false;
      }
    });
  }

  mounted() {
    if (this.duration) {
      this.technologies.forEach((el) =>
        el.title === this.duration ? (el.checked = true) : (el.checked = false)
      );
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
