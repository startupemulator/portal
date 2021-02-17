<template>
  <div class="apply-to-team">
    <nuxt-link to="/" v-if="step"
      ><button type="button" class="apply-to-team-btn-back">
        <img src="@/assets/img/arrow.svg" alt="arrow" /> Back
      </button></nuxt-link
    >
    <button
      @click="changeStepOnApplyToTeam"
      v-else
      type="button"
      class="apply-to-team-btn-back"
    >
      <img src="@/assets/img/arrow.svg" alt="arrow" /> Back
    </button>
    <div class="step-1" v-if="step">
      <h2>Your experience</h2>
      <p>Total years of your experience</p>
      <ul class="step-1__experience">
        <li
          class="experience__item"
          v-for="item in experienceYears"
          :key="item.id"
        >
          <input :id="item.id" type="radio" name="years" v-show="false" />
          <label :for="item.id">{{ item.title }}</label>
        </li>
      </ul>
      <p>Pick technologies you have an experience with</p>

      <ul class="step-1__experience">
        <li
          class="experience-technologies_item"
          v-for="item in technologies"
          :key="item.id"
        >
          <input
            :id="item.id + '-technologies'"
            type="checkbox"
            v-show="false"
          />
          <label :for="item.id + '-technologies'">{{ item.title }}</label>
        </li>
      </ul>
    
      <div class="add-technologi">
       
        <ul class="step-1__add-technolodgy">
          
          <li class="technolodgy" v-for="(item, i) in technology" :key="i">

            <span>{{ item.name }}</span>
            <button class="remove-technolodgy" @click="removeTechnology(i)" >
              <img src="@/assets/img/Close.svg" alt="arrow" />
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
    <div class="step-2" v-if="!step">
      <h2>Apply to Startup #1</h2>
      <div class="step-2__select">
        <select v-model="user">
          <option selected>Select a speciality</option>
          <option v-for="item in speciality" :key="item.id">
            {{ item.title }}
          </option>
        </select>
        <textarea placeholder="Comment"></textarea>
      </div>
      <div class="modal-applied" v-if="modalApplied">
        <div class="applied-block">
          <button type="button" class="applied__close">
            <img
              src="@/assets/img/Close.svg"
              alt="Close"
              @click="applyStartUp"
            />
          </button>

          <h2>You successfully applied</h2>
          <h3>
            You will receive an email notification when Product owner selects
            developer for a team. Also, you are able to apply to other startups.
          </h3>
          <button type="button " class="discover-startups">
            Discover More Startups
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
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
  data: () => ({
    itemSize: null,
    technoName: ''
  }),
  methods: {
    ...mapActions(["changeStepOnApplyToTeam", "applyStartUp", "addTechnology", "removeTechnology"]),
    addNewTechnolodgy(e) {
      this.addTechnology(e);
      this.technoName = ''
    },
  },
};
</script>
