<template>
  <div class="startup">
    <U-back :title="'Startups'" :link="'/startups-list'"></U-back>
    <div class="startUp__header">
      <U-title :text="'Startup #1'"></U-title>
      <div class="startUp__header__startup-state">Not started</div>
    </div>
    <div class="startup-card__started-start-time">
      <div class="started-start-time__start">
        <h3>Start</h3>
        <p>27 Sep 2020</p>
      </div>
      <div class="started-start-time__duration">
        <h3>Duration</h3>
        <p>3 months</p>
      </div>
    </div>
    <div v-if="isDeveloper" class="applied-startup">
      <h4>You applied to this startup as a <span>Back-end Developer</span></h4>
      <button type="button" @click="togglePopupCancelAplication">
        <span>Cancel Application</span>
        <img src="~/assets/img/arrow.svg" alt="arrow" />
      </button>
    </div>
    <div class="owneer-menu">
      <ul class="owneer-menu__list">
        <li class="owneer-menu__item">
          <button type="button">
            <span
              >Requests to Team
              <div class="owneer-menu__item--message"><span>2</span></div></span
            >
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </li>
        <li class="owneer-menu__item">
          <button type="button">
            <span>Start Startup</span>
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </li>
        <li class="owneer-menu__item">
          <button type="button">
            <span>Edit Startup Info</span>
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </li>
        <li class="owneer-menu__item">
          <button type="button">
            <span>Edit Team</span>
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </li>
        <li class="owneer-menu__item">
          <button type="button">
            <span>Edit Sources</span>
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </li>
        <li class="owneer-menu__item">
          <button type="button">
            <span>Edit Guide</span>
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </li>
        <li class="owneer-menu__item">
          <button type="button" @click="togglePopupDeleteStartUp">
            <span>Delete Startup</span>
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </li>
      </ul>
    </div>
    <p class="startup__description">
      The goal is to implement Learning Management Portal - a portal for
      managing the educational process and teaching materials as part of the
      university curriculum. Our purposes are remove the manual work of the
      teacher; combine online learning tools in one tool; give students easy
      access to materials; simplify the implementation and validation of
      practical tasks; open access to current ratings.
    </p>
    <div class="startUp__open-position">
      <h3>Open positions</h3>
      <Open-position-card
        v-for="startup in startups"
        :key="startup.id"
        :startup="startup"
      ></Open-position-card>
    </div>
    <div class="startup-card__team">
      <h3>Team</h3>
      <p>Product Owners</p>
      <button type="button" class="startup-card__team-button">
        <span>Full Name</span> <img src="~/assets/img/arrow.svg" alt="arrow" />
      </button>
    </div>
    <div class="position-card__developer__primary-button">
      <U-button
        :button-name="'Apply to Teams'"
        :button-class="'u-button-blue'"
      ></U-button>
    </div>
    <div v-show="popupCancelAplication" class="popup-cancel-application">
      <div class="popup-cancel-application__content">
        <h4>Cancel your application?</h4>
        <button
          type="button"
          class="sign-up-link__close"
          @click="togglePopupCancelAplication"
        >
          <img src="~/assets/img/close.svg" alt="Close" />
        </button>

        <div class="popup-cancel-application__buttons">
          <U-button
            :button-name="'Yes, Cancel'"
            :button-class="'u-button-blue'"
          ></U-button>
          <U-button
            :button-name="'No, Don’t Cancel'"
            :button-class="'u-button-gray'"
            @clickOnButton="togglePopupCancelAplication"
          ></U-button>
        </div>
      </div>
    </div>
    <popup-delete-start-up
      v-show="popupDeleteStartUp"
      @clickOnButton="togglePopupDeleteStartUp"
      @closePopupLinkEmail="togglePopupDeleteStartUp"
    ></popup-delete-start-up>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import OpenPositionCard from "~/components/molecules/openPositionCard.vue";
import { Startup } from "~/models/Startup";
import UButton from "~/components/atoms/uButton.vue";
import PopupDeleteStartUp from "~/components/molecules/popupDeleteStartUp.vue";
@Component({
  components: { UBack, UButton, UTitle, OpenPositionCard, PopupDeleteStartUp },
})
export default class AppHeader extends Vue {
  @Prop() startups: Array<Startup>;
  popupCancelAplication = Boolean(false);
  isDeveloper = Boolean(false);
  isOwner = Boolean(true);
  popupDeleteStartUp = Boolean(false);
  togglePopupCancelAplication() {
    this.popupCancelAplication = !this.popupCancelAplication;
  }

  togglePopupDeleteStartUp() {
    this.popupDeleteStartUp = !this.popupDeleteStartUp;
  }
}
</script>
