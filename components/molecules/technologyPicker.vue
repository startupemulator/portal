<template>
  <div class="technology-picker">
    <h2 class="technology-picker__title">{{ title }}</h2>
    <form ref="technologyList">
      <u-tags
        v-for="item in technologies"
        :id="item.id + '-' + Math.floor(Math.random() * 10000)"
        :key="item.id"
        :title="item.title"
        @pick="pickTechnology($event, item.id, item.title)"
      >
        {{ item.title }}
      </u-tags>
    </form>

    <Add-input
      :placeholder="'Type a technology to add'"
      :length="12"
      :title="false"
      @add="$emit('addTechnologies', $event)"
    ></Add-input>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTags from "../atoms/uTags.vue";
import AddInput from "~/components/atoms/addInput.vue";
import { Technology } from "~/models/Technology";
@Component({
  components: { UTags, AddInput },
})
export default class extends Vue {
  @Prop({ default: " " }) title: String;
  @Prop({ default: true }) addTechnology: Boolean;
  @Prop() technologies: Array<Technology>;
  @Prop() choosenTechnologies: Array<any>;
  chosenTechnology: Array<any>;
  pickTechnology(item, id) {
    const pickeTechnology = item.target.parentNode.classList;
    pickeTechnology.contains("checked")
      ? pickeTechnology.remove("checked")
      : pickeTechnology.add("checked");

    const pickedTechnology = [];
    const pickedTechnologyId = [];
    this.$refs.technologyList.forEach((el) =>
      el.parentElement.classList.contains("checked")
        ? (pickedTechnology.push(el.parentElement.textContent),
          pickedTechnologyId.push(el.id.split("-")[0]))
        : () => {}
    );

    this.$emit("chosenTechnologi", pickedTechnology, pickedTechnologyId);
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

  mounted() {
    if (this.choosenTechnologies) {
      this.$refs.technologyList.forEach((el) => {
        if (
          this.choosenTechnologies.some((item) => item === el.id.split("-")[0])
        ) {
          el.parentElement.classList.add("checked");
        }
      });
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
