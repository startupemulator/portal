<template>
  <div class="pricing">
    <h4>Pricing</h4>
    <div class="pricing__cards">
      <div class="pricing__card">
        <div class="pricing__card-header">
          <h5>Junior</h5>
        </div>
        <div class="pricing__card-content">
          <h3>Free</h3>
          <ul class="pricing__card-content-list">
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text written </span>
            </li>
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text</span>
            </li>
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text written </span>
            </li>
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text </span>
            </li>
          </ul>
        </div>

        <UButton
          :button-name="'Sign Up'"
          :button-class="'u-button-gray'"
          :is-link="'nuxt-link'"
          :href="'logIn'"
        ></UButton>
      </div>
      <div class="pricing__card senior-card">
        <div class="pricing__card-header">
          <div class="free-in-beta"><span>Free in the Beta</span></div>
          <h5>Senior</h5>
        </div>
        <div class="pricing__card-content">
          <h3>$50 <span>/ per project</span></h3>
          <ul class="pricing__card-content-list">
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text written </span>
            </li>
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text</span>
            </li>
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text written </span>
            </li>
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text </span>
            </li>
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text </span>
            </li>
          </ul>
        </div>

        <UButton
          :button-name="'Sign Up'"
          :button-class="'u-button-blue'"
          :is-link="'nuxt-link'"
          :href="'createAccount'"
        ></UButton>
      </div>
      <div class="pricing__card">
        <div class="pricing__card-header">
          <h5>Enterprise</h5>
        </div>
        <div class="pricing__card-content">
          <h3>Individual</h3>
          <ul class="pricing__card-content-list">
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text written </span>
            </li>
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text</span>
            </li>
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text written </span>
            </li>
            <li class="pricing__card-content-item">
              <img src="~assets/img/check-circle.svg" alt="check circle" />
              <span>Point with long text written </span>
            </li>
          </ul>
        </div>

        <UButton
          :button-name="'Contact Us'"
          :button-class="'u-button-gray'"
          :is-link="'nuxt-link'"
          :href="'/'"
        ></UButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";
@Component({ components: { UButton } })
export default class extends Vue {}
</script>
<style lang="scss" scoped>
.pricing {
  color: #fff;
  // padding: 0 16px;
  box-sizing: border-box;
  width: 343px;
  margin: 0 auto;
  ul {
    padding: 0;
  }
  h4 {
    font-weight: bold;
    font-size: 36px;
    line-height: 40px;
    margin: 22px 0 24px 0;
  }
  .pricing__cards {
    .pricing__card {
      padding: 32px 24px 32px 24px;
      background: #2e384a;
      border-radius: 12px;
      margin-bottom: 16px;

      .pricing__card-header {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        h5 {
          font-weight: normal;
          font-size: 24px;
          line-height: 32px;
          margin: 0;
        }
        .free-in-beta {
          position: relative;
          background: #283040;
          box-shadow: inset 2px -2px 8px rgba(28, 35, 48, 0.25);
          border-radius: 0 12px 0 16px;
          margin-left: auto;
          right: -24px;
          top: -32px;
          margin-bottom: -24px;
          padding: 10px 8px;
          span {
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            background: #199eb6;
            box-shadow: 0 -2px 8px rgba(25, 158, 182, 0.3),
              0 2px 8px rgba(25, 158, 182, 0.3),
              inset 0 -2px 4px 1px rgba(25, 158, 182, 0.15),
              inset 0 1px 4px rgba(255, 255, 255, 0.15);
            border-radius: 14px;
            padding: 5px 12px;
          }
        }
      }
      .pricing__card-content {
        h3 {
          font-weight: bold;
          font-size: 36px;
          line-height: 40px;
          margin: 24px 0;
          span {
            color: #8c97ac;
            font-weight: normal;
            font-size: 17px;
            line-height: 24px;
          }
        }
        .pricing__card-content-item {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          span {
            margin-left: 8px;
            font-weight: normal;
            font-size: 17px;
            line-height: 24px;
            color: #dbe4f3;
          }
        }
      }
    }
  }
  .u-button {
    margin-top: 8px;
    height: 40px;
  }
}
@media (min-width: 767px) {
  .pricing {
    width: 768px;
    h4 {
      margin-left: 48px;
      font-weight: 800;
      font-size: 69px;
      line-height: 80px;
      margin-top: 170px;
    }
    .pricing__cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 24px;
    }
  }
}
@media (min-width: 1024px) {
  .pricing {
    width: 1024px;

    .pricing__cards {
      display: flex;
      justify-content: center;
      gap: 0;

      .pricing__card {
        margin-right: 24px;
      }
    }
  }
}
@media (min-width: 1344px) {
  .pricing {
    padding: 0;
    width: 1344px;
    box-sizing: border-box;

    h4 {
      font-weight: 800;
      font-size: 69px;
      line-height: 80px;
    }
    .pricing__cards {
      display: flex;
      justify-content: center;
      margin-top: 94px;
      // margin-left: 20px;
      flex-wrap: nowrap;
      .pricing__card {
        padding: 56px;
        margin-bottom: 0;
        margin-right: 24px;
        max-height: 524px;
        box-sizing: border-box;
        .pricing__card-header {
          .free-in-beta {
            right: -56px;
            top: -56px;
            padding: 14px 12px;
            margin-bottom: -32px;
          }
        }
        &.senior-card {
          min-height: 584px;
          max-height: 584px;
          margin-top: -32px;
        }
        .pricing__card-content {
          h3 {
            font-weight: 800;
            font-size: 56px;
            line-height: 64px;
            margin: 32px 0;
          }
          .pricing__card-content-item {
            margin-bottom: 20px;
          }
        }
      }
    }
    .u-button {
      margin-top: 20px;
      height: 56px;
      width: 320px;
    }
  }
}
</style>
