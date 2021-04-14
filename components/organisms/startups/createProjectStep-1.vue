<template>
  <div class="createProject-step1">
    <div class="startup__name">
      <h4>Startup name</h4>
      <input
        v-model="title"
        type="text"
        placeholder="Enter the startup name"
        required
      />
    </div>
    <div class="startup__description" required>
      <h4>Description</h4>
      <textarea
        v-model="description"
        placeholder="Describe your idea and main goals of your startup to interest developers to join your team"
      ></textarea>
      <div class="startup__start-date">
        <h4>Start date</h4>
        <DatePicker
          v-model="date"
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
        <Duration-picker
          :title="'Estimated duration'"
          @clickOnDuration="chooseDuration"
        ></Duration-picker>
        <Add-input
          :placeholder="'Or enter the number of days'"
          :length="1"
          @addDuration="addDuration"
        ></Add-input>
      </div>
    </div>
    <div class="createProject-step1__buttons">
      <U-button
        :button-name="'Next'"
        :button-class="'u-button-blue'"
        @clickOnButton="goToStepTwo"
      ></U-button>
      <U-button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
        @clickOnButton="test"
      ></U-button>
    </div>
  </div>
</template>

<script lang="ts">
import DatePicker from "vue2-datepicker";
import { Component, Vue } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";
import DurationPicker from "~/components/molecules/durationPicker.vue";
import AddInput from "~/components/atoms/addInput.vue";

@Component({
  components: { DatePicker, UButton, DurationPicker, AddInput },
})
export default class extends Vue {
  date: String = "";
  title: String = "";
  description: String = "";
  start_date: Date = new Date();
  duration: String = "";
  numberDays: String = "";
  technologies: Array<[string | boolean]>;

  test() {
    console.log(this.title + " - title");
    console.log(this.description + " - description");
    console.log(this.date.split("  |  ").join(".") + " - date");
    console.log(this.duration + " - duration");
  }

  chooseDuration(el: { [key: string]: any }) {
    if (el.checked) {
      this.duration = el.title;
    } else this.duration = "";
  }

  addDuration(duration: { [key: string]: any }) {
    this.duration = duration[duration.length - 1].name;
  }

  goToStepTwo() {
    const firstStepData = {
      title: this.title,
      description: this.description,
      date: this.date.split("  |  ").join("."),
      duration: this.duration,
    };
    this.$emit("goToStepTwo", firstStepData);
  }
}
</script>
<style lang="scss">
.startup__name input {
  border: 2px solid transparent;
  &:focus {
    border: 2px solid #b5c1d8;
  }
}
</style>
