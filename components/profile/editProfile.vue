<template>
  <div class="edit-profile">
    <div class="edit-profile__header">
      <u-back :is-button="true" @clikOnButton="$emit('clikOnButton')"></u-back>
      <u-title :text="'Edit profile'"></u-title>
    </div>
    <div class="edit-profile__content">
      <p>Full name</p>
      <u-input :placeholder="''" :value="$strapi.state.user.username"></u-input>
      <duration-experiense-picker
        :title="'Total years of your experience'"
      ></duration-experiense-picker>
      <technology-picker></technology-picker>
      <div class="edit-profile__buttons">
        <u-button
          :button-name="'Save'"
          :button-class="'u-button-blue'"
        ></u-button>
        <u-button
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
        ></u-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import uBack from "../atoms/uBack.vue";
import UTitle from "../atoms/uTitle.vue";
import UInput from "../atoms/uInput.vue";
import uButton from "../atoms/uButton.vue";
import durationExperiensePicker from "../moleculas/durationExperiensePicker.vue";
import technologyPicker from "../moleculas/technologyPicker.vue";
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
