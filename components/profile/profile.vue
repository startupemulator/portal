<template>
  <div class="profile-content">
    <u-back :link="'/'"></u-back>
    <U-title :text="'Name Surname'"> </U-title>
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
    <div class="profile-projects__experience">
      <h3>Experience</h3>
      <div class="experience-work">1-2 years</div>
      <ul class="experience_list">
        <li v-for="item in technologies" :key="item.id">
          <U-tags
            :id="item.id"
            :title="item.title"
            :name="item.title"
            :type="'checkbox'"
          ></U-tags>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Startup } from "../../models/Startup";
import Uback from "../theme/uBack.vue";
import UButton from "../theme/uButton";
import UTitle from "../theme/uTitle.vue";
import { Technology } from "../../models/Technology";
import UTags from "../theme/uTags.vue";
import StartupCard from "~/components/moleculas/startupCard.vue";
@Component({
  components: {
    Uback,
    UTitle,
    StartupCard,
    UTags,
    UButton,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
  @Prop() technologies: Array<Technology>;
}
</script>
