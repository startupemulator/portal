<template>
  <div class="guide-popup">
    <div class="guide-popup__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopup')"
      >
        <img src="~/assets/img/close.svg" alt="Close" />
      </button>
      <U-Title :text="'Guide'"></U-Title>

      <div v-for="guide in startup.secrets" :key="guide.id" class="guide">
        <h4>{{ guide.title }}</h4>
        <p
          v-if="
            guide.description.split(':')[0] !== 'https' &&
            guide.description.split(':')[0] !== 'http'
          "
        >
          {{ guide.description }}
        </p>
        <a v-else target="_blank" :href="guide.description">{{
          guide.description
        }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTitle from "../atoms/uTitle.vue";
import { Startup } from "~/models/Startup";

@Component({
  components: {
    UTitle,
  },
})
export default class extends Vue {
  @Prop() startup: Array<Startup>;
}
</script>
<style lang="scss" scoped>
.guide-popup {
  position: fixed;
  background: rgba(59, 70, 90, 0.6);
  backdrop-filter: blur(16px);
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 6;
  display: flex;
  align-items: flex-end;

  .guide-popup__content {
    position: relative;
    padding: 16px 24px 64px 24px;
    width: 100%;
    height: 430px;
    box-sizing: border-box;
    background: #232b39;
    border-radius: 12px;

    .sign-up-link__close {
      position: absolute;
      right: 10px;
      top: 16px;
      background: transparent;
    }

    h2 {
      font-weight: bold;
      font-size: 26px;
      line-height: 32px;
      margin-bottom: 16px;
    }

    h4 {
      font-weight: 600;
      font-size: 17px;
      line-height: 32px;
      margin-top: 0;
      margin-bottom: 4px;
    }

    p {
      margin: 0;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
    }

    .guide {
      margin-top: 20px;
    }

    a {
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      color: #fff !important;
      display: inline-block;
      word-break: break-all;
    }
  }
}
@media (min-width: 1440px) {
  .guide-popup {
    align-items: center;
    justify-content: center;

    .guide-popup__content {
      width: 564px;
      height: auto;
      padding: 48px 48px 48px 48px;

      h2 {
        font-weight: bold;
        font-size: 35px;
        line-height: 40px;
        margin-top: 0;
      }

      h4 {
        font-weight: 600;
        font-size: 18px;
        line-height: 32px;
      }

      p {
        font-weight: normal;
        font-size: 17px;
        line-height: 24px;
      }

      .guide {
        font-weight: 600;
        font-size: 18px;
        line-height: 32px;
      }

      a {
        font-weight: normal;
        font-size: 17px;
        line-height: 24px;
      }
    }
  }
}
</style>
