<template>
  <div class="startup-card startup-card--draft">
    <div class="startup-card__started">
      <div class="startup-card__started-state draft">
        <div
          class="startup-card__started-title"
          :class="
            card.state === 'in_progress'
              ? 'started'
              : card.state === 'finished'
              ? 'finished'
              : card.state === 'feedback'
              ? 'feedback'
              : ''
          "
        >
          Draft
        </div>
      </div>
    </div>
    <div class="startup-card-content">
      <h2 class="startup-card__started-name">{{ card.title }}</h2>
      <h3 class="startup-card__started-text">
        {{ card.description | truncate(90, "...") }}
      </h3>

      <div class="draft-buttons">
        <U-button
          :button-name="'Continue Creating'"
          class="u-button-blue"
          :is-link="'nuxt-link'"
          :href="'/startup/edit/' + card.slug"
        >
        </U-button>
        <U-button
          type="button"
          :button-name="'Delete Draft'"
          class="u-button-gray"
          @clickOnButton="$emit('clickOnButton', card.id)"
        >
        </U-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UButton from "../atoms/uButton.vue";
import { Challenge } from "../../models/Challenge";

@Component({
  components: { UButton },
})
export default class extends Vue {
  @Prop() i: number;
  @Prop() card: Challenge;
}
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}

.startup-card.startup-card--draft {
  width: 339px;
  min-height: auto;
  padding-bottom: 30px;
  color: #fff;
  .startup-card__started-name {
    margin-top: 16px;
    min-height: auto;
  }
  .startup-card__started-text {
    width: 285px;
    margin-top: 10px;
    min-height: 72px;
    color: #fff;
    font-size: 16px;
    line-height: 22px;
  }
  .draft {
    padding: 8px;
    background-color: transparent;
    box-shadow: none;
    box-sizing: border-box;
  }
  .startup-card__started {
    display: flex;
    justify-content: flex-end;
  }
  .startup-card-content {
    padding: 0 24px;
  }

  .startup-card__started-title {
    background: #8c97ac;
    box-shadow: 0 -2px 8px rgba(140, 151, 172, 0.3),
      0 2px 8px rgba(140, 151, 172, 0.3);
    border-radius: 14px;
    padding: 2px 12px;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #fff;
  }
  .startup-card__started-title.feedback {
    background: #19adc7;
  }
  .startup-card__started-title.started {
    background: #3cc28d;
  }
  .startup-card__started-title.finished {
    background: #f0663b;
  }
}
.startup-card--draft {
  background-color: transparent;
  border: 2px dashed #8c97ac;
  border-radius: 12px;
  button {
    margin-top: 16px;
  }

  .startup-card__started-name {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    color: #fff;
    margin-top: 20px;
    min-height: 70px;
  }
}
@media (min-width: 768px) {
  .startup-card.startup-card--draft {
    min-height: 568px;
    width: 318px;
    box-sizing: border-box;
    .startup-card__started-text {
      min-height: 203px;
      margin-top: 24px;
    }

    .draft {
      padding: 12px;
    }
  }
  .startup-card--draft {
    .startup-card__started-name {
      font-size: 35px;
      line-height: 38px;
    }
  }
  .startup-card.startup-card--draft .startup-card__started-name {
    margin-top: 24px;
  }
}
</style>
