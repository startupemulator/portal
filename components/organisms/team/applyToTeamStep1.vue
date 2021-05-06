<template>
  <div class="apply-to-team-step1">
    <UTitle :text="'Your experience'"></UTitle>

    <!-- <pre style="color: #fff">{{ experiences }}</pre> -->
    <DurationExperiencePicker
      :title="'Total years of your experience'"
      :experiences="experiences"
      :duration="newRequest.duration"
      @clickOnDuration="$emit('chooseDuration', $event)"
    ></DurationExperiencePicker>
    <TechnologyPicker
      :title="'Pick technologies you have an experience with'"
      :technologies="technologies"
      :choosen-technologies="newRequest.technologies"
      @chosenTechnologi="chosenTechnology"
      @addTechnologies="$emit('addTechnologies', $event)"
    ></TechnologyPicker>
    <div class="apply-to-team__button">
      <U-button
        :button-class="'u-button-blue'"
        :button-name="'Next'"
        @clickOnButton="$emit('applyToTeamGoStep2')"
      ></U-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import DurationExperiencePicker from "~/components/molecules/durationExperiencePicker.vue";
import { Technology } from "~/models/Technology";
import { Experience } from "~/models/Experience";

@Component({
  components: {
    DurationExperiencePicker,
    UTitle,
    UButton,
    TechnologyPicker,
  },
})
export default class extends Vue {
  @Prop() technologies: Array<Technology>;
  @Prop() experiences: Array<Experience>;
  @Prop() newRequest: Array<any>;

  chosenTechnology(data, id) {
    this.$emit("chosenTechnology", id);
  }
}
</script>
