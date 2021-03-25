<template>
  <div class="team-member-card">
    <div class="team-member-card__content">
      <div class="team-member-card__data">
        <p class="team-member-card__data-email">someone@gmail.com</p>
        <p class="team-member-card__data-position">UI/UX Designer</p>
      </div>
      <div
        class="team-member-card__menu-premission"
        :class="premissionMenu ? 'active' : ''"
      >
        <div class="menu-premission__header" @click="togglePremissionMenu">
          <span>{{ choosenPremission }}</span>
          <img
            src="~/assets/img/arrow.svg"
            alt="arrow"
            :style="premissionMenu ? 'transform: rotate(-90deg)' : ''"
          />
        </div>
        <ul v-show="premissionMenu" class="menu-premission__list">
          <li class="menu-premission__item" @click="choosePremission">
            Default access
          </li>
          <li class="menu-premission__item" @click="choosePremission">
            Advanced access
          </li>
        </ul>
      </div>
    </div>
    <img class="close" src="~/assets/img/close.svg" alt="close" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
@Component({})
export default class extends Vue {
  premissionMenu = false;
  choosenPremission = "Default access";
  togglePremissionMenu() {
    this.premissionMenu = !this.premissionMenu;
  }

  choosePremission($event) {
    this.premissionMenu = !this.premissionMenu;
    this.choosenPremission = $event.target.textContent;
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
