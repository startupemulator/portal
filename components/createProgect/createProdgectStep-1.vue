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
        <h4><span v-if="!device">Estimated</span> Finish date</h4>
        <div class="finish-date__row">
          <img src="@/assets/img/calendar.svg" alt="Calendar" />
          <div class="finish-date__col1">
            <input
              v-model="finishDay"
              type="text"
              placeholder="DD"
              required
              @input="checkinput('finishDay')"
            />
          </div>
          <div class="finish-date__col2">
            <input
              v-model="finishMonth"
              type="text"
              placeholder="MM"
              required
              @input="checkinput('finishMonth')"
            />
          </div>
          <div class="finish-date__col3">
            <input
              v-model="finishYear"
              type="text"
              placeholder="YYYY"
              required
              @input="checkinput('finishYear')"
            />
          </div>
        </div>
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
import UButton from "~/components/theme/UButton.vue";
export default {
  components: { UButton },

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
