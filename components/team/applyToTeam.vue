<template>
  <div class="apply-to-team">
    <nuxt-link to="/"
      ><button type="button" class="apply-to-team-btn-back">
        <img src="@/assets/img/arrow.svg" alt="arrow" /> Back
      </button></nuxt-link>
    <div class="step-1">
        <h2>Your experience</h2>
        <p>Total years of your experience</p>
        <ul class="step-1__experience">
          <li class="experience-item"><input type="checkbox">Less than 6 months</li>
          <li class="experience-item"><input type="checkbox">6 months – 1 year</li>
          <li class="experience-item"><input type="checkbox">1–2 years</li>
          <li class="experience-item"><input type="checkbox">2–3 years</li>
          <li class="experience-item"><input type="checkbox">3–4 years</li>
          <li class="experience-item"><input type="checkbox">4–5 years</li>
          <li class="experience-item"><input type="checkbox">More than 5 years</li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {};
</script>
