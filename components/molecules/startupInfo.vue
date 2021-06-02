<template>
  <div class="startup-info">
    <div class="startup-info__form">
      <p>Startup name</p>
      <input
        v-model.trim="$v.title.$model"
        type="text"
        placeholder="Enter the startup name"
        :class="$v.title.$error ? ' error' : ''"
      />
      <p v-show="$v.title.$error" class="errorInput">
        Please enter a startup name of at least 8 characters
      </p>
      <p>Description</p>
      <textarea
        v-model.trim="$v.description.$model"
        :class="$v.description.$error ? ' error' : ''"
      >
      </textarea>
      <p v-show="$v.description.$error" class="errorInput">
        Please enter a description name of at least 8 characters
      </p>
    </div>
    <p>Start date</p>

    <DatePicker
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
    ></DatePicker>

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
          :class="$v.duration.$error ? ' error' : ''"
      /></label>
      <p v-show="$v.duration.$error" class="errorInput">
        Please enter or choose estimation duration
      </p>
    </div>
    <div class="edit-startup-info__buttons">
      <U-button
        :button-name="'Save'"
        :button-class="'u-button-blue'"
        @clickOnButton="updateStartup"
      ></U-button>
      <U-button
        :button-name="'Cancel'"
        :button-class="'u-button-gray'"
        @clickOnButton="cancel"
      ></U-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { required, minLength, numeric } from "vuelidate/lib/validators";
import DatePicker from "vue2-datepicker";
import { Estimation } from "../../../models/Estimation";
import UInput from "~/components/atoms/uInput.vue";
import UButton from "~/components/atoms/uButton.vue";
import UDateInput from "~/components/atoms/uDateInput.vue";
import { Startup } from "~/models/Startup";
import DurationPicker from "~/components/molecules/durationPicker.vue";

@Component({
  components: { UButton, UInput, UDateInput, DurationPicker, DatePicker },
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
})
export default class extends Vue {
  @Prop() startup!: Array<Startup>;
  @Prop() estimations: Array<Estimation>;

  date: String = this.startup.start_date
    ? this.startup.start_date.split("T")[0].split("-").reverse().join("  |  ")
    : "";

  duration: Number = this.startup.duration ? this.startup.duration : null;
  chooseDuration(el: { [key: string]: any }) {
    this.duration = el.value;
  }

  title: String = this.startup.title ? this.startup.title : "";
  description: String = this.startup.description
    ? this.startup.description
    : "";

  disabledBeforeTodayAndAfterAWeek(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      date < today || date > new Date(today.getTime() + 365 * 24 * 3600 * 1000)
    );
  }

  cancel() {
    this.date = this.startup.start_date
      ? this.startup.start_date.split("T")[0].split("-").reverse().join("  |  ")
      : "";

    this.duration = this.startup.duration ? this.startup.duration : null;

    this.title = this.startup.title ? this.startup.title : "";
    this.description = this.startup.description ? this.startup.description : "";
    this.$emit("cancel");
  }

  updateStartup() {
    this.$v.$touch();
    if (!this.$v.$error) {
      const data = {
        title: this.title,
        description: this.description,
        duration: this.duration,
        date: new Date(
          this.date.split("  |  ").reverse().join("-")
        ).toISOString(),
      };
      this.$emit("updateStartup", data);
    }
  }
}
</script>

<style lang="scss">
.startup-info {
  color: #fff;
  textarea {
    width: 340px;
    height: 136px;
    background: #2e384a;
    border-radius: 12px;
    overflow: hidden;
    border: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    padding: 8px 16px;
    box-sizing: border-box;
    margin-bottom: 12px;
  }
  input {
    background-color: #2e384a;
    border-radius: 12px;
    border: none;
    color: #fff;
    width: 340px;
    height: 48px;
    padding-left: 16px;
    box-sizing: border-box;
    margin-top: 0;
    &::placeholder {
      color: #8c97ac;
    }
  }
  .standard-label .standard-input {
    padding-left: 24px;
  }
  .startup-info__form {
    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #fff;
      margin-bottom: 0;
      margin-top: 32px;
    }
  }

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    margin-bottom: 10px;
  }
  .edit-startup-info__buttons {
    position: fixed;
    left: 0;
    bottom: 0;
    border: 1px solid #3b465a;
    background: #232b39;
    box-shadow: inset 0 0 10px 2px #262f3f;
    border-radius: 16px 16px 0 0;
    padding: 16px 16px 28px 16px;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    .u-button-gray {
      margin-left: 16px;
    }
  }
}
@media (min-width: 768px) {
  .startup-info {
    input {
      width: 660px;
      height: 56px;
      padding-left: 24px;
    }
    .tags-item input {
      position: absolute;
      top: 0;
      left: 22px;
      height: 0;
      width: 0;
      opacity: 0;
    }
    textarea {
      width: 660px;
      height: 136px;
      font-size: 18px;
      line-height: 28px;
      padding: 12px 24px;
      margin-bottom: 0;
    }
    p {
      font-weight: 500;
      font-size: 17px;
      line-height: 32px;
      margin-top: 24px;
    }
    .startup-info__form {
      p {
        font-weight: 500;
        font-size: 17px;
        line-height: 32px;
        margin-bottom: 8px;
        margin-top: 20px;
      }
    }
    .edit-startup-info__buttons {
      position: static;
      border: none;
      border-top: 1px solid #3b465a;
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 36px 0;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      margin-top: 36px;
      .u-button-gray {
        margin-left: 24px;
      }
    }
  }
}
</style>
