<template>
  <div v-if="!!$strapi.getToken()" class="notification-popup">
    <div class="notification-popup__header">
      <h3>Notifications</h3>
    </div>
    <div v-if="isExpert" class="notification-popup__expert-notification">
      <U-button
        :button-name="'My projects'"
        :button-class="'u-button-transpend expert-button expert-button-projects'"
        @clickOnButton="filterNotificationByMyProjects"
      ></U-button>
      <U-button
        :button-name="'Waiting for feedback'"
        :button-class="'u-button-transpend expert-button'"
        @clickOnButton="filterNotificationByFeedback"
      ></U-button>
    </div>
    <div class="notification-popup__message new-popup__message">
      <div class="new-message__header">
        <span>New</span>
        <button type="button" @click="markAllNotifications">
          <img src="~/assets/img/check.svg" alt="mark as read" /><span
            >Mark all as read</span
          >
        </button>
      </div>
      <div class="new-message__content">
        <ul class="new-message__content-list">
          <li
            v-for="notification in notifications
              .filter((el) => el.viewed === false)
              .splice(0, lengthNewNotifications)"
            :key="notification.id"
            class="new-message__content-item"
          >
            <div class="content-item-description">
              <span>{{ notification.notification.creator.profile.name }}</span>
              <p>
                {{ notification.notification.message }}
                for
              </p>
              <span v-if="notification.notification.startup !== null"
                >Startup #{{ notification.notification.startup.id }}</span
              >
              <span v-if="notification.notification.challenge !== null"
                >Challenge #{{ notification.notification.challenge.id }}</span
              >
              <div class="content-item-description__date">
                {{ notification.published_at | formatDateWithTime }}
              </div>
            </div>
            <div @click="readNotification(notification.id)">
              <nuxt-link
                :to="{
                  path:
                    notification.notification.startup !== null &&
                    notification.notification.type === 'default'
                      ? '/startup/requestsToTeam/' +
                        notification.notification.startup.slug
                      : notification.notification.startup !== null &&
                        notification.notification.type === 'feedback'
                      ? '/startup/' + notification.notification.startup.slug
                      : notification.notification.challenge !== null
                      ? '/challenge/' + notification.notification.challenge.slug
                      : '',
                }"
              >
                <img src="~/assets/img/arrow.svg" />
              </nuxt-link>
            </div>
          </li>
        </ul>
      </div>
      <button
        v-show="
          notifications.filter((el) => el.viewed === false).length >
          lengthNewNotifications
        "
        class="showMoreNewNotifications"
        type="button"
        @click="showMoreNewNotifications"
      >
        <span>Show more</span>
      </button>
    </div>
    <div class="notification-popup__message earlier__message">
      <div class="new-message__header">
        <span>Earlier</span>
      </div>
      <div class="new-message__content">
        <ul class="new-message__content-list">
          <li
            v-for="notification in notifications
              .filter((el) => el.viewed === true)
              .splice(0, lengthEarlierNotifications)"
            :key="notification.id"
            class="new-message__content-item"
          >
            <div class="content-item-description">
              <span>{{ notification.notification.creator.profile.name }}</span>
              <p>
                {{ notification.notification.message }}
                for
              </p>
              <span v-if="notification.notification.startup !== null"
                >Startup #{{ notification.notification.startup.id }}</span
              >
              <span v-if="notification.notification.challenge !== null"
                >Challenge #{{ notification.notification.challenge.id }}</span
              >
              <div class="content-item-description__date">
                {{ notification.published_at | formatDateWithTime }}
              </div>
            </div>
            <div @click="closeNotifications">
              <nuxt-link
                :to="{
                  path:
                    notification.notification.startup !== null &&
                    notification.notification.type === 'default'
                      ? '/startup/requestsToTeam/' +
                        notification.notification.startup.slug
                      : notification.notification.startup !== null &&
                        notification.notification.type === 'feedback'
                      ? '/startup/' + notification.notification.startup.slug
                      : notification.notification.challenge !== null
                      ? '/challenge/' + notification.notification.challenge.slug
                      : '',
                }"
              >
                <img src="~/assets/img/arrow.svg" />
              </nuxt-link>
            </div>
          </li>
        </ul>
      </div>
      <button
        v-show="
          notifications.filter((el) => el.viewed === true).length >
          lengthEarlierNotifications
        "
        class="showMoreNewNotifications"
        type="button"
        @click="showMoreEarlierNotifications"
      >
        <span>Show more</span>
      </button>
    </div>
    <Spinner :loading="notificationLoading"></Spinner>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import UButton from "../atoms/uButton.vue";
import Spinner from "../atoms/spinner.vue";
import { Notification } from "~/models/Notification";

@Component({
  components: { UButton, Spinner },
})
export default class extends Vue {
  @Prop() notifications: Array<Notification>;
  @Prop() isExpert: boolean;
  @Prop() notificationLoading: boolean;

  firstClickOnNotification = true;
  lengthNewNotifications = 5;
  lengthEarlierNotifications = 5;

  filterNotificationByMyProjects() {
    this.$emit("filterNotificationByMyProjects");
  }

  filterNotificationByFeedback() {
    this.$emit("filterNotificationByFeedback");
  }

  showMoreNewNotifications() {
    this.lengthNewNotifications = this.lengthNewNotifications + 5;
  }

  showMoreEarlierNotifications() {
    this.lengthEarlierNotifications = this.lengthEarlierNotifications + 5;
  }

  clickOnDocumet(e) {
    const el = document.querySelector(".notification-popup");
    if (
      !this.firstClickOnNotification &&
      !(
        e.target.classList.contains("notification-popup") ||
        el.contains(e.target)
      )
    ) {
      this.$emit("closeNotificationPopup");
    }
    this.firstClickOnNotification = false;
  }

  closeNotifications() {
    this.$emit("closeNotifications");
  }

  readNotification(id) {
    this.$emit("markNotificationIsReaded", id);
  }

  markAllNotifications() {
    this.$emit("markAllNotifications");
  }

  mounted() {
    document.addEventListener("click", this.clickOnDocumet);
  }

  beforeDestroy() {
    document.removeEventListener("click", this.clickOnDocumet);
  }
}
</script>
<style lang="scss" scoped>
.notification-popup {
  position: absolute;
  right: 0;
  width: 100%;
  max-width: 425px;
  background: linear-gradient(90deg, #1c232f 0%, #232b3a 100%);
  padding: 14px 16px 64px 16px;
  z-index: 3;
  color: #fff;
  border-radius: 12px;
  box-sizing: border-box;
  border: 1px solid #59667e;

  .loader {
    position: static;
    height: auto;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .notification-popup__header {
    h3 {
      font-weight: bold;
      font-size: 36px;
      line-height: 40px;
      margin-bottom: 30px;
    }
  }

  .showMoreNewNotifications {
    background: transparent;
    display: flex;
    justify-content: flex-end;
    padding-right: 0;
    margin-left: auto;
    color: #8c97ac;
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
  }

  .notification-popup__message {
    padding-bottom: 24px;
    max-height: 245px;
    overflow: hidden;
    overflow-y: visible;

    .new-message__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      span {
        font-weight: bold;
        font-size: 26px;
        line-height: 32px;
      }

      button {
        background: transparent;
        display: flex;
        align-items: center;
        padding-right: 0;

        span {
          font-weight: 600;
          font-size: 16px;
          line-height: 32px;
          color: #8c97ac;
          margin-left: 8px;
        }

        img {
          width: 24px;
          height: 24px;
        }
      }
    }

    .new-message__content-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;

      .content-item-description {
        width: 255px;
      }

      span {
        font-weight: 500;
        font-size: 17px;
        line-height: 24px;
      }

      p {
        margin: 0;
        display: inline-block;
      }

      .content-item-description__date {
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: #8c97ac;
      }

      img {
        margin-right: 8px;
      }
    }
  }

  .earlier__message {
    padding-top: 24px;
    border-top: 1px solid #4e5a71;
  }

  .notification-button {
    height: 40px;
  }

  .notification-popup__expert-notification {
    display: flex;

    .expert-button {
      padding: 4px 16px;
      font-weight: normal;
      font-size: 14px;
      line-height: 32px;
      color: #fff;
      border: 1px solid #59667e;
      box-sizing: border-box;
      border-radius: 32px;
      width: auto;
      height: auto;
    }

    .expert-button-projects {
      margin-right: 8px;
    }
  }
}
@media (min-width: 1280px) {
  .notification-popup {
    background: #2e384a;
    box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
    right: 28px;
    top: 84px;
    max-width: 564px;
    padding: 0 32px;

    .notification-popup__header {
      h3 {
        font-weight: 600;
        font-size: 35px;
        line-height: 40px;
        margin-top: 30px;
        margin-bottom: 28px;
      }
    }

    .notification-popup__message {
      padding-bottom: 12px;
      max-height: 540px;

      &::-webkit-scrollbar {
        width: 5px;
        background-color: #2e384a;
        padding-top: 20px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #59667e;
      }

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background-color: #2e384a;
      }

      .new-message__header {
        margin-bottom: 0;

        span {
          font-weight: 600;
          font-size: 18px;
          line-height: 32px;
        }
      }

      .new-message__content-item {
        .content-item-description {
          width: 400px;
        }

        span {
          font-weight: 500;
          font-size: 17px;
          line-height: 24px;
        }

        p {
          font-size: 17px;
          line-height: 24px;
        }
      }
    }

    .earlier__message {
      padding-top: 18px;
    }

    .notification-button {
      display: none;
    }

    .notification-popup__expert-notification {
      margin-top: -10px;
      margin-bottom: 22px;
    }
  }
}
</style>
