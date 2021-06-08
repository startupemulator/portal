<template>
  <div class="open-position-card">
    <div class="position-card__highlighter">
      <div class="card__highlighter"></div>
    </div>
    <div class="position-card__developer">
      <div class="position-card__developer_technologies">
        <h4>{{ position.specialisation.title }}</h4>
        <U-tags
          v-for="technology in position.technologies"
          :key="technology.id"
          :technologi-id="technology.id"
          :title="technology.title"
        ></U-tags>
      </div>
      <div
        v-if="!isOwner && !isDeveloper"
        class="position-card__developer__button"
      >
        <U-button
          :button-name="'Apply to Team'"
          :button-class="'u-button-blue'"
          :is-link="'nuxt-link'"
          :href="'/startup/apply/' + slug"
        ></U-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTags from "../atoms/uTags.vue";
import UButton from "~/components/atoms/uButton.vue";

@Component({
  components: { UButton, UTags },
})
export default class AppHeader extends Vue {
  @Prop() position: Array<any>;
  @Prop() slug: string;
  @Prop() isOwner: string;
  @Prop() isDeveloper: string;
}
</script>

<style lang="scss" scoped>
.open-position-card {
  width: 100%;
  background: #2e384a;
  padding: 20px 0;
  box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
  border-radius: 12px;
  display: flex;
  box-sizing: border-box;
  margin-bottom: 16px;
  color: #fff;
  .position-card__highlighter {
    min-height: 100%;
    background: #283040;
    box-shadow: inset 2px -2px 8px rgba(28, 35, 48, 0.25);
    border-radius: 0 10px 10px 0;
    padding: 8px 7px;
    .card__highlighter {
      height: 100%;
      background: #6295fc;
      box-shadow: 0 -2px 4px #6295fc, 0 2px 4px #6295fc;
      border-radius: 14px;
      width: 2px;
    }
  }
  .position-card__developer {
    margin-left: 16px;
    h4 {
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      margin: 0;
      margin-bottom: 16px;
    }
    .tags-item {
      padding: 0 16px;
      font-weight: normal;
      font-size: 14px;
      line-height: 32px;
      margin-bottom: 4px;
      margin-right: 4px;
      color: #b5c1d8;
    }
    .position-card__developer__button {
      display: none;
    }
  }
}
@media (min-width: 1280px) {
  .open-position-card {
    padding: 20px 0;
    .position-card__highlighter {
      padding: 12px 14px;
      .card__highlighter {
        width: 4px;
      }
    }
    .position-card__developer {
      margin-left: 24px;
      display: flex;
      width: 100%;
      .position-card__developer_technologies {
        width: 465px;
      }
      h4 {
        font-weight: normal;
        font-size: 17px;
        line-height: 32px;
        margin-top: 4px;
        margin-bottom: 8px;
      }
      .technology-item {
        margin-right: 8px;
        color: #b5c1d8;
      }
      .position-card__developer__button {
        display: block;
        width: 254px;
        min-width: 254px;
        margin-right: 32px;
        margin-left: auto;
        align-self: center;
      }
    }
  }
}
</style>
