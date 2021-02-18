<template>
  <div class="createProgect-step1">
    <nuxt-link to="/"
      ><button type="button" class="apply-to-team-btn-back">
        <img src="@/assets/img/arrow.svg" alt="arrow" /> Back
      </button></nuxt-link
    >
    <h2>Create a startup</h2>
    <div class="createProgect-step1__progress-bar">
      <div class="createProgect__progress-bar"></div>
    </div>
    <div class="startup__name">
      <h4>Startup name</h4>
      <input type="text" placeholder="Enter the startup name" required />
    </div>
    <div class="startup__description" required>
      <h4>Description</h4>
      <textarea
        placeholder="Describe your idea and main goals of your startup to interest developers to join your team

"
      ></textarea>
      <div class="startup__start-date">
        <h4>Start date</h4>
        <div class="start-date__row">
          <img src="@/assets/img/Calendar.svg" alt="" />
          <div class="start-date__col1">
            <input
              type="number"
              placeholder="DD"
              v-bind="startDay"
            
            />
          </div>
          {{ startDay }}
          <div class="start-date__col2">
            <input type="number" placeholder="MM" :value="startMonth" />
          </div>
          <div class="start-date__col3">
            <input type="number" placeholder="YYYY" :value="startYear" />
          </div>
        </div>
      </div>
      <div class="startup__finish-date">
        <h4>Finish date</h4>
        <div class="finish-date__row">
          <img src="@/assets/img/Calendar.svg" alt="" />
          <div class="finish-date__col1">
            <input type="text" placeholder="DD" :value="finishDay" />
          </div>
          <div class="finish-date__col2">
            <input type="text" placeholder="MM" :value="finishMonth" />
          </div>
          <div class="finish-date__col3">
            <input type="text" placeholder="YYYY" :value="finishYear" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    startDay: "",
    startMonth: "",
    startYear: "",
    finishDay: "",
    finishMonth: "",
    finishYear: "",
  }),
  
};
</script>