<template>
  <div class="profile">
    <MyProfile
      :startups="startups"
      :technologies="technologies"
      :testimonials="testimonials"
      :user-data="userData"
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
  // data loaded here will be added during server rendering
  userData = this.$strapi.user ? this.$strapi.user : null;
  async asyncData({ $strapi }) {
    const startups = await $strapi.find("startups");
    const technologies = await $strapi.find("technologies");
    const testimonials = await $strapi.find("testimonials");
    return {
      startups,
      technologies,
      testimonials,
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
