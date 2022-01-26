<template>
  <div class="apply-to-team">
    <U-Back v-if="applyToTeamStep1" :link="'/startups'"></U-Back>
    <U-Back
      v-if="!applyToTeamStep1"
      :is-button="true"
      @clikOnButton="applyToTeamGoStep1"
    ></U-Back>
    <Apply-To-Team-Step1
      v-if="applyToTeamStep1"
      :experiences="experiences"
      :technologies="publicTechnologies"
      :new-request="newRequest"
      :user-technologies="choosenTechnologies"
      @applyToTeamGoStep2="applyToTeamGoStep2"
      @chooseDuration="chooseDuration"
      @chosenTechnology="chosenTechnology($event)"
      @addTechnologies="addTechnologies"
      @removeTechnology="removeTechnology"
    ></Apply-To-Team-Step1>

    <Apply-To-Team-Step2
      v-show="applyToTeamStep2"
      :startup="startup || {}"
      :specialisations="specialisations"
      @apply="apply"
    ></Apply-To-Team-Step2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import ApplyToTeamStep1 from "~/components/organisms/team/applyToTeamStep1.vue";
import ApplyToTeamStep2 from "~/components/organisms/team/applyToTeamStep2.vue";
import UBack from "~/components/atoms/uBack.vue";
import { Technology } from "~/models/Technology";
import { Startup } from "~/models/Startup";
import { Experience } from "~/models/Experience";
import { Profile } from "~/models/Profile";

@Component({
  components: {
    UBack,
    ApplyToTeamStep2,
    ApplyToTeamStep1,
  },
})
export default class extends Vue {
  @Prop() technology: Array<Technology>;
  @Prop() startup!: Array<Startup>;
  @Prop() experiences: Array<Experience>;
  @Prop() positions: Array<any>;
  @Prop() userId: Number;
  @Prop() experience: string;
  @Prop() profileId: string;
  @Prop() profile!: Array<Profile>;
  applyToTeamStep1 = true;
  applyToTeamStep2 = false;
  choosenTechnologies = this.profile.technologies.filter((el) => !el.is_public);
  userTechnologies = this.profile.technologies.filter((el) => el.is_public);
  specialisations = [];
  publicTechnologies: Array<Technology> = [];
  newRequest: Array<any> = {
    duration: this.experience,
  };

  chosenTechnology({ item, id }) {
    this.publicTechnologies.forEach((technology) => {
      if (technology.id === id) {
        technology.checked = !technology.checked;
      }
    });
    this.publicTechnologies = JSON.parse(
      JSON.stringify(this.publicTechnologies)
    );
  }

  addTechnologies(data) {
    this.choosenTechnologies.push({
      id: null,
      title: data,
      is_public: false,
    });
  }

  removeTechnology(data) {
    this.choosenTechnologies = [];
    data.forEach((el) => {
      this.choosenTechnologies.push({
        id: el.id,
        title: el.name,
        is_public: false,
      });
    });
  }

  applyToTeamGoStep2() {
    this.applyToTeamStep1 = !this.applyToTeamStep1;
    this.applyToTeamStep2 = !this.applyToTeamStep2;
  }

  applyToTeamGoStep1() {
    this.applyToTeamStep1 = !this.applyToTeamStep1;
    this.applyToTeamStep2 = !this.applyToTeamStep2;
  }

  async apply({ comment, speciality }) {
    const position = this.positions.filter(
      (el) => el.specialisation.id === speciality
    );

    const applicationData = {
      userId: this.userId,
      position: position[0].id,
      comment,
    };
    const profileData = {
      experience: this.newRequest.duration,
      technologies: this.publicTechnologies.filter((el) => el.checked),
      personalTechnologies: this.choosenTechnologies,
    };
    await this.$emit("updateProfile", profileData);
    await this.$emit("createApplication", applicationData);
    this.createNewNotification(comment);
  }

  async createNewNotification(comment: string) {
    try {
      const link = this.startup.slug;
      const newNotification = await this.$createNotificationForStartup(
        this.userId,
        comment,
        link,
        "default",
        this.startup.id
      );
      if (newNotification !== null) {
        await this.$createUserNotification(
          this.startup.owner.id,
          newNotification.id
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  chooseDuration(data) {
    this.newRequest.duration = data.id;
  }

  mounted() {
    this.newRequest.startup = this.startup.id;
    this.publicTechnologies = JSON.parse(JSON.stringify(this.technology));

    this.publicTechnologies.forEach((technology) => {
      if (this.userTechnologies.some((el) => el.id === technology.id)) {
        technology.checked = true;
      } else {
        technology.checked = false;
      }
    });
    this.positions.forEach((position) => {
      console.log(position);
      console.log(
        position.status === "open" &&
          position.applications.some(
            (el) => el.status === "declined" && el.user.id === this.userId
          )
      );
      if (
        position.status === "open" &&
        !(
          position.status === "open" &&
          position.applications.some(
            (el) => el.status === "declined" && el.user.id === this.userId
          )
        )
      ) {
        this.specialisations.push(position.specialisation);
      }
    });
  }
}
</script>
