<template>
  <div class="startup-card__sources">
    <h3>Solutions</h3>
    <div class="startup-card__sources--finished">
      <div
        v-for="item in solution"
        :key="item.id"
        class="startup-card__sources-content"
      >
        <div>
          <h5>{{ item.title }}</h5>
          <p>{{ item.url }}</p>
        </div>
        <a
          target="_blank"
          :href="item.url"
          type="button"
          class="startup-card__sources-button"
        >
          <img src="~/assets/img/sources.svg" alt="sources" />
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import { Solutions } from "~/models/Solution";
@Component({})
export default class extends Vue {
  @Prop() solution: Array<Solutions>;
}
</script>
<style lang="scss" scoped>
.startup-card__sources {
  color: #fff;
  padding-bottom: 24px;

  h3 {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    margin-top: 0;
  }

  .startup-card__sources-design {
    margin-top: 16px;
  }

  .startup-card__sources-content {
    background: #2e384a;
    box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
    border-radius: 12px;
    padding: 20px 0 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 403px;
    margin-bottom: 16px;
  }

  .startup-card__sources-button {
    background: transparent;
    padding: 0;
    margin-left: 20px;
  }

  h5 {
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    margin: 0;
  }

  p {
    word-break: break-all;
    margin: 0;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #8c97ac;
  }
}
@media (min-width: 1280px) {
  .startup-card__sources {
    h5 {
      font-size: 17px;
      line-height: 32px;
    }

    p {
      font-size: 14px;
      line-height: 24px;
    }

    .startup-card__sources-content {
      padding: 24px 0 24px 32px;
      margin-bottom: 24px;
    }
  }

  .startup-card__sources h3,
  .startup-card__activity h3 {
    font-weight: 600;
    font-size: 35px;
    line-height: 40px;
  }

  .startup-card__activity,
  .startup-card__sources {
    margin-top: 40px;
  }

  .startup-card__sources--finished {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .startup-card__sources-content {
      width: 403px;
      max-width: 403px;
      box-sizing: border-box;
    }

    .startup-card__sources-design {
      margin-top: 0;
    }
  }
}
</style>
