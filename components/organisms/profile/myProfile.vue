<template>
  <div class="profile-content my-profile">
    <div v-if="!changePassword & !editProfile" class="my-profile__content">
      <div class="profile-header">
        <U-title :text="'Profile'"></U-title>
        <div class="profile-header__menu">
          <ul>
            <li>
              <button type="button" @click="copyBaseUri">
                Copy Link On My Profile
                <img src="~/assets/img/copy.svg" alt="copy" />
              </button>
            </li>
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

        <Expert-user v-if="isExpert" :feedbacks="feedbacks"></Expert-user>

        <div v-if="userExperience" class="profile-projects__experience">
          <h3>Experience</h3>
          <div class="experience-work">
            {{ userExperience.title }}
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
    <ChangePassword
      v-show="changePassword"
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
import { copyToClipboard } from "~/assets/jshelper/copyToClipBoard";
import { Feedbacks } from "~/models/Feedbacks";
import { scrollToHeader } from "~/assets/jshelper/scrollToHeader";
import { Badges } from "~/models/Badges";
import Spinner from "~/store/modules/Spinner";

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

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
    scrollToHeader();
  }

  copyBaseUri() {
    Spinner.show();
    const url = window.location.origin + `/user/${this.userData.slug}`;
    copyToClipboard(url);
    setTimeout(() => Spinner.hide(), 500);
    Toast.show({
      data: "Link copied is  -  " + url,
      duration: 3000,
      success: true,
    });
  }
}
</script>
