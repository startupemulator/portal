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
      :technologies="technology"
      :new-request="newRequest"
      :user-technologies="choosenTechnologies"
      @applyToTeamGoStep2="applyToTeamGoStep2"
      @chooseDuration="chooseDuration"
      @chosenTechnology="chosenTechnology"
      @addTechnologies="addTechnologies"
      @removeTechnology="removeTechnology"
    ></Apply-To-Team-Step1>

    <Apply-To-Team-Step2
      v-if="applyToTeamStep2"
      :startup="startup || {}"
      :specialisations="specialisations"
      @apply="apply"
    ></Apply-To-Team-Step2>
    <Popup-Applied
      v-show="popupApplied"
      @closePopupLinkSent="closePopup"
    ></Popup-Applied>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import Toast from "../../../store/modules/Toast";
import Spinner from "../../../store/modules/Spinner";
import ApplyToTeamStep1 from "~/components/organisms/team/applyToTeamStep1.vue";
import ApplyToTeamStep2 from "~/components/organisms/team/applyToTeamStep2.vue";
import PopupApplied from "~/components/molecules/popupApplied.vue";
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
    PopupApplied,
  },
})
export default class extends Vue {
  @Prop() technology: Array<Technology>;
  @Prop() startup!: Array<Startup>;
  @Prop() experiences: Array<Experience>;
  @Prop() specialisations: Array<any>;
  @Prop() userId: Number;
  @Prop() experience: string;
  @Prop() profileId: string;
  @Prop() profile!: Array<Profile>;
  private applyToTeamStep1 = true;
  private applyToTeamStep2 = false;
  private popupApplied = false;
  choosenTechnologies = this.profile.technologies;
  userTechnologies = this.profile.technologies.filter((el) => el.is_public);
  userCreatedTechnologies = this.profile.technologies.filter(
    (el) => !el.is_public
  );

  newRequest: Array<any> = {
    duration: this.experience,
  };

  applyToTeamGoStep2() {
    this.applyToTeamStep1 = !this.applyToTeamStep1;
    this.applyToTeamStep2 = !this.applyToTeamStep2;

    this.choosenTechnologies = this.userTechnologies.filter(
      (el) => !el.is_publick
    );
    this.userCreatedTechnologies.forEach((el) => {
      this.choosenTechnologies.push(el);
    });
  }

  applyToTeamGoStep1() {
    this.applyToTeamStep1 = !this.applyToTeamStep1;
    this.applyToTeamStep2 = !this.applyToTeamStep2;
  }

  closePopup() {
    this.$router.push("/startups");
    this.popupApplied = !this.popupApplied;
  }

  async apply(data) {
    this.newRequest.comment = data[0];
    this.newRequest.user = this.userId;
    const technologies = [];
    const position = this.startup.positions.filter(
      (el) => el.specialisation.id === data[1]
    );
    this.newRequest.position = position[0].id;

    try {
      Spinner.show();
      const newRequest = await this.$strapi.create(
        "applications",
        this.newRequest
      );
      if (this.userCreatedTechnologies !== null) {
        for (const technology of this.userCreatedTechnologies) {
          if (!technology.id) {
            try {
              const newTechnology = await this.$createTechnologies(
                this.profileId,
                technology.title
              );
              technologies.push(newTechnology.id);
            } catch (e) {
              console.error(e);
            }
          } else {
            technologies.push(technology.id);
          }
        }
      }
      this.choosenTechnologies.forEach((el) => {
        if (el.is_public) {
          technologies.push(el.id);
        }
      });

      await this.$updateProfile(
        this.profileId,
        technologies,
        this.newRequest.duration
      );

      if (newRequest !== null) {
        this.createNewNotification(this.newRequest.comment);
        Spinner.hide();
        this.popupApplied = !this.popupApplied;
      }
    } catch (e) {
      Spinner.hide();
      Toast.show({
        data: "Something wrong.",
        duration: 3000,
      });
      console.error(e);
    }
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

  async createNewTechnologies(data) {
    try {
      await this.$strapi.create("technologies", {
        creator_id: this.$strapi.user.id,
        title: data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  chosenTechnology(data, id) {
    this.userTechnologies = [];
    id.forEach((el, i) => {
      this.userTechnologies.push({ id: el, title: data[i], is_public: true });
    });
  }

  addTechnologies(data) {
    this.userCreatedTechnologies.push({
      title: data,
      is_public: false,
    });
  }

  removeTechnology(data) {
    this.userCreatedTechnologies = [];
    data.forEach((el) => {
      this.userCreatedTechnologies.push({
        id: el.id,
        title: el.name,
        is_public: false,
      });
    });
  }

  chooseDuration(data) {
    this.newRequest.duration = data.id;
  }

  mounted() {
    this.newRequest.startup = this.startup.id;
  }
}
</script>
