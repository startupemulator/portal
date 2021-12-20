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
        :class="$v.description.$error ? ' error' : ''"
      ></textarea>
      <p v-show="$v.description.$error" class="errorInput">
        Please enter a description name of at least 8 characters
      </p>
      <div class="startup__start-date">
        <h4>Start date</h4>
        <Date-Picker
          v-model.trim="$v.date.$model"
          value-type="format"
          format="DD  |  MM  |  YYYY"
          placeholder="DD  |  MM  |  YYYY"
          prefix-class="xmx"
          :disabled-date="disabledBeforeTodayAndAfterAWeek"
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
        ></Date-Picker>

        <p v-show="$v.date.$error" class="errorInput">Please enter a date</p>
      </div>
      <div class="startup__finish-date">
        <Duration-Picker
          :title="'Estimated duration'"
          :duration="duration"
          :estimations="estimations"
          @clickOnDuration="chooseDuration"
        ></Duration-Picker>

        <label for="days-title" class="days-title">
          <input
            id="days-title"
            v-model="duration"
            type="text"
            maxlength="3"
            placeholder="Or enter the number of days"
            :class="$v.duration.$error ? ' error' : ''"
        /></label>
        <p
          v-show="!$v.duration.required || !$v.duration.numeric"
          class="errorInput"
        >
          Please enter or choose estimation duration
        </p>
        <p v-show="!$v.duration.between" class="errorInput">
          Estimation duration can't be less 0 and more 365 days.
        </p>
      </div>
    </div>
    <div class="createProject-step1__buttons">
      <U-Button
        :button-name="'Next'"
        :button-class="'u-button-blue'"
        @clickOnButton="goToStepTwo"
      ></U-Button>
      <U-Button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
        @clickOnButton="saveDraft"
      ></U-Button>
    </div>
  </div>
</template>

<script lang="ts">
import DatePicker from "vue2-datepicker";
import { Component, Vue, Prop } from "nuxt-property-decorator";
import {
  required,
  minLength,
  numeric,
  between,
} from "vuelidate/lib/validators";
import Toast from "../../../store/modules/Toast";
import { Estimation } from "../../../models/Estimation";
import Spinner from "../../../store/modules/Spinner";
import UButton from "~/components/atoms/uButton.vue";
import DurationPicker from "~/components/molecules/durationPicker.vue";
import AddInput from "~/components/atoms/addInput.vue";
import { CreateProjectPage } from "~/store";

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
      between: between(1, 365),
    },
  },
  components: { DatePicker, UButton, DurationPicker, AddInput },
})
export default class extends Vue {
  CreateProjectPage;
  constructor() {
    super();
    this.CreateProjectPage = CreateProjectPage;
  }

  @Prop() estimations: Array<Estimation>;
  @Prop() createdStartupId: Number;
  date: String =
    CreateProjectPage.draftStartup?.start_date
      ?.split("T")[0]
      .split("-")
      .reverse()
      .join("  |  ") || "";

  title: String = CreateProjectPage.draftStartup?.title || "";
  description: String = CreateProjectPage.draftStartup?.description || "";
  start_date: Date = new Date();
  duration: Number = CreateProjectPage.draftStartup?.duration || null;
  numberDays: String = "";
  technologies: Array<[string | boolean]>;

  chooseDuration(el: { [key: string]: any }) {
    this.duration = el.value;
  }

  disabledBeforeTodayAndAfterAWeek(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      date < today || date > new Date(today.getTime() + 365 * 24 * 3600 * 1000)
    );
  }

  saveDraft() {
    this.$v.$touch();
    if (!this.$v.$error) {
      this.goToStepTwo();
    } else {
      Toast.show({
        data: "Fill the form correctly.",
        duration: 3000,
      });
    }
  }

  async goToStepTwo() {
    this.$v.$touch();
    if (!this.$v.$error) {
      try {
        Spinner.show();
        const data = {
          title: this.title,
          description: this.description,
          start_date: new Date(this.date.split("  |  ").reverse().join("-")),
          duration: this.duration,
          owner: this.$strapi.user.id,
        };
        await CreateProjectPage.updateDraftStartup({
          context: this,
          data,
        });
        if (this.createdStartupId === 0) {
          await CreateProjectPage.createNewStartup(this);
        } else {
          await CreateProjectPage.updateStartup(this);
        }
        this.$emit("goToStepTwo");
      } catch (e) {
        Toast.show({
          data: "Something wrong.",
          duration: 3000,
        });
      } finally {
        Spinner.hide();
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
