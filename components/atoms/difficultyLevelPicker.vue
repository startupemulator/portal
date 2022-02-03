<template>
  <div class="difficulty-level-picker">
    <h5>Difficulty level</h5>
    <ul class="difficulty-level-list">
      <li
        v-for="(item, i) in difficultyLevel"
        :key="i + 'difficulty'"
        class="difficulty-level-item"
        :class="item.isChecked ? 'checked' : ''"
        @click="checkDifficultyLevel(item)"
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
  @Prop() checkedDifficultyLevel: string;
  difficultyLevel: Array<{ id: number; isChecked: boolean }> = [
    { id: 1, isChecked: false },
    { id: 2, isChecked: false },
    { id: 3, isChecked: false },
    { id: 4, isChecked: false },
    { id: 5, isChecked: false },
  ];

  checkDifficultyLevel(checkedDifficultyLevel) {
    this.difficultyLevel.forEach((level) => {
      level.isChecked = false;
      if (level.id === checkedDifficultyLevel.id) {
        checkedDifficultyLevel.isChecked = true;
        this.$emit("difficultyLevelId", checkedDifficultyLevel.id);
      }
    });
  }

  mounted() {
    if (this.checkedDifficaltyLevel !== " ") {
      this.difficultyLevel.forEach((level) => {
        if (+level.id === +this.checkedDifficultyLevel) {
          level.isChecked = true;
        }
      });
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
