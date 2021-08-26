<template>
  <div class="profile">
    <MyProfile
      v-if="userHaveProfile"
      :key="updatePageAfterSendNewDataInProfile"
      :startups="startups"
      :technologies="allTechnologies"
      :publick-technologies="technologies"
      :my-technologies="myTechnologies"
      :feedbacks="feedbacks"
      :user-data="profile"
      :is-expert="isExpert"
      :user-experience="profile.experience"
      :experiences="experiences"
      :my-startup-feedbacks="myStartupFeedbacks"
      :my-challenge-feedbacks="myChallengeFeedbacks"
      @updateData="updateData"
    ></MyProfile>
    <div v-else class="confim-your-email">
      <h2>Please confirm your email</h2>
      <UButton
        v-if="$strapi.user"
        button-class="u-button-gray"
        button-name="Log Out"
        @clickOnButton="$strapi.logout()"
      ></UButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import MyProfile from "~/components/organisms/profile/myProfile.vue";
import UButton from "~/components/atoms/uButton.vue";

@Component({
  components: {
    MyProfile,
    UButton,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  updatePageAfterSendNewDataInProfile = 0;
  async asyncData({
    $technologies,
    $myStartups,
    $strapi,
    $profile,
    $experiences,
    $feedbacks,
  }) {
    const startups = await $myStartups($strapi.user.id);
    const { technologies } = await $technologies();
    const profile = await $profile($strapi.user.id);
    let isExpert = false;
    if (profile !== null) {
      isExpert = profile.is_expert;
    }
    const { experiences } = await $experiences();
    let myTechnologies = [];
    let allTechnologies = [];
    let userHaveProfile = true;
    if (profile !== undefined) {
      myTechnologies = profile.technologies;
      allTechnologies = technologies
        .filter((el) => myTechnologies.every((item) => el.id !== item.id))
        .concat(myTechnologies);
    } else {
      userHaveProfile = false;
    }

    const feedbacks = await $feedbacks();
    let myStartupFeedbacks;
    let myChallengeFeedbacks;
    if (feedbacks !== null) {
      myStartupFeedbacks = feedbacks.filter(
        (el) =>
          +el.request.creator.id === +$strapi.user.id &&
          el.request.startup !== null
      );
      myChallengeFeedbacks = feedbacks.filter(
        (el) =>
          +el.request.creator.id === +$strapi.user.id &&
          el.request.challenge !== null
      );
    }
    return {
      startups,
      profile,
      experiences,
      myTechnologies,
      allTechnologies,
      technologies,
      feedbacks,
      userHaveProfile,
      myStartupFeedbacks,
      myChallengeFeedbacks,
      isExpert,
    };
  }

  async updateData() {
    this.profile = await this.$profile(this.$strapi.user.id);
    this.myTechnologies = this.profile.technologies;
  }

  @Watch("profile")
  updateComponetn() {
    this.updatePageAfterSendNewDataInProfile += 1;
  }
}
</script>
<style lang="scss">
.profile {
  .confim-your-email {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 310px);
    h2 {
      font-size: 17px;
    }
    .u-button-gray {
      width: 250px;
    }
  }
}
@media (min-width: 768px) {
  .profile {
    .confim-your-email {
      h2 {
        font-size: 52px;
      }
    }
  }
}
</style>
