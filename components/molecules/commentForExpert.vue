<template>
  <div class="comments-expert">
    <U-title :text="'Comments for experts'"></U-title>
    <div class="comments-expert__content">
      <div class="comments-expert__content-header">
        <h4>
          Product Owner’s <span> {{ solutionData.creator.username }} </span>
        </h4>
        <p>
          <!-- {{
            new Date(solutionData.solutions[0].published_at)
              .toUTCString()
              .substr(4, 18)
          }} -->
          <!-- Need in askFeedback add publiched_at -->
        </p>
      </div>
      <div class="comments-expert__content-description">
        <img src="~/assets/img/feedback.svg" alt="feedback" />
        <h5>
          {{ solutionData.comment }}
        </h5>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import UTitle from "~/components/atoms/uTitle.vue";

@Component({
  components: {
    UTitle,
  },
})
export default class extends Vue {
  @Prop() solutionData: Array<any>;
}
</script>
<style lang="scss" scoped>
.comments-expert {
  margin-top: 40px;
  h2 {
    margin-top: 0;
    margin-bottom: 26px;
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
  }
  .comments-expert__content {
    background: #2e384a;
    border-radius: 12px;
    padding: 20px 0 16px 0;
    box-sizing: border-box;
  }
  .comments-expert__content-header {
    padding: 0 24px 16px 24px;
    border-bottom: 1px solid #4e5a71;
    h4 {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin: 0;
    }
    p {
      color: #8c97ac;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      margin: 0;
    }
  }
  .comments-expert__content-description {
    padding: 16px 24px 16px 24px;
    display: flex;
    align-items: flex-start;
    h5 {
      margin: 0;
      font-size: 14px;
      font-weight: normal;
      line-height: 20px;
      color: #dbe4f3;
      margin-left: 16px;
    }
  }
}
@media (min-width: 1280px) {
  .comments-expert {
    margin-top: 56px;
    h2 {
      font-weight: 600;
      font-size: 35px;
      line-height: 40px;
    }
    .comments-expert__content {
      padding: 0;
    }
    .comments-expert__content-header {
      padding: 24px 32px;
      h4 {
        font-weight: 500;
        font-size: 17px;
        line-height: 24px;
      }
      p {
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
      }
    }
    .comments-expert__content-description {
      padding: 20px 32px 24px 32px;
      display: flex;
      align-items: flex-start;
      h5 {
        font-size: 14px;
        line-height: 20px;
        margin-left: 20px;
        max-width: 500px;
      }
    }
  }
}
</style>
