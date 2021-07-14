<template>
  <div class="profile-content my-profile profile-content-expert">
    <u-back :link="'/'"></u-back>
    <div class="my-profile__content">
      <div class="profile-header">
        <U-title v-if="!isOwner" :text="user.name || user.username"> </U-title>
        <U-title v-if="isOwner" :text="'Profile'"> </U-title>

        <div class="profile-header__menu">
          <ul>
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
              {{ user.username }}
            </p>
          </div>
          <div>
            <span class="account-data__email">Email</span>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <Regular-user
      v-if="!isExpert"
      :startups="startups"
      :user-id="userId"
    ></Regular-user>
    <Expert-user
      v-if="isExpert"
      :feedbacks="feedbacks"
      :user-id="userId"
      :is-expert="isExpert"
      :is-owner="isOwner"
    >
    </Expert-user>
    <div class="profile-projects__experience">
      <h3>Experience</h3>
      <div class="experience-work">{{ profile.experience.title }}</div>
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
import RegularUser from "./regularUser.vue";
import ExpertUser from "./expertUser.vue";
import { Startup } from "~/models/Startup";
import UBack from "~/components/atoms/uBack.vue";
import UButton from "~/components/atoms/uButton.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Technology } from "~/models/Technology";
import UTags from "~/components/atoms/uTags.vue";
import { Profile } from "~/models/Profile";
import { NotificationUser } from "~/models/NotificationUser";
import { Feedbacks } from "~/models/Feedbacks";

@Component({
  components: {
    UBack,
    UTitle,
    UTags,
    UButton,
    RegularUser,
    ExpertUser,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
  @Prop() technologies: Array<Technology>;
  @Prop() user: Array<NotificationUser>;
  @Prop() profile: Array<Profile>;
  @Prop() feedbacks: Array<Feedbacks>;
  @Prop() userId: string;
  @Prop() isExpert: string;
  @Prop() isOwner: boolean;
}
</script>
