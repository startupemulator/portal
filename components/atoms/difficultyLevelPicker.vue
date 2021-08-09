<template>
  <div class="difficulty-level-picker">
    <h5>Difficulty level</h5>
    <ul class="difficulty-level-list">
      <li
        v-for="(item, i) in 5"
        :key="i + 'difficulty'"
        ref="difficultyLevelItem"
        class="difficulty-level-item"
        @click="checkDifficultyLevel($event, i + 1)"
      >
        {{ i + 1 }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class extends Vue {
  @Prop() checkedDifficaltyLevel: string;
  checkDifficultyLevel($event, id) {
    const obj = $event.target.classList;
    this.$refs.difficultyLevelItem.forEach((element) => {
      element.classList.remove("checked");
    });
    obj.contains("checked")
      ? $event.target.classList.remove("checked")
      : $event.target.classList.add("checked");
    this.$emit("difficultyLevelId", id);
  }

  mounted() {
    if (this.checkedDifficaltyLevel !== " ") {
      this.$refs.difficultyLevelItem[
        +this.checkedDifficaltyLevel - 1
      ].classList.add("checked");
    }
  }
}
</script>

<style lang="scss" scoped>
.difficulty-level-picker {
  h5 {
    font-weight: 500;
    font-size: 17px;
    line-height: 32px;
    margin: 0;
  }
  .difficulty-level-list {
    padding: 0;
    display: flex;
  }
  .difficulty-level-item {
    border: 1px solid #59667e;
    box-sizing: border-box;
    font-weight: normal;
    font-size: 14px;
    line-height: 38px;
    width: 132px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    &:first-child {
      border-radius: 16px 0 0 16px;
    }
    &:last-child {
      border-radius: 0 16px 16px 0;
    }
    &.checked {
      background: #59667e;
      border: 1px solid #8c97ac;
    }
  }
}
</style>
