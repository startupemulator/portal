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
import uBack from "../theme/uBack.vue";
import UTitle from "../theme/uTitle.vue";
import UInput from "../theme/uInput.vue";
import uButton from "../theme/uButton.vue";
import durationExperiensePicker from "../theme/durationExperiensePicker.vue";
import technologyPicker from "../theme/technologyPicker.vue";
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
