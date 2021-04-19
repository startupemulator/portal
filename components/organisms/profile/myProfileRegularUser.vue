<template>
  <div class="my-profile-regular-user">
    <div class="profile__personal-achivements">
      <h3>Personal achivements</h3>
      <div class="arhivements-image">
        <img
          src="~/assets/img/profile-image.svg"
          alt="profile-imag"
          @click="togglePopup"
        />
      </div>
    </div>
    <div class="profile__team-achivements">
      <h3>Team achivements</h3>
      <div class="arhivements-image">
        <img
          src="~/assets/img/profile-image.svg"
          alt="profile-imag"
          @click="togglePopup"
        />
        <img
          src="~/assets/img/profile-image.svg"
          alt="profile-imag"
          @click="togglePopup"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class extends Vue {
  togglePopup() {
    this.$emit("togglePopup");
  }
}
</script>
