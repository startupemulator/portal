<template>
  <div class="edit-profile">
    <div class="edit-profile__header">
      <u-back :is-button="true" @clikOnButton="$emit('clickOnButton')"></u-back>
      <u-title :text="'Edit profile'"></u-title>
    </div>
    <div class="edit-profile__content">
      <p>Full name</p>
      <u-input :placeholder="''" :value="$strapi.state.user.username"></u-input>
      <duration-experiense-picker
        :title="'Total years of your experience'"
      ></duration-experiense-picker>
      <technology-picker
        :title="'Pick technologies you have an experience with'"
      ></technology-picker>
      <div class="edit-profile__buttons">
        <u-button
          :button-name="'Save'"
          :button-class="'u-button-blue'"
        ></u-button>
        <u-button
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
          @clickOnButton="$emit('clickOnButton')"
        ></u-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import durationExperiensePicker from "../../molecules/durationExperiencePicker.vue";
import technologyPicker from "~/components/molecules/technologyPicker.vue";
import uBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import uButton from "~/components/atoms/uButton.vue";
@Component({
  components: {
    uBack,
    UTitle,
    uButton,
    UInput,
    durationExperiensePicker,
    technologyPicker,
  },
})
export default class extends Vue {}
</script>
