<template>
  <div class="createProject-step1">
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
        <DatePicker
          v-model="time1"
          value-type="format"
          format="DD  |  MM  |  YYYY"
          placeholder="DD  |  MM  |  YYYY"
          prefix-class="xmx"
        >
          <i slot="icon-calendar">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="3"
                width="20"
                height="18"
                rx="1"
                stroke="#8C97AC"
                stroke-width="2"
              />
              <path
                d="M6 1V5"
                stroke="#8C97AC"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M18 1V5"
                stroke="#8C97AC"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path d="M2 9H22" stroke="#8C97AC" stroke-width="2" />
              <rect x="5" y="12" width="2" height="2" fill="#8C97AC" />
              <rect x="9" y="12" width="2" height="2" fill="#8C97AC" />
              <rect x="13" y="12" width="2" height="2" fill="#8C97AC" />
              <rect x="17" y="12" width="2" height="2" fill="#8C97AC" />
              <rect x="5" y="16" width="2" height="2" fill="#8C97AC" />
              <rect x="9" y="16" width="2" height="2" fill="#8C97AC" />
              <rect x="13" y="16" width="2" height="2" fill="#8C97AC" />
              <rect x="17" y="16" width="2" height="2" fill="#8C97AC" />
            </svg> </i
        ></DatePicker>
        <!-- <div class="start-date__row">
          <img src="~/assets/img/calendar.svg" alt="Calendar" />
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
        </div> -->
      </div>
      <div class="startup__finish-date">
        <Duration-picker :title="'Estimated duration'"></Duration-picker>
        <Add-input :placeholder="'Or enter the number of days'"></Add-input>
      </div>
    </div>
    <div class="createProject-step1__buttons">
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
import { mapState } from "vuex";
import DatePicker from "vue2-datepicker";
import UButton from "~/components/atoms/uButton.vue";
import DurationPicker from "~/components/molecules/durationPicker";
import AddInput from "~/components/atoms/addInput";
export default {
  components: {
    UButton,
    DurationPicker,
    AddInput,
    DatePicker,
  },
  data() {
    return {
      time1: null,
    };
  },

  // data: () => ({
  //   startDay: "",
  //   startMonth: "",
  //   startYear: "",
  //   finishDay: "",
  //   finishMonth: "",
  //   finishYear: "",
  //   message: "",
  //   time1: null,
  // }),

  computed: {
    ...mapState(["device", "createprodjectSteps"]),
  },

  methods: {
    checkinput(key) {},
  },
};
</script>
<style lang="scss">
.startup__name input {
  border: 2px solid transparent;
  &:focus {
    border: 2px solid #b5c1d8;
  }
}
</style>
