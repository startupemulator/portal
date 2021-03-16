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
    <div class="createProgect-step1__buttons">
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
import UButton from "~/components/atoms/uButton.vue";
import DurationPicker from "~/components/moleculas/durationPicker";
import AddInput from "~/components/atoms/addInput";

export default {
  components: {
    UButton,
    DurationPicker,
    AddInput,
  },

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
