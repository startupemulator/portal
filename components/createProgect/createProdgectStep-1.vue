<template>
  <div class="createProgect-step1">
    <div class="startup__name">
      <h4>Startup name</h4>
      <input type="text" placeholder="Enter the startup name" required />
    </div>
    <div class="startup__description" required>
      <h4>Description</h4>
      <textarea
        placeholder="Describe your idea and main goals of your startup to interest developers to join your team"
      ></textarea>
      <div class="startup__start-date">
        <h4>Start date</h4>
        <!-- {{ "startDay" + startDay }} -->
        <!-- {{ "startMonth" + startMonth }} -->
        <div class="start-date__row">
          <img src="@/assets/img/calendar.svg" alt="Calendar" />
          <div class="start-date__col1">
            <input
              v-model="startDay"
              type="number"
              placeholder="DD"
              required
              @input="checkinput('startDay')"
            />
          </div>

          <div class="start-date__col2">
            <input
              v-model="startMonth"
              type="number"
              placeholder="MM"
              required
              @input="checkinput('startMonth')"
            />
          </div>

          <div class="start-date__col3">
            <input
              v-model="startYear"
              type="number"
              placeholder="YYYY"
              required
              @input="checkinput('startYear')"
            />
          </div>
        </div>
      </div>
      <div class="startup__finish-date">
        <Duration-picker :title="'Estimated duration'"></Duration-picker>
        <Add-input :placeholder="'Or enter the number of days'"></Add-input>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import DurationPicker from "~/components/theme/DurationPicker";
import AddInput from "~/components/theme/AddInput";
// import createProdgectStep1 from "./createProdgectStep-1.vue";
// import CreateProdgectStep2 from "./createProdgectStep-2.vue";
export default {
  components: {
    DurationPicker,
    AddInput,
  },
  // components: { createProdgectStep1, CreateProdgectStep2 },
  data: () => ({
    startDay: "",
    startMonth: "",
    startYear: "",
    finishDay: "",
    finishMonth: "",
    finishYear: "",
    message: "",
  }),
  computed: {
    ...mapState(["device", "createprodjectSteps"]),
  },

  methods: {
    checkinput(key) {
      // function startCheck (name){
      //   if(key = 'startDay'){
      // if(name[0] > 3 || isNaN(name)){
      //   name = ''
      //   return
      // }else if(name.length > 2){
      //   name = name.toString().substr(0, 2)
      // }}
      // }
      // switch (key) {
      //   case "startDay":
      //     startCheck (this.startDay)
      //     break;
      //   case "startMonth":
      //     console.log(this.startMonth);
      //     break;
      //   case "startYear":
      //     console.log(this.startYear);
      //     break;
      //   case "finishDay":
      //     console.log(this.finishDay);
      //     break;
      //   case "finishMonth":
      //     console.log(this.finishMonth);
      //     break;
      //   case "startMonth":
      //     console.log(this.startMonth);
      //     break;
      //   case "finishYear":
      //     console.log(this.finishYear);
      //     break;
      // }
      // return null;
      // if(type = 'startDay'){
      // if(this.startDay[0] > 3 || isNaN(this.startDay)){
      //   this.startDay = ''
      //   return
      // }else if(this.startDay.length > 2){
      //   this.startDay = this.startDay.toString().substr(0, 2)
      // }}
    },
  },
};
</script>
