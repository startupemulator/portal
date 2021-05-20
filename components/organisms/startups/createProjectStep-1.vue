<template>
  <div class="createProject-step1">
    <div class="startup__name">
      <h4>Startup name</h4>
      <input
        v-model.trim="$v.title.$model"
        type="text"
        placeholder="Enter the startup name"
        :class="$v.title.$error ? ' error' : ''"
      />
    </div>
    <p v-show="$v.title.$error" class="errorInput">
      Please enter a startup name of at least 8 characters
    </p>
    <div class="startup__description">
      <h4>Description</h4>
      <textarea
        v-model.trim="$v.description.$model"
        placeholder="Describe your idea and main goals of your startup to interest developers to join your team"
        :class="$v.title.$error ? ' error' : ''"
      ></textarea>
      <p v-show="$v.description.$error" class="errorInput">
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

        <p v-show="$v.date.$error" class="errorInput">Please enter a date</p>
      </div>
      <div class="startup__finish-date">
        <Duration-picker
          :title="'Estimated duration'"
          :duration="duration"
          :estimations="estimations"
          @clickOnDuration="chooseDuration"
        ></Duration-picker>

        <label for="days-title" class="days-title">
          <input
            id="days-title"
            v-model="duration"
            type="text"
            placeholder="Or enter the number of days"
            :class="$v.title.$error ? ' error' : ''"
        /></label>
        <p v-show="$v.duration.$error" class="errorInput">
          Please enter or choose estimation duration
        </p>
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
    <Spiner :loading="loading"></Spiner>
  </div>
</template>

<script lang="ts">
import DatePicker from "vue2-datepicker";
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { required, minLength, numeric } from "vuelidate/lib/validators";
import Toast from "../../../store/modules/Toast";
import { Estimation } from "../../../models/Estimation";
import UButton from "~/components/atoms/uButton.vue";
import DurationPicker from "~/components/molecules/durationPicker.vue";
import AddInput from "~/components/atoms/addInput.vue";
import Spiner from "~/components/molecules/spiner.vue";

@Component({
  validations: {
    title: {
      required,
      minLength: minLength(8),
    },
    description: {
      minLength: minLength(10),
      required,
    },
    date: {
      required,
    },
    duration: {
      required,
      numeric,
    },
  },
  components: { DatePicker, UButton, DurationPicker, AddInput, Spiner },
})
export default class extends Vue {
  @Prop() startupData!: Array<any>;
  @Prop() estimations: Array<Estimation>;
  @Prop() createdStartupId: Number;
  date: String = this.startupData.date
    ? this.startupData.start_datethis.startupData.start_date
        .split("T")[0]
        .split("-")
        .reverse()
        .join("  |  ")
    : "";

  loading = false;
  title: String = this.startupData.title ? this.startupData.title : "";

  description: String = this.startupData.description
    ? this.startupData.description
    : "";

  start_date: Date = new Date();
  duration: Number = this.startupData.duration
    ? this.startupData.duration
    : null;

  numberDays: String = "";
  technologies: Array<[string | boolean]>;

  chooseDuration(el: { [key: string]: any }) {
    this.duration = el.value;
  }

  add(duration: { [key: string]: any }) {
    if (duration.length !== 0) {
      this.duration = duration[duration.length - 1].name;
    }
  }

  mounted() {
    if (this.startupData.start_date) {
      this.date = this.startupData.start_date
        .split("T")[0]
        .split("-")
        .reverse()
        .join("  |  ");
    }
  }

  async goToStepTwo() {
    this.$v.$touch();
    if (!this.$v.$error) {
      try {
        this.loading = true;
        if (this.createdStartupId === 0) {
          // if new startup
          const data = {
            title: this.title,
            description: this.description,
            start_date: new Date(this.date.split("  |  ").reverse().join("-")),
            duration: this.duration,
            slug: new Date().getTime().toString(),
            owner: this.$strapi.user.id,
          };

          const createStartup = await this.$strapi.create("startups", data);

          this.$emit("goToStepTwo", createStartup);
        } else {
          // if went back one step and update some data
          const data = {
            title: this.title,
            description: this.description,
            start_date: new Date(this.date.split("  |  ").reverse().join("-")),
            duration: this.duration,
          };
          const updateStartup = await this.$strapi.update(
            "startups",
            this.createdStartupId.toString(),
            data
          );
          if (updateStartup) {
            this.$emit("goToStepTwo", updateStartup);
          }
        }
        this.loading = false;
      } catch (e) {
        Toast.show({
          data: "Something wrong.",
          duration: 3000,
        });
        this.loading = false;
      }
    } else {
      Toast.show({
        data: "Fill the form correctly.",
        duration: 3000,
      });
    }
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
.days-title {
  position: relative;
  &::after {
    position: absolute;
    content: "days";
    right: 24px;
    bottom: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #dbe4f3;
  }
}
</style>
