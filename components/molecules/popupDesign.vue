<template>
  <div class="design-popup popup">
    <div class="design-popup__content">
      <button
        type="button"
        class="popup__content-link__close"
        @click="$emit('closePopup')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <div class="popup__content__design-photo">
        <img
          class="popup__content_design-image"
          src="~/assets/img/design2x.jpg"
          alt="profile-image"
        />
      </div>

      <h2>Serhii Revva</h2>
      <div class="popup__content-linkedin">
        <img src="~/assets/img/linkedin.svg" alt="linkedin" />
        <a href="https://www.linkedin.com/in/serhiirevva/" target="_blank"
          >Get in touch in Linked In</a
        >
      </div>
      <div class="popup__content-honor">
        <img
          src="~/assets/img/Award.svg"
          alt="honor"
          width="24px"
          height="24px"
        />
        <div class="popup__content_honor-description">
          <span
            >This design won the 2021 ADC*UA Award in the category «G-3 Young
            Creative — Graphic/Product Design». The video presentation is
            available by the link:
          </span>
          <a href="https://adc.ua/winners/2021/1012/" target="_blank"
            >https://adc.ua/winners/2021/1012/</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class extends Vue {}
</script>
<style lang="scss" scoped>
.design-popup {
  .design-popup__content {
    width: 343px;
    height: 600px;
    top: 77px;
    margin: 0 auto;
    padding: 16px 16px 32px;
    background: #232b39;
    border-radius: 12px;
    box-sizing: border-box;
    margin-top: 77px;
    position: relative;
  }

  .popup__content-link__close {
    position: absolute;
    background-color: transparent;
    right: 10px;
    top: 16px;
  }

  .popup__content__design-photo {
    margin: 0 auto;
    margin-top: 56px;
    border-radius: 12px;
    width: 224px;
    height: 184px;
    display: flex;
    justify-content: center;
    background: radial-gradient(
      50.8% 60.33% at 50% 39.67%,
      rgba(40, 49, 66, 0.8) 64.4%,
      rgba(58, 76, 113, 0.8) 100%
    );

    img {
      border-radius: 15px;
      position: relative;
      width: 160px;
      height: 176px;
      top: -16px;
      clip: rect(40px 250px 160px 50px);
    }
  }

  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    text-align: center;
    margin-top: 24px;
    margin-bottom: 0;
  }

  .popup__content-linkedin {
    display: flex;
    justify-content: center;

    a {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 32px;
      color: #8c97ac;
      margin-top: 4px;
      margin-left: 8px;
    }
  }

  .popup__content-honor {
    display: flex;
    width: 295px;
    height: 188px;
    background: #2e384a;
    border-radius: 12px;
    margin: 24px auto;
    color: #dbe4f3;

    img {
      margin: 24px 20px 0 24px;
    }

    .popup__content_honor-description {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #dbe4f3;
      margin: 24px 24px 24px 0;
    }

    a {
      word-break: break-all;
      color: #dbe4f3 !important;
      text-decoration: underline;
    }
  }
}
@media (min-width: 768px) {
  .design-popup {
    .design-popup__content {
      width: 564px;
      height: 552px;
      top: 174px;
    }

    .popup__content-honor {
      width: 468px;
      height: 128px;

      img {
        margin: 24px 20px 0 24px;
      }

      .popup__content_honor-description {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
