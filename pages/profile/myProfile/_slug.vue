<template>
  <div class="profile">
    <MyProfile
      :startups="startups"
      :technologies="technologies"
      :testimonials="testimonials"
      :user-data="userData"
      :user-experience="profile.experience"
      :experiences="experiences"
      @copyBaseUri="copyBaseUri"
    ></MyProfile>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import MyProfile from "~/components/organisms/profile/myProfile.vue";
import { copyToClipboard } from "~/assets/jshelper/copyToClipBoard";
@Component({
  components: {
    MyProfile,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  userData = this.$strapi.user ? this.$strapi.user : null;

  async asyncData({
    $myTechnologies,
    $myStartups,
    $strapi,
    $profile,
    $experiences,
  }) {
    const startups = await $myStartups($strapi.user.id);
    const technologies = await $myTechnologies($strapi.user.id);
    const profile = await $profile($strapi.user.id);
    const { experiences } = await $experiences();

    if (profile.technologies !== null) {
      profile.technologies.forEach((el) => technologies.push(el));
    }

    return {
      startups,
      profile,
      technologies,
      experiences,
    };
  }

  copyBaseUri() {
    const url = window.location.href.split("/myProfile").join("");
    console.log(url);
    copyToClipboard(url)
      .then(() => console.log("text copied !"))
      .catch(() => console.log("error"));
  }
}
</script>
