<template>
  <div class="difficulty-level">
    <h5>Difficulty level</h5>
    <ul class="difficulty-level-list">
      <li
        v-for="(item, i) in 5"
        :key="i + 'difficulty'"
        class="difficulty-level-item"
        :class="
          card.difficulty < 1
            ? ''
            : card.difficulty === 1 && i < 1
            ? 'started'
            : card.difficulty === 2 && i < 2
            ? 'started'
            : card.difficulty === 3 && i < 3
            ? 'finished'
            : card.difficulty === 4 && i < 4
            ? 'finished'
            : card.difficulty === 5 && i < 5
            ? 'hard'
            : ''
        "
      ></li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Challenge } from "../../models/Challenge";
@Component({})
export default class extends Vue {
  @Prop() card: Array<Challenge>;
}
</script>
<style lang="scss" scoped>
.difficulty-level {
  ul {
    padding: 0;
  }

  h5 {
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #8c97ac;
    margin: 0 0 8px;
  }

  .difficulty-level-list {
    margin: 0;
    display: flex;
    justify-content: space-between;

    .difficulty-level-item {
      background: #4e5a71;
      box-shadow: inset 2px -1px 8px rgba(78, 100, 141, 0.5);
      border-radius: 16px;
      width: 54.2px;
      height: 4px;

      &.started {
        background: #3cc28d;
        box-shadow: 0 -2px 8px rgba(60, 194, 141, 0.3),
          0 2px 8px rgba(60, 194, 141, 0.3);
      }

      &.finished {
        background: #f0663b;
        box-shadow: -4px 0 6px 1px rgba(240, 102, 59, 0.25),
          4px 0 6px 1px rgba(240, 102, 59, 0.25);
      }

      &.hard {
        background: #e94646;
        box-shadow: 0 -1px 6px #e94646, 0 1px 6px rgba(233, 70, 70, 0.25);
      }
    }
  }
}

.challenge-task .difficulty-level-list {
  width: 254px;

  .difficulty-level-item {
    width: 46px;
  }
}

.startup-block.challenges {
  .difficulty-level-list {
    width: 254px;

    .difficulty-level-item {
      width: 46px;
    }
  }
}

@media (min-width: 768px) {
  .difficulty-level {
    margin-top: 24px;

    .difficulty-level-list {
      .difficulty-level-item {
        width: 46px;
      }
    }
  }

  .challenge-task .difficulty-level {
    margin-top: 8px;
  }
}
</style>
