<template>
  <div class="technology-picker">
    <h2 class="technology-picker__title">{{ title }}</h2>
    <form ref="technologyList">
      <u-tags
        v-for="item in technologies"
        :id="Math.floor(Math.random() * 10000)"
        :key="item.id"
        :title="item.title"
        @pick="pickTechnology($event, item.id, item.title)"
      >
        {{ item.title }}
      </u-tags>
    </form>
    <input
      v-if="addTechnology"
      class="input-technology"
      type="text"
      placeholder="Type a technology to add"
      @keydown="inputTechnology($event)"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTags from "../atoms/uTags.vue";
import { Technology } from "~/models/Technology";
@Component({
  components: { UTags },
})
export default class extends Vue {
  @Prop({ default: " " }) title: String;
  @Prop({ default: true }) addTechnology: Boolean;
  @Prop() technologies: Array<Technology>;
  chosenTechnology: Array<any>;
  pickTechnology(item, i, title) {
    const pickeTechnology = item.target.parentNode.classList;
    pickeTechnology.contains("checked")
      ? pickeTechnology.remove("checked")
      : pickeTechnology.add("checked");

    const pickedTechnology = [];
    this.$refs.technologyList.forEach((el) =>
      el.parentElement.classList.contains("checked")
        ? pickedTechnology.push(el.parentElement.textContent)
        : () => {}
    );

    this.$emit("chosenTechnologi", pickedTechnology);
  }

  inputTechnology(e) {
    const value = e.target.value.trim();
    if ((e.keyCode === 13) & (value.length > 2)) {
      this.technologies.push({
        id: this.technologies.length + 1,
        title: value,
      });
      e.target.value = "";
    }
  }
}
</script>
<style lang="scss">
.input-technology {
  width: 340px;
  height: 48px;
  background: #2e384a;
  color: #fff;
  border-radius: 12px;
  border: 2px solid transparent;
  padding: 8px 16px;
  box-sizing: border-box;
  &::placeholder {
    color: #b5c1d8;
  }
  &:focus {
    border: 2px solid #b5c1d8;
  }
}
.technology-picker__title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: -5px;
  margin-bottom: 14px;
}
@media (min-width: 768px) {
  .input-technology {
    width: 660px;
    height: 56px;
  }
  .technology-picker__title {
    font-size: 17px;
    line-height: 32px;
    margin-top: -3px;
    margin-bottom: 14px;
  }
}
</style>
