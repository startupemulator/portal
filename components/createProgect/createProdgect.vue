<template>
  <div class="createProgect-content">
    <nuxt-link v-if="createprodjectSteps.stepOne" to="/"
      ><button type="button" class="apply-to-team-btn-back">
        <img src="@/assets/img/arrow.svg" alt="arrow" /> Back
      </button></nuxt-link
    >
    <button
      v-else
      type="button"
      class="apply-to-team-btn-back"
      @click="
        (createprodjectSteps.stepOne = !createprodjectSteps.stepOne),
          (createprodjectSteps.stepTwo = !createprodjectSteps.stepTwo)
      "
    >
      <img src="@/assets/img/arrow.svg" alt="arrow" /> Back
    </button>
    <h2>Create a startup</h2>

    <div class="createProgect-step1__progress-bar">
      <div
        class="createProgect__progress-bar"
        :class="createprodjectSteps.stepTwo ? 'progress-bar__stepTwo' : ''"
      ></div>
    </div>

    <create-prodgect-step-1
      v-if="createprodjectSteps.stepOne"
    ></create-prodgect-step-1>
    <create-prodgect-step-2
      v-if="createprodjectSteps.stepTwo"
    ></create-prodgect-step-2>
  </div>
</template>
<script>
import { mapState } from "vuex";
import createProdgectStep1 from "./createProdgectStep-1.vue";
import CreateProdgectStep2 from "./createProdgectStep-2.vue";
export default {
  components: { createProdgectStep1, CreateProdgectStep2 },
  computed: {
    ...mapState(["device", "createprodjectSteps"]),
  },
};
</script>
