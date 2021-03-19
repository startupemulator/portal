<template>
  <div class="regular-user">
    <div class="profile__personal-achivements">
      <h3>Personal achivements</h3>
      <div class="arhivements-image">
        <img src="~/assets/img/profile-image.svg" alt="profile-imag" />
      </div>
    </div>
    <div class="profile__team-achivements">
      <h3>Team achivements</h3>
      <div class="arhivements-image">
        <img src="~/assets/img/profile-image.svg" alt="profile-imag" />
        <img src="~/assets/img/profile-image.svg" alt="profile-imag" />
      </div>
    </div>
    <div class="profile-projects">
      <div class="profile-projects__header">
        <h3>Projects</h3>
        <div class="profile-projects__header-project-quantity">
          <span>{{ startups.length }}</span>
        </div>
      </div>
    </div>
    <div class="start-ups_cards-content startup-block">
      <div class="transition__startup-card">
        <Startup-card
          v-for="card in startups"
          :key="card.id"
          :card="card"
          :button_apply="false"
          :button_details="true"
        ></Startup-card>
      </div>
    </div>
    <u-button
      :class="'u-button-gray u-button-gray__show-more'"
      :button-name="'Show 1 More Project'"
    ></u-button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Startup } from "~/models/Startup";
import StartupCard from "~/components/molecules/startupCard.vue";
@Component({
  components: {
    StartupCard,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
}
</script>
