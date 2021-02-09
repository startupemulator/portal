<template>
  <header class="main-header">
      <div class="main-header-content">
    <div class="main-headr-logo">
      <img src="@/assets/img/logo.svg" alt="" class="logo" />
      <h2 v-if="isMobile">Startup Emulator</h2>
    </div>
    <nav class="main-header__nav" >
      <ul class="nav-list">
        <li class="nav-item"><a href="#"><img src="@/assets/img/union.svg" alt="Startups">Startups</a> </li>
        <li class="nav-item"><a href="#"><img src="@/assets/img/challenges.svg" alt="Challenges">Challenges</a></li>
      </ul>
    </nav>
    <div class="main-header-buttons">
      <button class="button-login header-btn">Log In</button>
      <button class="button-sign-up header-btn">Sign Up</button>
    </div>
    </div>
  </header>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isMobile"]),
  },
};
</script>

