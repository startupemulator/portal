<template>
  <div class="technology-picker">
    <h2 class="technology-picker__title">{{ title }}</h2>
    <form ref="technologyList">
      <U-Tags
        v-for="item in technologies"
        :id="`${item.id}-used_technology-${uniqueId}`"
        :key="item.id"
        :title="item.title"
        :class="item.checked ? 'checked' : ''"
        :is-checked="item.checked"
        @pick="pickTechnology($event.target, item.id, item.title)"
      >
        {{ item.title }}
      </U-Tags>
    </form>
    <Add-Input
      v-if="addTechnology"
      :placeholder="'Type a technology to add'"
      :length="12"
      :before-created-technologies="choosenTechnologies"
      :title="false"
      @add="$emit('addTechnologies', $event)"
      @removeTechnology="$emit('removeTechnology', $event)"
    ></Add-Input>
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
  @Prop() uniqueId: string;

  pickTechnology(item, id) {
    this.$emit("chosenTechnologi", { item, id });
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

.technology-picker .checked {
  background: #59667e;
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
