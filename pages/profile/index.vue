<template>
  <div class="profile">
    <MyProfile
      v-if="userHaveProfile"
      :key="updatePageAfterSendNewDataInProfile"
      :startups="startups"
      :technologies="allTechnologies"
      :my-technologies="myTechnologies"
      :feedbacks="feedbacks"
      :user-data="profile"
      :user-experience="profile.experience"
      :experiences="experiences"
      @updateData="updateData"
    ></MyProfile>
    <div v-else class="confim-your-email">
      <h2>Please confirm your email</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import MyProfile from "~/components/organisms/profile/myProfile.vue";

@Component({
  components: {
    MyProfile,
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
    return {
      startups,
      profile,
      experiences,
      myTechnologies,
      allTechnologies,
      technologies,
      feedbacks,
      userHaveProfile,
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
    justify-content: center;
    height: calc(100vh - 310px);
    h2 {
      font-size: 17px;
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
