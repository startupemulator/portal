<template>
  <div class="apply-to-team">
    <nuxt-link v-if="step" to="/"
      ><button type="button" class="apply-to-team-btn-back">
        <img src="@/assets/img/arrow.svg" alt="arrow" /> Back
      </button></nuxt-link
    >
    <button
      v-else
      type="button"
      class="apply-to-team-btn-back"
      @click="changeStepOnApplyToTeam"
    >
      <img src="@/assets/img/arrow.svg" alt="arrow" /> Back
    </button>
    <transition name="slide-fade">
      <div v-if="step" class="step-1">
        <h2>Your experience</h2>
        <p>Total years of your experience</p>
        <ul class="step-1__experience">
          <li
            v-for="item in experienceYears"
            :key="item.id"
            class="experience__item"
          >
            <input v-show="false" :id="item.id" type="radio" name="years" />
            <label :for="item.id">{{ item.title }}</label>
          </li>
        </ul>
        <p>Pick technologies you have an experience with</p>

        <ul class="step-1__experience">
          <li
            v-for="item in technologies"
            :key="item.id"
            class="experience-technologies_item"
          >
            <input
              v-show="false"
              :id="item.id + '-technologies'"
              type="checkbox"
            />
            <label :for="item.id + '-technologies'">{{ item.title }}</label>
          </li>
        </ul>

        <div class="add-technologi">
          <ul class="step-1__add-technolodgy">
            <li v-for="(item, i) in technology" :key="i" class="technolodgy">
              <span>{{ item.name }}</span>
              <button class="remove-technolodgy" @click="removeTechnology(i)">
                <img src="@/assets/img/close.svg" alt="close" />
              </button>
            </li>

            <input
              class=""
              type="text"
              placeholder="Type a technology to add"
              :value="technoName"
              @keydown="addNewTechnolodgy($event)"
            />
          </ul>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="!step" class="step-2">
        <h2>Apply to Startup #1</h2>
        <div class="step-2__select">
          <div class="step-2__custom-select">
            <div class="custom-select" @click="openSelect">
              <span>{{ selectedSpeciality }}</span>
              <img
                src="@/assets/img/arrow.svg"
                alt="arrow"
                :style="
                  toggleSelect
                    ? 'transform: rotate(-90deg); transition: 1s'
                    : ''
                "
              />
            </div>
            <transition name="slide-up">
              <ul v-show="toggleSelect" class="custom-select__list">
                <li
                  v-for="item in speciality"
                  :key="item.id"
                  class="custom-select__item"
                  @click="selectSpeciality($event.target.textContent)"
                >
                  <span>{{ item.title }}</span>
                </li>
              </ul>
            </transition>
          </div>
          <textarea placeholder="Comment"></textarea>
        </div>

        <transition name="slide-fade">
          <div v-if="modalApplied" class="modal-applied">
            <div class="applied-block">
              <button type="button" class="applied__close">
                <img
                  src="@/assets/img/close.svg"
                  alt="Close"
                  @click="applyStartUp"
                />
              </button>

              <h2>You successfully applied</h2>
              <h3>
                You will receive an email notification when Product owner
                selects developer for a team. Also, you are able to apply to
                other startups.
              </h3>
              <button type="button " class="discover-startups">
                Discover More Startups
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    itemSize: null,
    technoName: "",
    toggleSelect: false,
    selectedSpeciality: "Select a speciality",
  }),
  computed: {
    ...mapState([
      "experienceYears",
      "technologies",
      "applyToTeam",
      "speciality",
      "technology",
    ]),
    step: (state) => state.applyToTeam.stepOne,
    modalApplied: (state) => state.applyToTeam.applied,
  },
  methods: {
    ...mapActions([
      "changeStepOnApplyToTeam",
      "applyStartUp",
      "addTechnology",
      "removeTechnology",
    ]),
    addNewTechnolodgy(e) {
      this.addTechnology(e);
      this.technoName = "";
    },
    openSelect() {
      this.toggleSelect = !this.toggleSelect;
    },
    selectSpeciality(e) {
      this.selectedSpeciality = e;
      this.toggleSelect = !this.toggleSelect;
    },
  },
};
</script>
