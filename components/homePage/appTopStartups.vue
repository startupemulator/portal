<template>
  <div class="top-startups">
    <h2 class="top-startups__title">Top startups developed with us</h2>
    <div class="top-startups-content">
      <div class="top-startup">
        <img src="@/assets/img/startups.png" alt="startups" />
        <div class="top-startup__buttons">
          <button type="button">See Details</button>
          <button type="button">Go to the Website</button>
        </div>
      </div>
      <div class="next-startup">
        <h2>Your startup can be the next</h2>
        <h3>Join a team or create your startup</h3>
        <nuxt-link to="createAccount"
          ><button type="button">Sign Up</button></nuxt-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
