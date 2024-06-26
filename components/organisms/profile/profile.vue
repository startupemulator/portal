<template>
  <div class="profile-content my-profile profile-content-expert">
    <div v-if="!changePassword & !editProfile">
      <U-Back :link="'/'"></U-Back>
      <div class="my-profile__content">
        <div
          class="profile-header"
          :class="!isOwner ? 'my-profile__content--publick' : ''"
        >
          <U-Title v-if="!isOwner" :text="user.name || user.profile.name">
          </U-Title>
          <U-Title v-if="isOwner" :text="'Profile'"> </U-Title>

          <div v-if="isOwner" class="profile-header__menu">
            <ul>
              <li>
                <nuxt-link :to="'/profile/edit'">
                  <span> Edit Profile</span>
                  <img src="~/assets/img/arrow.svg" alt="arrow" />
                </nuxt-link>
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
          <div v-if="isOwner" class="profile-header__account-data">
            <div>
              <span>Full name</span>
              <p>
                {{ user.profile.name }}
              </p>
            </div>
            <div>
              <span class="account-data__email">Email</span>
              <p>{{ user.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <Regular-User
        v-if="!isExpert"
        :startups="startups"
        :user-id="userId"
        :my-startup-feedbacks="myStartupFeedbacks"
        :my-challenge-feedbacks="myChallengeFeedbacks"
        @togglePopup="togglePopup"
      ></Regular-User>
      <Expert-User
        v-if="isExpert"
        :feedbacks="feedbacks"
        :user-id="userId"
        :is-expert="isExpert"
        :is-owner="isOwner"
      >
      </Expert-User>
      <div class="profile-projects__experience">
        <h3>Experience</h3>
        <div v-if="profile.experience" class="experience-work">
          {{ profile.experience.title }}
        </div>
        <ul class="experience_list">
          <li v-for="item in technologies" :key="item.id">
            <U-Tags
              :id="item.id"
              :title="item.title"
              :name="item.title"
              :type="'checkbox'"
            ></U-Tags>
          </li>
        </ul>
        <Badge-Popup
          v-if="opendPopup"
          :achivements-data="achivementsData"
          :badge="badge"
          @closePopup="closePopup"
        ></Badge-Popup>
      </div>
    </div>

    <Change-Password
      v-if="changePassword"
      :user-id="user.id"
      @clickOnButton="toggleChangePassword"
    ></Change-Password>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import Toast from "../../../store/modules/Toast";
import { User } from "../../../models/User";
import Spinner from "../../../store/modules/Spinner";
import RegularUser from "./regularUser.vue";
import ExpertUser from "./expertUser.vue";
import { Startup } from "~/models/Startup";
import UBack from "~/components/atoms/uBack.vue";
import UButton from "~/components/atoms/uButton.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Technology } from "~/models/Technology";
import UTags from "~/components/atoms/uTags.vue";
import { Profile } from "~/models/Profile";
import { Feedbacks } from "~/models/Feedbacks";
import ChangePassword from "~/components/organisms/profile/changePassword.vue";
import { scrollToHeader } from "~/assets/jshelper/scrollToHeader";
import { Experience } from "~/models/Experience";
import { Badges } from "~/models/Badges";
import BadgePopup from "~/components/molecules/popupBadge.vue";

@Component({
  components: {
    UBack,
    UTitle,
    UTags,
    UButton,
    RegularUser,
    ExpertUser,
    ChangePassword,
    BadgePopup,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
  @Prop() technologies: Array<Technology>;
  @Prop() user: Array<User>;
  @Prop() profile: Array<Profile>;
  @Prop() feedbacks: Array<Feedbacks>;
  @Prop() userId: string;
  @Prop() isExpert: string;
  @Prop() isOwner: boolean;
  @Prop() experiences: Array<Experience>;
  @Prop() publickTechnologies: Array<Technology>;
  @Prop() myStartupFeedbacks: Array<Feedbacks>;
  @Prop() myChallengeFeedbacks: Array<Feedbacks>;
  changePassword: boolean = false;
  editProfile: boolean = false;
  createdTechnologies = [];
  achivementsData = {};
  badge: Array<Badges> = [];
  opendPopup: boolean = false;
  logOut() {
    this.$strapi.logout();
    this.$nuxt.$router.push("/");
  }

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
    scrollToHeader();
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

  async addTechnologies(technology) {
    try {
      const newTechnology = await this.$createTechnologies(
        this.user.id,
        technology
      );
      if (newTechnology !== null) {
        this.createdTechnologies.push(newTechnology);
      }
    } catch (e) {
      console.error(e);
    }
  }

  removeTechnology(data) {
    this.createdTechnologies = data;
  }

  async saveProfileUpdateData(data) {
    Spinner.show();

    if (this.createdTechnologies.length !== 0) {
      this.createdTechnologies.forEach((el) => data.technologies.push(el.id));
    } else {
      this.profile.technologies.forEach((el) => {
        if (!el.is_public) {
          data.technologies.push(el.id);
        }
      });
    }
    try {
      const result = await this.$updateProfile(
        this.profile.id,
        data.technologies,
        data.experiences
      );

      const updateUserName = await this.$updateProfileName(
        this.profile.id,
        data.userName
      );
      if (result !== null && updateUserName !== null) {
        this.updatablemyTechnologies = result.technologies;

        this.toggleEditProfile();
      }
      this.$emit("updateData");
      scrollToHeader();
      Spinner.hide();
    } catch (e) {
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      Spinner.hide();
    }
  }
}
</script>
