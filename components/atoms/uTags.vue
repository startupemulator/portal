<template>
  <label :for="id" class="tags-item">
    {{ title }}
    <input
      :id="id"
      :type="type"
      :name="name"
      @click.prevent="$emit('pick', $event)"
    />
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class extends Vue {
  @Prop({ default: "title" }) title: string;
  @Prop({ default: "name" }) name: string;
  @Prop({ default: "" }) id: string;
  @Prop({ default: "checkbox" }) type: "checkbox" | "radio";
}
</script>

<style lang="scss">
.tags-item {
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: #fff;
  font-weight: 300;
  font-size: 14px;
  padding: 10px 16px;
  border: 1px solid #59667e;
  box-sizing: border-box;
  border-radius: 32px;
  margin-right: 8px;
  margin-bottom: 14px;
  background: rgba(89, 102, 126, 0);
  transition: 0.2s;
  input {
    position: absolute;
    top: 0;
    left: 22px;
    height: 0;
    width: 0;
    opacity: 0;
  }
}

.checked {
  background: rgba(89, 102, 126, 1);
}
</style>
