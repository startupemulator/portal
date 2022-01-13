<template>
  <div class="experience">
    <Become-To-Expert
      :technology="Startup.technologies"
      :startup="Startup.startup"
      :experiences="Startup.experiences"
      :positions="Startup.startup.positions"
      :user-id="Startup.profile.user.id"
      :experience="
        Startup.profile.experience ? Startup.profile.experience.id : ''
      "
      :profile-id="Startup.profile.id"
      :profile="Startup.profile"
      @createApplication="createApplication"
      @updateProfile="updateProfile"
    ></Become-To-Expert>
    <Popup-Applied
      v-show="popupApplied"
      @closePopupLinkSent="closePopup"
    ></Popup-Applied>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Spinner from "../../../store/modules/Spinner";
import PopupApplied from "~/components/molecules/popupApplied.vue";
import BecomeToExpert from "~/components/organisms/team/applyToTeam.vue";
import { Startup, EditProfilePage } from "~/store";
@Component({
  components: {
    BecomeToExpert,
    PopupApplied,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  Startup;
  EditProfile;
  constructor() {
    super();
    this.Startup = Startup;
    this.EditProfile = EditProfilePage;
  }

  popupApplied = false;

  async asyncData(context) {
    await Startup.init(context);
    await EditProfilePage.init(context);
  }

  closePopup() {
    this.$router.push("/startups");
    this.popupApplied = !this.popupApplied;
  }

  async createApplication({ userId, position, comment }) {
    Spinner.show();
    await Startup.requestToTeam({
      context: this,
      userId,
      position,
      comment,
    });

    if (Startup.newApplication.length !== 0) {
      this.popupApplied = true;
    } else {
      Toast.show({
        data: "Something wrong!",
        duration: 3000,
      });
    }

    Spinner.hide();
  }

  async updateProfile({ experience, technologies, personalTechnologies }) {
    Spinner.show();
    await EditProfilePage.updateProfile({
      context: this,
      experience,
      technologies,
      personalTechnologies,
    });
    Spinner.hide();
  }
}
</script>
