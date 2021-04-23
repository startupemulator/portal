<template>
  <div class="createProject-step1">
    <div class="startup__name">
      <h4>Startup name</h4>
      <input
        v-model.trim="$v.title.$model"
        type="text"
        placeholder="Enter the startup name"
      />
    </div>
    <p v-show="!$v.title.minLength" class="errorInput">
      Please enter a startup name of at least 8 characters
    </p>
    <div class="startup__description">
      <h4>Description</h4>
      <textarea
        v-model.trim="$v.description.$model"
        placeholder="Describe your idea and main goals of your startup to interest developers to join your team"
      ></textarea>
      <p v-show="!$v.description.minLength" class="errorInput">
        Please enter a description name of at least 8 characters
      </p>
      <div class="startup__start-date">
        <h4>Start date</h4>
        <DatePicker
          v-model.trim="$v.date.$model"
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
        <p v-show="!$v.date.required" class="errorInput">Please enter a date</p>
      </div>
      <div class="startup__finish-date">
        <Duration-picker
          :title="'Estimated duration'"
          :duration="duration"
          :estimations="estimations"
          @clickOnDuration="chooseDuration"
        ></Duration-picker>
        <Add-input
          :placeholder="'Or enter the number of days'"
          :length="1"
          :duration="duration"
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
        @clickOnButton="$emit('saveDraft')"
      ></U-button>
    </div>
  </div>
</template>

<script lang="ts">
import DatePicker from "vue2-datepicker";
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { required, minLength } from "vuelidate/lib/validators";
import UButton from "~/components/atoms/uButton.vue";
import DurationPicker from "~/components/molecules/durationPicker.vue";
import AddInput from "~/components/atoms/addInput.vue";
import { Estimations } from "~/models/Estimations";

@Component({
  validations: {
    title: {
      required,
      minLength: minLength(8),
    },
    description: {
      required,
      minLength: minLength(8),
    },
    date: {
      required,
    },
  },
  components: { DatePicker, UButton, DurationPicker, AddInput },
})
export default class extends Vue {
  @Prop() startUpData!: Array<any>;
  @Prop() estimations: Array<Estimations>;

  date: String = this.startUpData.date ? this.startUpData.date : "";
  title: String = this.startUpData.title ? this.startUpData.title : "";

  description: String = this.startUpData.description
    ? this.startUpData.description
    : "";

  start_date: Date = new Date();
  duration: String = this.startUpData.duration ? this.startUpData.duration : "";

  numberDays: String = "";
  technologies: Array<[string | boolean]>;

  chooseDuration(el: { [key: string]: any }) {
    console.log(el);

    this.duration = el.title;
  }

  addDuration(duration: { [key: string]: any }) {
    this.duration = duration[duration.length - 1].name;
  }

  goToStepTwo() {
    const firstStepData = {
      title: this.title,
      description: this.description,
      // date: this.date.split("  |  ").join("."),
      date: this.date,
      duration: this.duration,
    };
    this.$emit("goToStepTwo", firstStepData);
  }
}
</script>
<style lang="scss">
.createProject-step1 {
  .errorInput {
    top: 0;
  }
}
.startup__name input {
  border: 2px solid transparent;
  &:focus {
    border: 2px solid #b5c1d8;
  }
}
</style>
