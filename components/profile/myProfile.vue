<template>
  <div class="profile-content my-profile">
    <div class="profile-header">
      <U-title :text="'Profile'"> </U-title>
      <div class="profile-header__menu">
        <ul>
          <li>
            <button type="button" @click="$emit('copyBaseUri')">
              Copy Link On My Profile
            </button>
            <img src="@/assets/img/copy.svg" alt="copy" />
          </li>
          <li>
            <button type="button">Edit Profile</button>
            <img src="@/assets/img/arrow.svg" alt="arrow" />
          </li>
          <li>
            <button type="button">Change Password</button>
            <img src="@/assets/img/arrow.svg" alt="arrow" />
          </li>
          <li>
            <button type="button">Log Out</button>
            <img src="@/assets/img/logout.svg" alt="logout" />
          </li>
        </ul>
      </div>
      <div class="profile-header__account-data">
        <div>
          <span>Full name</span>
          <p>
            {{ $strapi.state.user.username + " Longfirstname Longlastname" }}
          </p>
        </div>
        <div>
          <span class="account-data__email">Email</span>
          <p>{{ $strapi.state.user.email }}</p>
        </div>
      </div>
    </div>
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
    <badge-popup v-if="opendPopup" @closePopup="togglePopup"></badge-popup>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Startup } from "../../models/Startup";

import UButton from "../theme/uButton.vue";
import UTitle from "../theme/uTitle.vue";
import { Technology } from "../../models/Technology";
import UTags from "../theme/uTags.vue";
import StartupCard from "~/components/moleculas/startupCard.vue";
import badgePopup from "~/components/theme/badgePopup.vue";
@Component({
  components: {
    UTitle,
    StartupCard,
    UTags,
    UButton,
    badgePopup,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
  @Prop() technologies: Array<Technology>;
  private opendPopup: boolean = false;
  data() {
    return {
      opendPopup: false,
    };
  }

  togglePopup() {
    this.opendPopup = !this.opendPopup;
  }
}
</script>
