<template>
  <div class="apply-to-team">
    <nuxt-link to="/"
      ><button type="button" class="apply-to-team-btn-back">
        <img src="@/assets/img/arrow.svg" alt="arrow" /> Back
      </button></nuxt-link
    >
    <div class="step-1">
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
        <li class="experience-technologies_item" 
        v-for="item in technologies"
         :key="item.id"
         >
          <input :id="item.id + '-technologies'" type="checkbox" v-show="false"/>
          <label :for="item.id + '-technologies'">{{ item.title }}</label>
        </li>
      </ul>
      <input class="add-technologi" type="text" placeholder="Type a technology to add"  />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {

  data: () => ({
    
    
  }),
  computed: {
      ...mapState(["experienceYears", "technologies"])
    }
};
</script>
