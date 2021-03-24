<template>
  <div class="feed-back-card">
    <div class="feed-back-card__main-content">
      <div class="feed-back-card__main-content-header">
        <h3>{{ author }} <span>for</span> Startup #1</h3>
        <p>{{ new Date(published).toUTCString().substr(4, 18) }}</p>
        <div
          v-if="activity_state"
          class="startup-card__activity-like active-like"
          :class="show_feedback ? 'opend-feedback' : ''"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.75259 3.21064C0.569897 4.54117 0 6.28693 0 8C0 11.9264 2.76324 15.6775 5.41789 18.3321C6.77259 19.6868 8.15969 20.8164 9.28038 21.6122C9.83982 22.0095 10.3444 22.3318 10.7546 22.5597C10.9584 22.6729 11.1536 22.7711 11.3297 22.8438C11.4652 22.8999 11.7229 23 12 23C12.2771 23 12.5348 22.8999 12.6703 22.8438C12.8464 22.7711 13.0416 22.6729 13.2454 22.5597C13.6556 22.3318 14.1602 22.0095 14.7196 21.6122C15.8403 20.8164 17.2274 19.6868 18.5821 18.3321C21.2368 15.6775 24 11.9264 24 8C24 6.28693 23.4301 4.54117 22.2474 3.21064C21.0484 1.8617 19.2714 1 17 1C15.1575 1 13.7886 1.90247 12.8652 2.85697C12.5259 3.20774 12.2385 3.57331 12 3.91926C11.7615 3.57331 11.4741 3.20774 11.1348 2.85697C10.2114 1.90247 8.84246 1 7 1C4.72864 1 2.95164 1.8617 1.75259 3.21064ZM2 8C2 11.0736 4.23676 14.3225 6.83211 16.9179C8.10242 18.1882 9.40281 19.2461 10.4384 19.9815C10.9571 20.3499 11.3978 20.6291 11.7259 20.8114C11.8364 20.8728 11.9277 20.9196 12 20.9537C12.0723 20.9196 12.1636 20.8728 12.2741 20.8114C12.6022 20.6291 13.0429 20.3499 13.5616 19.9815C14.5972 19.2461 15.8976 18.1882 17.1679 16.9179C19.7632 14.3225 22 11.0736 22 8C22 6.71307 21.5699 5.45883 20.7526 4.53936C19.9516 3.6383 18.7286 3 17 3C15.8688 3 14.9859 3.54124 14.3027 4.24754C13.6118 4.96175 13.1878 5.78521 13.0146 6.16804C12.8028 6.63605 12.3544 6.81897 12 6.81897C11.6456 6.81897 11.1972 6.63605 10.9854 6.16804C10.8122 5.78521 10.3882 4.96175 9.69732 4.24754C9.01406 3.54124 8.13121 3 7 3C5.27136 3 4.04836 3.6383 3.24741 4.53936C2.4301 5.45883 2 6.71307 2 8ZM11.8427 21.0189C11.8429 21.0188 11.8461 21.0177 11.8521 21.0161C11.8457 21.0183 11.8426 21.0191 11.8427 21.0189ZM12.1573 21.0189C12.1571 21.0188 12.1539 21.0177 12.1479 21.0162C12.1517 21.0174 12.1543 21.0182 12.1558 21.0186C12.1568 21.0189 12.1573 21.019 12.1573 21.0189Z"
              fill="#5E56F0"
            />
          </svg>
          <span class="startup-card__activity-like-count">2</span>

          <button
            type="button"
            class="startup-card__activity-like-button"
            @click="toggleFeedBack"
          >
            <div><span>1</span> feedback</div>
            <img
              src="~/assets/img/arrow.svg"
              alt="arrow"
              :style="show_feedback ? 'transform: rotate(-90deg)' : ''"
            />
          </button>
        </div>
      </div>
      <div v-show="show_feedback" class="feed-back-card__main-content-body">
        <img src="~/assets/img/feedback.svg" alt="feedback" />
        <div class="feed-back-card__main-content-feedback">
          <ul class="main-content-feedback__criterions">
            <li
              v-for="(criterion, i) in 5"
              :key="i"
              class="main-content-feedback__criterion"
            >
              <ul class="criterion-stars">
                <li class="criterion-star">
                  <svg
                    v-for="(item, j) in 5"
                    :key="j"
                    :class="j < i + Math.random() * (5 - j) ? 'active' : ''"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.01257 5.96857L7.95358 1.11606C7.97034 1.07415 8.02966 1.07415 8.04642 1.11606L9.98743 5.96857C9.99502 5.98755 10.0134 6 10.0339 6H14.8793C14.9238 6 14.9461 6.05386 14.9146 6.08536L11.5205 9.47948C11.5078 9.49217 11.5029 9.51068 11.5076 9.52799L12.9673 14.8799C12.9791 14.9234 12.9319 14.9592 12.8933 14.936L8.02572 12.0154C8.00989 12.0059 7.99011 12.0059 7.97428 12.0154L3.1067 14.936C3.06807 14.9592 3.02089 14.9234 3.03274 14.8799L4.49237 9.52799C4.49709 9.51068 4.49217 9.49217 4.47948 9.47948L1.08536 6.08536C1.05386 6.05386 1.07617 6 1.12071 6H5.96615C5.98659 6 6.00498 5.98755 6.01257 5.96857Z"
                      stroke="none"
                    />
                  </svg>

                  <span> {{ "Criterion " + (i + 1) }}</span>
                </li>
              </ul>
            </li>
          </ul>
          <div class="main-content-feedback__descrition">
            <span>
              {{ comment }}
            </span>
            <img src="~/assets/img/profile-image.svg" alt="profile-imag" />
          </div>
        </div>
      </div>
      <div v-if="is_expert" class="feed-back-card__expert-buttons">
        <U-button
          :button-name="u_button_blue"
          :button-class="'u-button-blue'"
        ></U-button>
        <U-button
          :button-name="u_button_gray"
          :button-class="'u-button-gray'"
        ></U-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";
@Component({
  components: {
    UButton,
  },
})
export default class extends Vue {
  @Prop({
    default:
      "Some comment and feedback that this expert left with this bage, probably in a few lines. Some comment and feedback that this expert left with this bage, probably in a few lines.",
  })
  comment: string;

  @Prop({ default: "Expert" }) author: string;
  @Prop({ default: "5 Sep 2020 14:40" }) published: string;
  @Prop({ default: false }) activity_state: Boolean;
  @Prop({ default: true }) show_feedback: Boolean;
  @Prop({ default: false }) is_expert: Boolean;
  @Prop({ default: "Add Feedback" }) u_button_blue: string;
  @Prop({ default: "Add Badge" }) u_button_gray: string;
  toggleFeedBack() {
    this.show_feedback = !this.show_feedback;
  }
}
</script>
<style lang="scss" scoped>
.feed-back-card {
  width: 343px;
  padding: 20px 0 16px 0;
  background: #2e384a;
  border-radius: 12px;
  box-sizing: border-box;
  color: #fff;
  ul {
    margin: 0;
    padding: 0;
  }
  .feed-back-card__main-content-header {
    padding: 0 24px;
    h3 {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin: 0;
      span {
        font-weight: normal;
      }
    }
    p {
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      color: #8c97ac;
      margin-top: 0;
    }
  }
  .feed-back-card__main-content-body {
    display: flex;
    align-items: flex-start;
    border-top: 1px solid #4e5a71;
    padding: 16px 24px 0 24px;
    .feed-back-card__main-content-feedback {
      margin-left: 15px;

      .main-content-feedback__criterion {
        .criterion-star {
          svg {
            margin-right: 4px;
            position: relative;
            top: 4px;

            path {
              stroke: #8c97ac;
            }
          }
          svg.active {
            fill: #eaf42c;
            path {
              stroke: none;
            }
          }
          span {
            margin-left: 5px;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            color: #dbe4f3;
          }
        }
      }
      .main-content-feedback__descrition {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #dbe4f3;
        margin-top: 14px;
        width: 240px;
        img {
          display: block;
          width: 48px;
          height: 48px;
          margin-top: 12px;
        }
      }
    }
  }
  .startup-card__activity-like {
    margin-top: 12px;
    display: flex;
    align-items: center;
    &.opend-feedback {
      padding-bottom: 16px;
    }

    &.active-like svg path {
      fill-rule: nonzero;
    }
    .startup-card__activity-like-count {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      margin-left: 8px;
    }
    .startup-card__activity-like-button {
      background: transparent;
      display: flex;
      align-items: center;
      margin-left: auto;
      margin-right: 16px;
      div {
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        margin-right: 8px;
      }
      img {
        transform: rotate(90deg);
        transition: 0.2s;
      }
    }
  }
  .feed-back-card__expert-buttons {
    padding: 16px 0;
    margin-top: 16px;
    border-top: 1px solid #4e5a71;
    display: flex;
    justify-content: center;
    .u-button {
      max-width: 143px;
    }
    .u-button-gray {
      margin-left: 9px;
    }
  }
}
@media (min-width: 768px) {
  .feed-back-card {
    width: auto;
    max-width: 831px;
    padding: 24px 0 24px 0;
    .feed-back-card__main-content-header {
      padding: 0 32px;
      h3 {
        font-size: 17px;
        line-height: 24px;
        span {
          font-weight: normal;
        }
      }
      p {
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 24px;
      }
    }
    .feed-back-card__expert-buttons {
      padding: 24px 0 0 0;
      .u-button {
        max-width: 371px;
        max-height: 48px;
        font-weight: bold;
        font-size: 17px;
        line-height: 32px;
      }
      .u-button-gray {
        margin-left: 24px;
      }
    }
    .feed-back-card__main-content-body {
      padding: 20px 32px 0 32px;
      img {
        margin-top: 5px;
      }
      .feed-back-card__main-content-feedback {
        margin-left: 20px;

        .main-content-feedback__criterion {
          margin-bottom: 4px;
        }
        .main-content-feedback__descrition {
          margin-top: 18px;
          width: 498px;
          img {
            width: 72px;
            height: 72px;
            margin-top: 16px;
          }
        }
      }
    }
  }
}
</style>
