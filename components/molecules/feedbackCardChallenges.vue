<template>
  <div class="feed-back-card">
    <div class="feed-back-card__main-content">
      <div class="feed-back-card__main-content-header">
        <h3>
          Expert's
          {{ feedback.expert ? feedback.expert.username : "" }}
        </h3>

        <p>{{ new Date(feedback.published_at).toUTCString().substr(4, 18) }}</p>
      </div>
      <div v-show="true" class="feed-back-card__main-content-body">
        <img src="~/assets/img/feedback.svg" alt="feedback" />

        <div class="feed-back-card__main-content-feedback">
          <h4 v-if="activity_state">Expert’s Full Name</h4>
          <ul class="main-content-feedback__criterions">
            <li
              v-for="(criterion, i) in feedback.criterions"
              :key="i"
              class="main-content-feedback__criterion"
            >
              <ul class="criterion-stars">
                <li class="criterion-star">
                  <svg
                    v-for="(item, j) in 5"
                    :key="j"
                    :class="criterion.mark > j ? 'active' : ''"
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
                  <span> {{ criterion.direction.title }}</span>
                </li>
              </ul>
            </li>
          </ul>
          <div class="main-content-feedback__descrition">
            <span>
              {{ feedback.description }}
            </span>
            <div class="feedbacks_badges">
              <img
                v-for="badge in feedback.badges"
                :key="badge.id"
                :src="badge.image[0].url"
                :alt="badge.title"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="isExpert" class="feed-back-card__expert-buttons">
        <U-button
          :button-name="'Add Feedback'"
          :button-class="'u-button-blue'"
          @clickOnButton="addFeedback"
        ></U-button>
        <U-button
          :button-name="'Add Badge'"
          :button-class="'u-button-gray'"
          @clickOnButton="addbadge"
        ></U-button>
      </div>
    </div>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import AddTeamFeedBack from "~/components/organisms/startup/addTeamFeedback.vue";
import AddTeamBadge from "~/components/organisms/startup/addTeamBadge.vue";
import UButton from "~/components/atoms/uButton.vue";
import { Feedbacks } from "~/models/Feedbacks";
import Toast from "~/store/modules/Toast";
import Spiner from "~/components/molecules/spiner.vue";
@Component({
  components: {
    UButton,
    Spiner,
    AddTeamFeedBack,
    AddTeamBadge,
  },
})
export default class extends Vue {
  @Prop({ default: false }) activity_state: Boolean;
  @Prop({ default: false }) isExpert: Boolean;
  @Prop() userId: string;
  @Prop() feedback: Array<Feedbacks>;

  show_feedback: boolean = false;
  thisUserlike: boolean = false;
  thisUserlikeId: string = "";
  loading = false;

  toggleFeedBack() {
    this.show_feedback = !this.show_feedback;
  }

  addFeedback() {
    this.$emit("addFeedback", "Add feedback", this.feedback.id);
    console.log("add feedback");
  }

  addbadge() {
    this.$emit("addBadge", "Add badge", this.feedback.id);
    console.log("add badge");
  }

  async like() {
    this.loading = true;
    if (!this.thisUserlike && !!this.userId) {
      try {
        const like = await this.$createLike(this.feedback.id, this.userId);
        if (like !== null) {
          this.$emit("updateFeedbacks", like);
          this.thisUserlikeId = like.id;
          this.thisUserlike = true;
          this.loading = false;
        }
      } catch (e) {
        console.error(e);
        Toast.show({
          data: e.message,
          duration: 3000,
        });
        this.loading = false;
      }
    } else if (this.userId) {
      try {
        const like = await this.$deleteLike(this.thisUserlikeId);
        if (like !== null) {
          this.$emit("updateFeedbacks", like);
          this.thisUserlikeId = "";
          this.thisUserlike = false;
          this.loading = false;
        }
      } catch (e) {
        console.error(e);
        Toast.show({
          data: e.message,
          duration: 3000,
        });
        this.loading = false;
      }
    } else if (!this.userId) {
      this.$router.push("/login");
    }
  }

  updateLikeData() {
    this.feedback.likes.forEach((like) => {
      if (+like.user.id === +this.userId) {
        this.thisUserlike = true;
        this.thisUserlikeId = like.id;
      } else if (+like.user.id !== +this.userId) {
        this.thisUserlike = false;
        this.thisUserlikeId = "";
      }
    });
  }

  mounted() {
    if (this.feedback.likes) {
      this.feedback.likes.forEach((like) => {
        if (+like.user.id === +this.userId) {
          this.thisUserlike = true;
          this.thisUserlikeId = like.id;
        }
      });
    }
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
  margin-bottom: 16px;
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
      h4 {
        margin-top: 0;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 12px;
      }
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

    & svg {
      cursor: pointer;
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
    padding: 16px 0 0 0;
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
  .feedbacks_badges {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
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
      padding-left: 32px;
      padding-right: 32px;
      margin-top: 24px;
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
