<template>
  <div class="profile-content">
    <div class="profile-header">
      <u-back :link="'/'"></u-back>
      <U-title :text="user.name || user.username"> </U-title>
    </div>
    <Regular-user v-if="false" :startups="startups"></Regular-user>
    <Expert-user v-if="true"> </Expert-user>
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
}
</script>
