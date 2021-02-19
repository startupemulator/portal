<template>
  <div class="createProgect-step2" >
    <h2>Select specialities for your team</h2>
    <h3>Add all the specialities that you need in your team. During reviewing candidates you will be able to accept as much candidates as you need for each speciality.</h3>
    <div class="specialityOne">
      <p>Speciality 1</p>
      <div class="specialityOne__list">
        
        <div class="specialityOne__item" @click="openSpeciality = !openSpeciality">
          <span>Select a speciality</span>  <img src="@/assets/img/arrow.svg" alt="arrow" 
          :style="openSpeciality ? 'transform: rotate(-90deg); transition: 1s' : '' " />
          </div>
          <ul class="specialityOne__item-list" v-show="openSpeciality">
            <li class="specialityOne__item-item">Front-end</li>
            <li class="specialityOne__item-item">Back-end</li>
             <li class="specialityOne__item-item">Front-end</li>
            <li class="specialityOne__item-item">Back-end</li>
          </ul>
        
        <button class="specialityOne__button">Add Speciality</button>
      </div>
    </div>
    <div class="invite-collegues">
<h5>You can also invite your collegues <p >to the team as developers or as product owners.</p> </h5>
<button class="invite-collegues__button">Invite Collegues</button>
    </div>
    <div class="technologi-popup" v-if="createprodjectSteps.technologi" >
      <div class="technologi-popup__pick-technology step-1">
        <div class="pick-technology__content">
          <h2>Pick technologies you need to use within <span>Front-end</span>  developer speciality</h2>
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
        <input type="text" placeholder="Type a technology to add">
        </div>
        
        
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    openSpeciality: false
  }),
 computed:{
   ...mapState(['createprodjectSteps', 'technologies'], )
 },
 methods:{
   ...mapActions([])
 }
 
};
</script>
