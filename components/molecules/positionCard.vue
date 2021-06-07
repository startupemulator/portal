<template>
  <div class="position-card">
    <h5>
      <span class="position-card__user-name"> {{ name }}</span>
      <span v-show="uncheck || check || advanced">
        <img
          class="position-card__check"
          :src="
            uncheck
              ? require('~/assets/img/uncheck.svg')
              : advanced
              ? require('~/assets/img/check-green.svg')
              : check
              ? require('~/assets/img/check-green.svg')
              : ''
          "
          alt="uncheck"
        />
      </span>
      <img
        v-show="uncheck"
        class="position-card__feedback"
        src="~/assets/img/feedback.svg"
        alt="feedback"
        @mouseover="showDeclineReasonMessage"
        @mouseleave="showDeclineReasonMessage"
      />
    </h5>
    <p class="position-card__experience">Experience</p>
    <p class="position-card__experience-count">{{ experience }}</p>
    <UTags
      v-for="technology in technologies"
      :key="technology.title"
      :title="technology.title"
    ></UTags>
    <div class="position-card__buttons">
      <U-button
        v-if="!access"
        :button-name="'Accept'"
        :button-class="'u-button-blue'"
        @clickOnButton="$emit('accept', positionId)"
      ></U-button>
      <U-button
        v-if="!access"
        :button-name="'Decline'"
        :button-class="'u-button-gray'"
        @clickOnButton="toggleDeclineCandidate"
      ></U-button>

      <div v-if="access" class="position-card__access">
        <div class="position-card__access-header" @click="toggleAccsessList">
          <span>{{ accsessButtonTitle }}</span>
          <img
            src="~/assets/img/arrow.svg"
            alt="arrow"
            :style="accsessList ? 'transform:rotate(-90deg)' : ''"
          />
        </div>
        <div v-show="accsessList" class="access--mobile">
          <ul class="access-types">
            <li class="access-type" @click="clickOnButtonAccses($event)">
              <span>Default access</span>
              <p>
                This team member can view a startup’s information and your guide
              </p>
            </li>
            <li class="access-type" @click="clickOnButtonAccses($event)">
              <span>Advanced access</span>
              <p>This team member can edit surce links and a startup’s guide</p>
            </li>
            <li class="access-type" @click="declineApplication">
              <span>Decline</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="declineCandidate" class="decline-popup">
        <div class="decline-popup__content">
          <div class="decline-popup__header">
            <button type="button" @click="toggleDeclineCandidate">
              <img src="~/assets/img/close.svg" alt="Close" />
            </button>
            <u-title :text="'Decline this candidate'"></u-title>
          </div>
          <p>
            Write a few words to this candidate. He will be grateful if you tell
            him why you are declining him.
          </p>
          <textarea
            v-model="declinetext"
            placeholder="Enter your comment"
          ></textarea>
          <div class="decline-popup__buttons">
            <U-button
              :button-name="'Yes, Decline'"
              :button-class="'u-button-blue'"
              @clickOnButton="decline"
            ></U-button>
            <U-button
              :button-name="'No, Don’t Decline'"
              :button-class="'u-button-gray'"
              @clickOnButton="toggleDeclineCandidate"
            ></U-button>
          </div>
        </div>
      </div>
      <div v-show="declineReasonMessage" class="decline-reason">
        <div class="decline-reason__content">
          <div class="decline-reason__header">
            <button
              type="button"
              @click="declineReasonMessage = !declineReasonMessage"
            >
              <img src="~/assets/img/close.svg" alt="Close" />
            </button>
            <u-title :text="'Decline reason'"></u-title>
            <div class="decline-reason__description">
              <p>
                {{ declineReason }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import UInput from "../atoms/uInput.vue";
import UTags from "~/components/atoms/uTags.vue";
import UButton from "~/components/atoms/uButton.vue";

@Component({
  components: { UTags, UButton, UInput },
})
export default class extends Vue {
  @Prop() name: String;
  @Prop() uncheck: Boolean;
  @Prop() check: Boolean;
  @Prop() access: Boolean;
  @Prop() advanced: Boolean;
  @Prop() declineReason: string;
  @Prop() experience: string;
  @Prop() technologies: Array<string>;
  @Prop() positionId: string;

  declineReasonMessage = false;
  accsessList = false;
  declineCandidate = false;
  declinetext: string = "";
  accsessButtonTitle = "Default access";
  showDeclineReasonMessage() {
    //   if mobile it work like click
    if (window.screen.width < 1438) {
      this.declineReasonMessage = true;
    } else {
      this.declineReasonMessage = !this.declineReasonMessage;
    }
  }

  declineApplication() {
    if (this.uncheck) {
      this.accsessList = !this.accsessList;
    } else {
      this.toggleDeclineCandidate();
      this.accsessList = !this.accsessList;
    }
  }

  toggleAccsessList() {
    this.accsessList = !this.accsessList;
  }

  toggleDeclineCandidate() {
    this.declineCandidate = !this.declineCandidate;
  }

  clickOnButtonAccses($event) {
    if ($event.currentTarget.children[0].textContent === "Default access") {
      this.$emit("accept", this.positionId);
      this.accsessList = !this.accsessList;
    }

    if ($event.currentTarget.children[0].textContent === "Advanced access") {
      this.$emit("advancedAccess", this.positionId);
      this.accsessList = !this.accsessList;
    }

    // const checkedAccses = $event.currentTarget.children[0].textContent;
    // this.accsessButtonTitle = checkedAccses;
    // this.accsessList = !this.accsessList;
  }

  decline() {
    this.$emit("decline", this.positionId, this.declinetext);
    this.declineCandidate = !this.declineCandidate;
  }

  checkAccess() {
    if (this.uncheck) {
      this.accsessButtonTitle = "Decline";
    } else if (this.check) {
      this.accsessButtonTitle = "Default access";
    } else if (this.advanced) {
      this.accsessButtonTitle = "Advanced access";
    }
  }

  mounted() {
    this.checkAccess();
  }

  beforeUpdate() {
    this.checkAccess();
  }
}
</script>

<style lang="scss" scoped>
.position-card {
  background: #2e384a;
  box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
  border-radius: 12px;
  padding: 24px;
  margin-top: 16px;
  max-width: 343px;
  box-sizing: border-box;

  h5 {
    word-break: break-all;
    font-weight: bold;
    font-size: 17px;
    line-height: 32px;
    margin: 0;
    display: flex;
  }
  .position-card__check {
    margin-left: 8px;
  }
  .position-card__feedback {
    margin-left: auto;
    cursor: pointer;
    align-self: baseline;
  }
  .position-card__experience {
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #8c97ac;
    margin: 0;
    margin-top: 12px;
  }
  .position-card__experience-count {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #fff;
    margin: 0;
    margin-bottom: 12px;
  }
  .tags-item {
    color: #b5c1d8;
    margin-right: 4px;
    margin-bottom: 4px;
    padding: 0 16px;
    font-weight: normal;
    font-size: 14px;
    line-height: 32px;
  }
  .position-card__buttons {
    margin-top: 22px;
    display: flex;
    justify-content: center;
    .u-button-gray {
      margin-left: 12px;
    }
  }
  .position-card__access {
    width: 295px;
    padding: 8px 16px;
    background: #3b465a;
    border-radius: 12px;
    .position-card__access-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      span {
        font-weight: 500;
        font-size: 16px;
        line-height: 32px;
      }
      img {
        transform: rotate(90deg);
        transition: 0.2s;
      }
    }
    .access--mobile {
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(59, 70, 90, 0.6);
      backdrop-filter: blur(16px);
      z-index: 6;
      height: 100%;
      width: 100vw;
      .access-types {
        position: fixed;
        background: #232b39;
        border-radius: 12px;
        bottom: 0;
        left: 0;
        z-index: 7;
        width: 100%;
        height: 288px;
        margin: 0;
        padding: 24px 0;
        box-sizing: border-box;
      }
      .access-type {
        padding: 8px 24px;
        cursor: pointer;
        &:hover {
          background: #4b4ac8;
        }
        span {
          font-weight: 500;
          font-size: 17px;
          line-height: 32px;
        }
        p {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          margin: 0;
        }
      }
    }
  }
  .decline-popup {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
    background: rgba(59, 70, 90, 0.6);
    backdrop-filter: blur(16px);
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .decline-popup__content {
      position: absolute;
      width: 343px;
      background: #232b39;
      border-radius: 12px;
      padding: 24px;
      box-sizing: border-box;
    }
    .decline-popup__header {
      button {
        position: absolute;
        right: 10px;
        top: 16px;
        background: transparent;
      }
      h2 {
        margin: 0;
        margin: 24px 0 16px 0;
        font-weight: bold;
        font-size: 26px;
        line-height: 32px;
      }
    }
    p {
      margin: 0 0 24px 0;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      max-width: 440px;
    }
    textarea {
      width: 295px;
      height: 112px;
      background: #2e384a;
      border-radius: 12px;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      padding: 12px 24px;
      border: none;
      color: #fff;
      box-sizing: border-box;
      &::placeholder {
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #b5c1d8;
      }
    }
    .decline-popup__buttons {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
    }
    .u-button-gray {
      margin-left: 0;
      margin-top: 16px;
    }
  }
  .decline-reason {
    background: rgba(59, 70, 90, 0.6);
    backdrop-filter: blur(16px);
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;

    .decline-reason__content {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 284px;
      background: #232b39;
      border-radius: 12px;
      box-sizing: border-box;
      padding: 16px 16px 16px 16px;
    }
    .decline-reason__header {
      button {
        background: transparent;
        position: absolute;
        right: 10px;
        top: 16px;
      }
      h2 {
        font-weight: bold;
        font-size: 26px;
        line-height: 32px;
        margin-top: 24px;
        margin-bottom: 16px;
      }
      p {
        margin: 0;
        height: 132px;
      }
    }
  }
}
@media (min-width: 1438px) {
  .position-card {
    max-width: 318px;
    min-width: 318px;
    padding: 32px;
    margin-bottom: 8px;

    &:not(:nth-child(2n)) {
      margin-right: 24px;
    }
    h5 {
      font-size: 18px;
      line-height: 32px;
    }
    .position-card__experience {
      margin-top: 16px;
    }
    .position-card__buttons {
      margin-top: 32px;
    }
    .decline-popup {
      .decline-popup__content {
        width: 564px;
      }
      .decline-popup__header {
        margin-left: 24px;
        h2 {
          font-size: 35px;
          line-height: 40px;
        }
      }
      p {
        font-size: 17px;
        margin-left: 24px;
        line-height: 24px;
      }
      textarea {
        width: 468px;
        height: 136px;
        font-size: 18px;
        line-height: 28px;
        margin-left: 24px;

        &::placeholder {
          font-size: 18px;
          line-height: 28px;
        }
      }
      .decline-popup__buttons {
        flex-direction: row;
        margin: 24px;
      }
      .u-button-gray {
        margin-left: 24px;
        margin-top: 0;
      }
    }
    .position-card__access {
      position: relative;
      .access--mobile {
        position: relative;
        top: 0;
        left: 0;
        background: transparent;
        backdrop-filter: none;
        z-index: 6;
        height: auto;
        width: auto;
        .access-types {
          position: absolute;
          background: #3b465a;
          width: 318px;
          height: 240px;
          top: 16px;
          left: -16px;
          padding: 8px 0;
          box-sizing: border-box;
        }
        .access-type {
          padding: 8px 24px;
          cursor: pointer;
          &:hover {
            background: #4b4ac8;
          }
          span {
            font-weight: 500;
            font-size: 17px;
            line-height: 32px;
          }
          p {
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            margin: 0;
          }
        }
      }
    }
    .decline-reason {
      background: transparent;
      backdrop-filter: none;
      position: relative;
      top: 0;
      width: auto;
      height: auto;

      .decline-reason__content {
        position: absolute;
        bottom: 250px;
        right: -8px;
        padding: 16px 16px 16px 16px;
        width: 468px;
        height: 204px;
        background: #4e5a71;
        &::before {
          position: absolute;
          content: "";
          width: 24px;
          height: 24px;
          background: #4e5a71;
          bottom: -12px;
          right: 12px;
          transform: rotate(45deg);
        }
        &::after {
          position: absolute;
          content: "";
          width: 24px;
          height: 24px;
          background: #2e384a;
          bottom: -24px;
          right: 0;
          transform: rotate(0deg);
        }
      }
      .decline-reason__header {
        button {
          display: none;
        }
        h2 {
          font-weight: 600;
          font-size: 18px;
          line-height: 32px;
          margin-top: 8px;
          margin-bottom: 4px;
        }
        p {
          font-weight: normal;
          font-size: 17px;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
