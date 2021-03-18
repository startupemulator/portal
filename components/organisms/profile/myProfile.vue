<template>
  <div class="profile-content my-profile">
    <div v-if="!changePassword & !editProfile" class="my-profile__content">
      <div class="profile-header">
        <U-title :text="'Profile'"> </U-title>
        <div class="profile-header__menu">
          <ul>
            <li>
              <button type="button" @click="$emit('copyBaseUri')">
                Copy Link On My Profile
                <img src="~/assets/img/copy.svg" alt="copy" />
              </button>
            </li>
            <li>
              <button type="button" @click="toggleEditProfile">
                Edit Profile
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li>
              <button type="button" @click="toggleChangePassword">
                Change Password
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li>
              <button type="button" @click="logOut">
                Log Out <img src="~/assets/img/logout.svg" alt="logout" />
              </button>
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
    <edit-profile
      v-if="editProfile"
      @clickOnButton="toggleEditProfile"
    ></edit-profile>
    <change-password
      v-if="changePassword"
      @clickOnButton="toggleChangePassword"
    ></change-password>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import badgePopup from "~/components/molecules/badgePopup.vue";
import EditProfile from "~/components/organisms/profile/editProfile.vue";
import ChangePassword from "~/components/organisms/profile/changePassword.vue";
import { Startup } from "~/models/Startup";

import UButton from "~/components/atoms/uButton.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Technology } from "~/models/Technology";
import UTags from "~/components/atoms/uTags.vue";
import StartupCard from "~/components/molecules/startupCard.vue";

@Component({
  components: {
    UTitle,
    StartupCard,
    UTags,
    UButton,
    badgePopup,
    EditProfile,
    ChangePassword,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
  @Prop() technologies: Array<Technology>;
  private opendPopup: boolean = false;
  private editProfile: boolean = false;
  private changePassword: boolean = false;

  data() {
    return {
      opendPopup: false,
      editProfile: false,
      changePassword: false,
    };
  }

  logOut() {
    console.log(this.$nuxt.$router.resolve);
    // this.$strapi.logout();
    // this.$nuxt.$router.push("/");
  }

  togglePopup() {
    this.opendPopup = !this.opendPopup;
  }

  toggleEditProfile() {
    console.log("back");
    this.editProfile = !this.editProfile;
  }

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
  }
}
</script>
