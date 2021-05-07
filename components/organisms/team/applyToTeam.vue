<template>
  <div class="apply-to-team">
    <U-back v-if="applyToTeamStep1" :link="'/'"></U-back>
    <U-back
      v-if="!applyToTeamStep1"
      :is-button="true"
      @clikOnButton="applyToTeamGoStep2"
    ></U-back>
    <ApplyToTeamStep1
      v-if="applyToTeamStep1"
      :experiences="experiences"
      :technologies="technology"
      :new-request="newRequest"
      @applyToTeamGoStep2="applyToTeamGoStep2"
      @chooseDuration="chooseDuration"
      @chosenTechnology="chosenTechnology"
      @addTechnologies="addTechnologies"
    ></ApplyToTeamStep1>

    <ApplyToTeamStep2
      v-if="applyToTeamStep2"
      :startup="startup || {}"
      :specialisations="specialisations"
      @apply="apply"
    ></ApplyToTeamStep2>
    <PopupApplied
      v-show="popupApplied"
      @closePopupLinkSent="closePopup"
    ></PopupApplied>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import Toast from "../../../store/modules/Toast";
import ApplyToTeamStep1 from "~/components/organisms/team/applyToTeamStep1.vue";
import ApplyToTeamStep2 from "~/components/organisms/team/applyToTeamStep2.vue";
import PopupApplied from "~/components/molecules/popupApplied.vue";
import UBack from "~/components/atoms/uBack.vue";
import { Technology } from "~/models/Technology";
import { Startup } from "~/models/Startup";
import { Experience } from "~/models/Experience";
import Spiner from "~/components/molecules/spiner.vue";

@Component({
  components: {
    UBack,
    ApplyToTeamStep2,
    ApplyToTeamStep1,
    PopupApplied,
    Spiner,
  },
})
export default class extends Vue {
  @Prop() technology: Array<Technology>;
  @Prop() startup!: Array<Startup>;
  @Prop() experiences: Array<Experience>;
  @Prop() specialisations: Array<any>;
  @Prop() userId: Number;
  private applyToTeamStep1 = true;
  private applyToTeamStep2 = false;
  private popupApplied = false;
  loading = false;
  duration: Number = 0;
  newRequest: Array<any> = {};
  applyToTeamGoStep2() {
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
    const position = this.startup.positions.filter(
      (el) => el.specialisation.id === data[1]
    );
    this.newRequest.position = position[0].id;

    console.log(this.newRequest);
    try {
      this.loading = true;
      const newRequest = await this.$strapi.create(
        "applications",
        this.newRequest
      );
      if (newRequest !== null) {
        this.loading = false;
        this.popupApplied = !this.popupApplied;
      }
    } catch (e) {
      this.loading = false;
      Toast.show({
        data: "Something wrong.",
        duration: 3000,
      });
      console.error(e);
    }
  }

  chosenTechnology(data) {
    this.newRequest.technologies = data;
  }

  addTechnologies(data) {
    this.newRequest.newTechnologies = data;
  }

  chooseDuration(data) {
    this.newRequest.duration = data.id;
  }

  mounted() {
    this.newRequest.startup = this.startup.id;
  }
}
</script>
