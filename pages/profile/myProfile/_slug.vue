<template>
  <div class="profile">
    <MyProfile
      :key="updatePageAfterSendNewDataInProfile"
      :startups="startups"
      :technologies="allTechnologies"
      :my-technologies="myTechnologies"
      :testimonials="testimonials"
      :user-data="userData"
      :user-experience="profile.experience"
      :experiences="experiences"
      @updatePage="updatePage"
    ></MyProfile>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import MyProfile from "~/components/organisms/profile/myProfile.vue";

@Component({
  components: {
    MyProfile,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  userData = this.$strapi.user ? this.$strapi.user : null;
  testimonials = false; // test
  updatePageAfterSendNewDataInProfile = 0;
  async asyncData({
    $technologies,
    $myStartups,
    $strapi,
    $profile,
    $experiences,
  }) {
    const startups = await $myStartups($strapi.user.id);
    const { technologies } = await $technologies();
    const profile = await $profile($strapi.user.id);
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

  updatePage() {
    this.updatePageAfterSendNewDataInProfile += 1;
  }
}
</script>
