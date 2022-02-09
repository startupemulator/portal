<template>
  <a class="a-link" :href="link">{{ linkName }}</a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class extends Vue {
  @Prop() link: String;
  @Prop() linkName: String;
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.a-link {
  width: 100%;
  height: 48px;
  box-shadow: inset 0 -2px 4px 1px rgba(48, 92, 178, 0.15),
    inset 0 1px 4px rgba(255, 255, 255, 0.15);
  border-width: 1px;
  border-style: solid;
  font-weight: bold;
  font-size: 17px;
  line-height: 32px;
  color: $main-text-color !important;
  transition: 0.3s;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: #404c5f;
  background-color: $button-color-gray;
  margin-bottom: 16px;

  &:hover {
    background-color: $button-color-gray-hover;
  }

  &:focus {
    background-color: $button-color-gray-focus;
    border-width: 2px;
    border-color: #b5c1d8;
  }

  &:active {
    background-color: $button-color-gray-active;
  }
}

@media (min-width: 768px) {
  .a-link {
    height: 56px;
    font-size: 18px;
    width: 318px;
  }
}
</style>
