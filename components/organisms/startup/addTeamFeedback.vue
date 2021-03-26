<template>
  <div class="add-team-feedback">
    <div class="add-team-feedback__header">
      <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
      <UTitle :text="'Add team feedback'"></UTitle>
    </div>
    <div class="add-team-feedback__content">
      <Criterios v-for="(item, i) in 5" :key="i" :i="i"></Criterios>
      <div class="add-team-feedback__comment">
        <p>Comment</p>
        <textarea placeholder="Enter your comment"></textarea>
      </div>
      <PickBadeg></PickBadeg>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import Criterios from "~/components/molecules/criterios.vue";
import PickBadeg from "~/components/molecules/pickBadge.vue";

@Component({
  components: { UButton, UTitle, UBack, Criterios, PickBadeg },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.add-team-feedback {
  width: 343px;
  margin: 0 auto;
  padding: 0 16px;
  margin-top: 40px;
  h2 {
    margin-bottom: 28px;
  }
  .add-team-feedback__comment {
    margin-top: 8px;
    p {
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin-top: 0;
      margin-bottom: 8px;
    }
    textarea {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      padding: 8px 16px;
      background: #2e384a;
      border-radius: 12px;
      color: #fff;
      width: 343px;
      height: 136px;
      border: 2px solid transparent;
      box-sizing: border-box;
      &::placeholder {
        color: #b5c1d8;
      }
      &:focus {
        border: 2px solid #b5c1d8;
      }
    }
  }
}
</style>
