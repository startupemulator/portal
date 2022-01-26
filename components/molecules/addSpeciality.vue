<template>
  <div class="add-speciality">
    <p class="add-speciality__title">Speciality 1</p>
    <div class="add-speciality__menu">
      <div
        class="add-speciality__menu--choosen-speciality"
        @click="toggleMenuList"
      >
        <span>{{ choosenSpeciality }}</span>
        <img src="~/assets/img/arrow.svg" alt="arrow" />
      </div>
      <ul v-show="menuList" class="add-speciality__menu-list">
        <li class="add-speciality__menu-item" @click="choseSpeciality">
          Front-end Developer
        </li>
        <li class="add-speciality__menu-item" @click="choseSpeciality">
          Back-end Developer
        </li>
        <li class="add-speciality__menu-item" @click="choseSpeciality">
          Front-end Developer
        </li>
      </ul>
      <img class="close" src="~assets/img/close.svg" alt="close" />
    </div>
    <div class="add-speciality__technologies">
      <U-Tags v-for="(item, i) in 9" :key="i" :title="'Javascript'"></U-Tags>
      <U-Button
        :button-class="'u-button-transpend'"
        :button-name="'Edit technologies'"
        @clickOnButton="togglePopupTechnologies"
      ></U-Button>
    </div>
    <div
      v-show="popupTechnologies"
      class="add-speciality__popup-choose-techonogies"
    >
      <div class="add-speciality__popup-choose-techonogies__content">
        <p>
          Pick technologies you need to use within {{ choosenSpeciality }}
          speciality
        </p>
        <Technology-Picker></Technology-Picker>
        <div class="add-speciality__content-buttons">
          <U-button
            :button-name="'Save'"
            :button-class="'u-button-blue'"
          ></U-button>
          <U-button
            :button-name="'Skip'"
            :button-class="'u-button-gray'"
            @clickOnButton="togglePopupTechnologies"
          ></U-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import UTags from "~/components/atoms/uTags.vue";
import UButton from "~/components/atoms/uButton.vue";

@Component({
  components: { UTags, UButton, TechnologyPicker },
})
export default class extends Vue {
  menuList = false;
  popupTechnologies = false;
  choosenSpeciality = "Front-end Developer";
  toggleMenuList() {
    this.menuList = !this.menuList;
  }

  togglePopupTechnologies() {
    this.popupTechnologies = !this.popupTechnologies;
  }

  choseSpeciality($event) {
    this.choosenSpeciality = $event.target.textContent;
    this.menuList = !this.menuList;
  }
}
</script>
<style lang="scss">
.add-speciality {
  margin-bottom: 16px;

  ul {
    margin: 0;
    padding: 0;
  }

  .add-speciality__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 10px;
  }

  .add-speciality__menu {
    display: flex;
    position: relative;
    justify-content: space-between;

    img {
      transform: rotate(90deg);
    }

    .add-speciality__menu--choosen-speciality {
      min-width: 304px;
      max-width: 620px;
      height: 48px;
      background: #2e384a;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .add-speciality__menu-list {
      position: absolute;
      top: 58px;
      background: #2e384a;
      border-radius: 12px;
      min-width: 304px;
      max-width: 620px;
      padding: 8px 0;
      box-sizing: border-box;
      z-index: 6;

      li {
        padding: 8px 16px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        cursor: pointer;

        &:hover {
          background: #4b4ac8;
        }
      }
    }

    .close {
      cursor: pointer;
    }
  }

  .add-speciality__technologies {
    margin-top: 16px;

    .tags-item {
      padding: 0 16px;
      color: #b5c1d8;
      font-weight: normal;
      font-size: 14px;
      line-height: 32px;
      margin-bottom: 0;
    }

    .u-button-transpend {
      width: 158px;
      color: #8c97ac;
      text-decoration-line: underline;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
    }
  }

  .add-speciality__popup-choose-techonogies {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(59, 70, 90, 0.6);
    backdrop-filter: blur(16px);
    z-index: 8;

    .add-speciality__popup-choose-techonogies__content {
      position: absolute;
      bottom: 0;
      left: 0;
      background: #232b39;
      border-radius: 12px 12px 0 0;
      padding: 16px;
      padding-bottom: 100px;
      //   padding-top: 60px;
      box-sizing: border-box;
      height: 760px;
      overflow: auto;

      p {
        font-weight: bold;
        font-size: 26px;
        line-height: 32px;
        margin-top: 40px;
        margin-bottom: 32px;
      }
    }

    .add-speciality__content-buttons {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 16px 16px 24px 16px;
      box-sizing: border-box;
      height: 92px;
      background: #232b39;
      border: 1px solid #3b465a;
      box-shadow: inset 0 0 10px 2px #262f3f;
      border-radius: 16px 16px 0 0;
      display: flex;

      .u-button-gray {
        margin-top: 0;
        background: transparent;
        box-shadow: none;
        width: 100px;
        height: 48px;
        border: none;
        color: #8c97ac;
        font-weight: 600;
        font-size: 16px;
        line-height: 32px;
      }

      .u-button-blue {
        width: 245px;
        height: 48px;
        font-weight: 600;
        font-size: 16px;
        line-height: 32px;
      }
    }
  }
}
@media (min-width: 768px) {
  .add-speciality {
    margin-bottom: 24px;

    .add-speciality__title {
      font-weight: 500;
      font-size: 17px;
      line-height: 32px;
    }

    .add-speciality__menu {
      .add-speciality__menu--choosen-speciality {
        min-width: 620px;
        max-width: 620px;
        height: 56px;
        padding: 12px 24px;
      }

      .add-speciality__menu-list {
        top: 66px;
        min-width: 620px;
        max-width: 620px;
        padding: 12px 0;

        li {
          padding: 12px 24px;
          font-weight: 500;
          font-size: 17px;
          line-height: 32px;
        }
      }
    }

    .add-speciality__technologies {
      margin-top: 8px;

      .tags-item {
        padding: 0 16px;
        color: #b5c1d8;
        font-weight: normal;
        font-size: 14px;
        line-height: 32px;
        margin-bottom: 0;
      }

      .u-button-transpend {
        width: 158px;
        color: #8c97ac;
        text-decoration-line: underline;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
}
@media (min-width: 1440px) {
  .add-speciality {
    .add-speciality__popup-choose-techonogies {
      .add-speciality__popup-choose-techonogies__content {
        width: 660px;
        height: 516px;
        left: 390px;
        top: 121px;
        padding: 56px;
        padding-top: 60px;
        // overflow: hidden;
        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background: #6295fc;
        }

        p {
          font-weight: bold;
          font-size: 35px;
          line-height: 40px;
          margin-top: 0;
          margin-bottom: 32px;
          max-width: 500px;
        }

        .technology-picker {
          .input-technology {
            width: 532px;
          }
        }
      }

      .add-speciality__content-buttons {
        position: static;
        padding: 16px 16px 24px 16px;
        background: transparent;
        border: 0;
        box-shadow: none;
        border-radius: 0;
        flex-direction: row-reverse;

        .u-button-gray {
          margin-top: 0;
          background: transparent;
          box-shadow: none;
          width: 80px;
          height: 48px;
          border: none;
          color: #8c97ac;
          font-weight: 600;
          font-size: 16px;
          line-height: 32px;
        }

        .u-button-blue {
          width: 466px;
          height: 48px;
          font-weight: 600;
          font-size: 16px;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
