<template>
  <div class="feed-back-card">
    <div class="feed-back-card__main-content">
      <div class="feed-back-card__main-content-header">
        <h3>{{ author }} <span>for</span> Startup #1</h3>
        <p>{{ new Date(published).toUTCString().substr(4, 18) }}</p>
      </div>
      <div class="feed-back-card__main-content-body">
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
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class extends Vue {
  @Prop() comment: string;
  @Prop() author: string;

  @Prop() published: string;
}
</script>
<style lang="scss" scoped>
.feed-back-card {
  width: 343px;
  padding: 20px 0 16px 0;
  background: #2e384a;
  border-radius: 12px;
  box-sizing: border-box;
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
