<template>
  <div class="profile">
    <MyProfile
      :key="updatePageAfterSendNewDataInProfile"
      :startups="startups"
      :technologies="allTechnologies"
      :my-technologies="myTechnologies"
      :testimonials="testimonials"
      :user-data="profile"
      :user-experience="profile.experience"
      :experiences="experiences"
      @updateData="updateData"
    ></MyProfile>
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
  testimonials = false; // test
  updatePageAfterSendNewDataInProfile = 0;
  async asyncData({
    $technologies,
    $myStartups,
    $strapi,
    $profile,
    $experiences,
  }) {
    const startups = await $myStartups($strapi.state.user.user);
    const { technologies } = await $technologies();
    const profile = await $profile($strapi.state.user.user);
    const { experiences } = await $experiences();
    const myTechnologies = profile.technologies;
    const allTechnologies = technologies
      .filter((el) => myTechnologies.every((item) => el.id !== item.id))
      .concat(myTechnologies);

    return {
      startups,
      profile,
      experiences,
      myTechnologies,
      allTechnologies,
      technologies,
    };
  }

  async updateData() {
    this.profile = await this.$profile(this.$strapi.state.user.user);
    this.myTechnologies = this.profile.technologies;
  }

  @Watch("profile")
  updateComponetn() {
    this.updatePageAfterSendNewDataInProfile += 1;
  }
}
</script>
