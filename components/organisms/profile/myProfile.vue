<template>
  <div class="profile-content my-profile">
    <div v-if="!changePassword & !editProfile" class="my-profile__content">
      <div class="profile-header">
        <U-title :text="'Profile'"> </U-title>
        <div class="profile-header__menu">
          <ul>
            <li v-if="userData.role.type !== 'expert'">
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
              {{ userData.username }}
            </p>
          </div>
          <div>
            <span class="account-data__email">Email</span>
            <p>{{ userData.email }}</p>
          </div>
        </div>
      </div>
      <My-profile-regular-user
        v-if="userData.role.type !== 'expert'"
        @togglePopup="togglePopup"
      ></My-profile-regular-user>
      <Expert-user
        v-if="userData.role.type === 'expert'"
        :testimonials="testimonials"
      >
      </Expert-user>
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
import MyProfileRegularUser from "./myProfileRegularUser.vue";
import ExpertUser from "./expertUser.vue";
import badgePopup from "~/components/molecules/popupBadge.vue";
import EditProfile from "~/components/organisms/profile/editProfile.vue";
import ChangePassword from "~/components/organisms/profile/changePassword.vue";
import { Startup } from "~/models/Startup";
import UButton from "~/components/atoms/uButton.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Technology } from "~/models/Technology";
import UTags from "~/components/atoms/uTags.vue";
import StartupCard from "~/components/molecules/startupCard.vue";
import { Testimonial } from "~/models/Testimonial";

@Component({
  components: {
    UTitle,
    StartupCard,
    UTags,
    UButton,
    badgePopup,
    EditProfile,
    ChangePassword,
    MyProfileRegularUser,
    ExpertUser,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
  @Prop() technologies: Array<Technology>;
  @Prop() testimonials: Array<Testimonial>;
  @Prop() userData: Array<any>;
  private opendPopup: boolean = false;
  private editProfile: boolean = false;
  private changePassword: boolean = false;

  logOut() {
    this.$strapi.logout();
    this.$nuxt.$router.push("/");
  }

  togglePopup() {
    this.opendPopup = !this.opendPopup;
  }

  toggleEditProfile() {
    this.editProfile = !this.editProfile;
  }

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
  }

  // async mounted() {
  //   try {
  //     const userData = await this.$strapi.find("honors");
  //     if (userData) {
  //       console.log(userData);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
}
</script>
