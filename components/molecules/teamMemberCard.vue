<template>
  <div class="team-member-card">
    <div class="team-member-card__content">
      <div class="team-member-card__data">
        <p class="team-member-card__data-email">
          {{ userName }}
        </p>
        <p class="team-member-card__data-position">
          {{ specialisation }}
        </p>
      </div>
      <div
        class="team-member-card__menu-premission"
        :class="premissionMenu ? 'active' : ''"
      >
        <div class="menu-premission__header" @click="togglePermissionMenu">
          <span>{{
            choosenPermission === "accepted"
              ? "Default access"
              : "Advanced access"
          }}</span>
          <img
            src="~/assets/img/arrow.svg"
            alt="arrow"
            :style="premissionMenu ? 'transform: rotate(-90deg)' : ''"
          />
        </div>
        <ul v-show="premissionMenu" class="menu-premission__list">
          <li class="menu-premission__item" @click="defaultAccess($event)">
            Default access
          </li>
          <li class="menu-premission__item" @click="advancedAccess($event)">
            Advanced access
          </li>
        </ul>
      </div>
    </div>
    <button class="removeInvite" @click="removeUserMember">
      <img class="close" src="~/assets/img/close.svg" alt="close" />
    </button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class extends Vue {
  @Prop() applicationId: string;
  @Prop() userName: string;
  @Prop() specialisation: string;
  @Prop() premission!: string;
  @Prop() positionCount: string;
  choosenPermission = this.premission;

  premissionMenu = false;

  togglePermissionMenu() {
    this.premissionMenu = !this.premissionMenu;
  }

  defaultAccess($event) {
    this.premissionMenu = !this.premissionMenu;
    this.choosenPermission = "accepted";
    this.$emit("changePermission", {
      positionCount: this.positionCount,
      applicationId: this.applicationId,
      permission: $event.target.textContent.trim(),
    });
  }

  advancedAccess($event) {
    this.premissionMenu = !this.premissionMenu;
    this.choosenPermission = $event.target.textContent;
    this.$emit("changePermission", {
      positionCount: this.positionCount,

      applicationId: this.applicationId,
      permission: $event.target.textContent.trim(),
    });
  }

  removeUserMember() {
    this.$emit("changePermission", {
      positionCount: this.positionCount,
      applicationId: this.applicationId,
      permission: "Canceled",
    });
  }
}
</script>

<style lang="scss" scoped>
.team-member-card {
  max-width: 660px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  box-sizing: border-box;
  margin-bottom: 16px;

  .removeInvite {
    background-color: transparent;
  }

  .close {
    cursor: pointer;
  }

  .team-member-card__content {
    background: #2e384a;
    box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
    border-radius: 12px;
    width: 311px;
    display: flex;
    flex-direction: column;
    padding: 20px 24px;
    box-sizing: border-box;
  }

  p,
  ul {
    margin: 0;
    padding: 0;
  }

  .team-member-card__data-email {
    font-weight: normal;
    font-size: 17px;
    line-height: 32px;
  }

  .team-member-card__data-position {
    color: #8c97ac;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
  }

  .team-member-card__menu-premission {
    position: relative;
    background: #3b465a;
    border-radius: 12px;
    width: 259px;
    padding: 4px 16px;
    box-sizing: border-box;
    margin-top: 12px;
    border: 2px solid transparent;

    &.active {
      border: 2px solid #b5c1d8;
    }

    .menu-premission__header {
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

    .menu-premission__list {
      position: absolute;
      top: 55px;
      left: 0;
      background: #3b465a;
      border-radius: 12px;
      width: 263px;
      padding: 8px 0;
      font-weight: 500;
      font-size: 16px;
      line-height: 32px;
      box-sizing: border-box;
      z-index: 8;

      .menu-premission__item {
        padding: 8px 16px;
        box-sizing: border-box;
        cursor: pointer;

        &:hover {
          background: #4b4ac8;
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .team-member-card {
    .team-member-card__content {
      width: 620px;
      justify-content: space-between;
      flex-direction: row;
      padding: 16px 24px;
    }

    .team-member-card__menu-premission {
      width: 244px;
      margin-top: 0;
      padding: 8px 20px;

      .menu-premission__header {
        span {
          font-weight: 500;
          font-size: 18px;
          line-height: 32px;
        }
      }

      .menu-premission__list {
        top: 65px;
        width: 244px;
      }
    }
  }
}
</style>
