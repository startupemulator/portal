<template>
  <footer class="main-footer">
    <div class="main-footer__content">
      <ul class="main-footer__list">
        <li class="main-footer__item">
          <a href="https://t.me/startupemulator"
            ><img src="~/assets/img/telegram.svg" alt="Telegram" /><span
              >Telegram</span
            ></a
          >
        </li>
        <li class="main-footer__item">
          <a href="https://www.facebook.com/StartupEmulator"
            ><img src="~/assets/img/facebook.svg" alt="Facebook" /><span
              >Facebook</span
            ></a
          >
        </li>
        <li class="main-footer__item">
          <a href="https://github.com/startupemulator"
            ><img width="24" src="~/assets/img/github.svg" alt="Github" /><span
              >Github</span
            ></a
          >
        </li>
        <li class="main-footer__item main-footer__item-c">&nbsp;</li>
        <li class="main-footer__item main-footer__item-c design">
          <button class="flat" @click="toggleDesignPopup">
            Design by Serhii Revva
          </button>
        </li>
        <li class="main-footer__item main-footer__item-c">
          © 2020-2022
          <a href="http://github.com/kucherenko">Andrey Kucherenko</a>
        </li>
      </ul>
    </div>
    <PopupDesign
      v-show="designPopupIsOpen"
      @closePopup="toggleDesignPopup"
    ></PopupDesign>
  </footer>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import PopupDesign from "~/components/molecules/popupDesign.vue";
@Component({
  components: { PopupDesign },
})
export default class AppFooter extends Vue {
  designPopupIsOpen = false;
  toggleDesignPopup() {
    this.designPopupIsOpen = !this.designPopupIsOpen;
  }
}
</script>

<style>
a.flat {
  font-weight: normal;
}

button.flat {
  background: transparent;
  padding: 0;
  font-weight: normal;
  font-size: 16px;
  line-height: 32px;
  color: #8c97ac;
  margin-bottom: 16px;
}
</style>
