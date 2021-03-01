<template>
  <div class="createProgect-step2">
    <h2>Select specialities for your team</h2>
    <h3>
      Add all the specialities that you need in your team. During reviewing
      candidates you will be able to accept as much candidates as you need for
      each speciality.
    </h3>
    <div class="specialityOne">
      <p>Speciality 1</p>
      <div class="specialityOne__list">
        <div
          class="specialityOne__item"
          :class="
            choosenSpeciality !== 'Select a speciality' ? 'item-choosen' : ''
          "
          @click="openSpeciality = !openSpeciality"
        >
          <span>{{ choosenSpeciality }}</span>
          <img
            src="@/assets/img/arrow.svg"
            alt="arrow"
            :style="
              openSpeciality ? 'transform: rotate(-90deg); transition: 1s' : ''
            "
          />
        </div>
        <button
          v-show="choosenSpeciality !== 'Select a speciality'"
          class="button-remove-speciality"
          type="button"
          @click="clearSpeciality"
        >
          <img src="@/assets/img/close.svg" alt="" />
        </button>
        <ul v-show="openSpeciality" class="specialityOne__item-list">
          <li
            v-for="item in speciality"
            :key="item.id"
            class="specialityOne__item-item"
            @click="chosespeciality($event.target)"
          >
            {{ item.specialityPosition }}
          </li>
        </ul>
        <ul>
          <li v-for="(item, i) in pickedTechnology" :key="i">
            {{ item.title }}
          </li>
        </ul>
        <button
          v-show="choosenSpeciality !== 'Select a speciality'"
          type="button"
          class="button_pick_technologies"
          @click="popupPickTechnology = !popupPickTechnology"
        >
          Pick technologies for this speciality
        </button>

        <button class="specialityOne__button">Add Speciality</button>
      </div>
    </div>
    <div class="invite-collegues">
      <h5>
        You can also invite your collegues
        <p>to the team as developers or as product owners.</p>
      </h5>
      <button class="invite-collegues__button">Invite Collegues</button>
    </div>
    <div v-show="popupPickTechnology" class="technologi-popup">
      <div class="technologi-popup__pick-technology step-1">
        <div class="pick-technology__content">
          <h2>
            Pick technologies you need to use within
            <span>{{ choosenSpeciality }}</span> developer speciality
          </h2>
          <div class="step-1__experience">
            <Technologi-Piker @chosenTechnologi="mychosenTechnologi">
            </Technologi-Piker>
          </div>
          <input type="text" placeholder="Type a technology to add" />
          <div class="createProgect-step2__buttons-popup">
            <U-button
              :button-name="'Save'"
              :button-class="'u-button-blue'"
              @clickOnButton="$emit('goToStepTwo')"
            ></U-button>
            <U-button
              :button-name="'Skip'"
              :button-class="'u-button-transpend'"
              @clickOnButton="popupPickTechnology = !popupPickTechnology"
            ></U-button>
          </div>
        </div>
      </div>
    </div>
    <div class="createProgect-step1__buttons">
      <U-button
        :button-name="'Next'"
        :button-class="'u-button-blue'"
        @clickOnButton="$emit('goToStepTwo')"
      ></U-button>
      <U-button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
      ></U-button>
    </div>
  </div>
</template>
<script>
// import { mapState, mapActions } from "vuex";
import UButton from "~/components/theme/UButton";
import TechnologiPiker from "~/components/theme/technologiPiker";
export default {
  components: {
    UButton,
    TechnologiPiker,
  },
  data: () => ({
    openSpeciality: false,
    choosenSpeciality: "Select a speciality",
    popupPickTechnology: false,
    speciality: [
      { id: 0, specialityPosition: "Front-end" },
      { id: 1, specialityPosition: "Back-end" },
      { id: 2, specialityPosition: "DevOps" },
      { id: 3, specialityPosition: "Seo" },
    ],
    pickedTechnology: [],
  }),
  computed: {
    // ...mapState(["createprodjectSteps", "technologies"]),
  },
  methods: {
    chosespeciality(e) {
      this.choosenSpeciality = e.textContent;
      this.openSpeciality = !this.openSpeciality;
    },
    clearSpeciality() {
      this.choosenSpeciality = "Select a speciality";
    },
    mychosenTechnologi(pickedTechnology) {
      this.pickedTechnology = pickedTechnology;
    },
  },
};
</script>
