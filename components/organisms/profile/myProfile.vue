<template>
  <div class="profile-content my-profile">
    <Spiner :loading="loading"></Spiner>
    <div v-if="!changePassword & !editProfile" class="my-profile__content">
      <div class="profile-header">
        <U-title :text="'Profile'"> </U-title>
        <div class="profile-header__menu">
          <ul>
            <li>
              <button type="button" @click="copyBaseUri">
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
              {{ userData.user.profile.name }}
            </p>
          </div>
          <div>
            <span class="account-data__email">Email</span>
            <p>{{ userData.user.email }}</p>
          </div>
        </div>
      </div>
      <div :class="isExpert ? 'reverse-data' : ''">
        <My-profile-regular-user
          v-if="!isExpert"
          :my-startup-feedbacks="myStartupFeedbacks"
          :my-challenge-feedbacks="myChallengeFeedbacks"
          @togglePopup="togglePopup"
        ></My-profile-regular-user>

        <Expert-user v-if="isExpert" :feedbacks="feedbacks"> </Expert-user>

        <div class="profile-projects__experience">
          <h3>Experience</h3>
          <div class="experience-work">
            {{ userExperience ? userExperience.title : "Zero" }}
          </div>
          <ul class="experience_list">
            <li v-for="item in updatablemyTechnologies" :key="item.id">
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
      <BadgePopup
        v-if="opendPopup"
        :achivements-data="achivementsData"
        :badge="badge"
        @closePopup="closePopup"
      ></BadgePopup>
    </div>

    <EditProfile
      v-if="editProfile"
      :user-data="userData.user"
      :experiences="experiences"
      :user-experience="userExperience"
      :technologies="publickTechnologies"
      :my-technologies="updatablemyTechnologies"
      @clickOnButton="toggleEditProfile"
      @saveProfileUpdateData="saveProfileUpdateData"
      @addTechnologies="addTechnologies"
      @removeTechnology="removeTechnology"
    ></EditProfile>
    <ChangePassword
      v-if="changePassword"
      :user-id="userData.user.id"
      @clickOnButton="toggleChangePassword"
    ></ChangePassword>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import Toast from "../../../store/modules/Toast";

import MyProfileRegularUser from "./myProfileRegularUser.vue";
import ExpertUser from "./expertUser.vue";
import BadgePopup from "~/components/molecules/popupBadge.vue";
import EditProfile from "~/components/organisms/profile/editProfile.vue";
import ChangePassword from "~/components/organisms/profile/changePassword.vue";
import { Startup } from "~/models/Startup";
import UButton from "~/components/atoms/uButton.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Technology } from "~/models/Technology";
import UTags from "~/components/atoms/uTags.vue";
import StartupCard from "~/components/molecules/startupCard.vue";
import { Experience } from "~/models/Experience";
import Spiner from "~/components/molecules/spiner.vue";
import { copyToClipboard } from "~/assets/jshelper/copyToClipBoard";
import { Feedbacks } from "~/models/Feedbacks";
import { scrollToHeader } from "~/assets/jshelper/scrollToHeader";
import { Badges } from "~/models/Badges";
@Component({
  components: {
    UTitle,
    StartupCard,
    UTags,
    UButton,
    BadgePopup,
    EditProfile,
    ChangePassword,
    MyProfileRegularUser,
    ExpertUser,
    Spiner,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
  @Prop() technologies: Array<Technology>;
  @Prop() publickTechnologies: Array<Technology>;
  @Prop() feedbacks: Array<Feedbacks>;
  @Prop() myStartupFeedbacks: Array<Feedbacks>;
  @Prop() myChallengeFeedbacks: Array<Feedbacks>;
  @Prop() isExpert: boolean;
  @Prop() userData: Array<any>;
  @Prop() userExperience: String;
  @Prop() experiences: Array<Experience>;
  @Prop() myTechnologies!: Array<Technology>;
  updatablemyTechnologies = this.myTechnologies;
  private opendPopup: boolean = false;
  private editProfile: boolean = false;
  private changePassword: boolean = false;
  createdTechnologies = [];
  loading = false;
  achivementsData = {};
  badge: Array<Badges> = [];
  logOut() {
    this.$strapi.logout();
    this.$nuxt.$router.push("/");
  }

  togglePopup(feedback, badge) {
    this.badge = badge;
    this.achivementsData = feedback;

    this.opendPopup = !this.opendPopup;
  }

  closePopup() {
    this.opendPopup = !this.opendPopup;
  }

  toggleEditProfile() {
    this.editProfile = !this.editProfile;
    scrollToHeader();
  }

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
    scrollToHeader();
  }

  copyBaseUri() {
    this.loading = true;
    const url = window.location.origin + `/user/${this.userData.slug}`;
    copyToClipboard(url);
    setTimeout(() => (this.loading = false), 500);
    Toast.show({
      data: "Link copied is  -  " + url,
      duration: 3000,
      success: true,
    });
  }

  removeTechnology(createdTechnologies) {
    this.createdTechnologies = createdTechnologies;
  }

  async addTechnologies(technology) {
    try {
      const newTechnology = await this.$createTechnologies(
        this.userData.user.id,
        technology
      );
      if (newTechnology !== null) {
        this.createdTechnologies.push(newTechnology);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async saveProfileUpdateData(data) {
    this.loading = true;
    if (this.createdTechnologies.length !== 0) {
      this.createdTechnologies.forEach((el) => data.technologies.push(el.id));
    } else {
      this.createdTechnologies.forEach((el) => {
        if (!el.is_public) {
          data.technologies.push(el.id);
        }
      });
    }
    try {
      const result = await this.$updateProfile(
        this.userData.id,
        data.technologies,
        data.experiences.id
      );

      const updateUserName = await this.$updateProfileName(
        this.userData.id,
        data.userName
      );

      if (result !== null && updateUserName !== null) {
        this.updatablemyTechnologies = result.technologies;

        this.$emit("updateData");
      }
      scrollToHeader();
      this.loading = false;
    } catch (e) {
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      this.loading = false;
    }
  }
}
</script>
