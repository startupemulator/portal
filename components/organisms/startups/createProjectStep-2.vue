<template>
  <div class="createProject-step2">
    <h2>Select specialities for your team</h2>
    <h3>
      Add all the specialities that you need in your team. During reviewing
      candidates you will be able to accept as much candidates as you need for
      each speciality.
    </h3>
    <Create-Specialities
      v-for="(position, i) in CreateProjectPage.draftStartup.positions"
      :key="position.id"
      :class="'speciality-content'"
      :name="'Speciality ' + (i + 1)"
      :picker="true"
      :position-without-specialisation="positionWithoutSpecialisation"
      :creator="CreateProjectPage.draftStartup.owner.id"
      :specialisations="CreateProjectPage.specialisations"
      :all-technologies="CreateProjectPage.technologies"
      :speciality-from-parent="
        position.specialisation !== null
          ? [position.specialisation.title, position.specialisation.id]
          : ''
      "
      :checked-technologies="position.technologies"
      :position-id="position.id"
      @removeSpeciality="removeSpeciality(position.id, i)"
      @chosenSpeciality="addSpecialityToPosition($event, position.id)"
      @addTechnologyToPosition="addTechnologyToPosition($event)"
      @removeTechnologyToPosition="removeTechnologyToPosition($event)"
      @removePersonalTechnology="removePersonalTechnology($event)"
      @createCustomTechnology="createCustomTechnology($event)"
      @updatePosition="updatePosition($event)"
      @skipTechnologies="skipTechnologies($event)"
    >
    </Create-Specialities>
    <button class="specialityOne__button" @click="addSpeciality">
      Add Speciality
    </button>

    <div class="invite-colleagues">
      <h5>
        You can also invite your colleagues
        <p>to the team as developers or as product owners.</p>
      </h5>
      <Create-Specialities
        v-for="item in CreateProjectPage.invites"
        :key="item.id"
        :name="item.email"
        :specialisations="CreateProjectPage.specialisationsForInvites"
        :picker="false"
        :is-dropping="false"
        :speciality-from-parent="[
          item.position.specialisation.title,
          item.position.specialisation.id,
        ]"
        @removeSpeciality="removeInvitedcolleagues(item.id)"
      ></Create-Specialities>

      <button class="invite-colleagues__button" @click="toggleInviteColleagues">
        Invite colleagues
      </button>
    </div>
    <div class="createProject-step1__buttons">
      <U-Button
        :button-name="'Next'"
        :button-class="'u-button-blue'"
        @clickOnButton="goToStepThree"
      ></U-Button>
      <U-Button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
        @clickOnButton="$emit('saveDraft')"
      ></U-Button>
    </div>
    <Invite-Colleagues
      v-if="inviteColleagues"
      :specialisations="CreateProjectPage.draftStartup.positions"
      @closePopupLinkEmail="toggleInviteColleagues"
      @inviteCollegue="inviteCollegue"
    ></Invite-Colleagues>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Spinner from "../../../store/modules/Spinner";
import UButton from "~/components/atoms/uButton.vue";
import CreateSpecialities from "~/components/molecules/createSpecialities.vue";
import InviteColleagues from "~/components/molecules/inviteColleagues.vue";
import {
  enableScrolling,
  disableScrolling,
} from "~/assets/jshelper/toggleScroll.js";
import { CreateProjectPage } from "~/store";

@Component({
  components: { UButton, CreateSpecialities, InviteColleagues },
})
export default class extends Vue {
  CreateProjectPage;
  constructor() {
    super();
    this.CreateProjectPage = CreateProjectPage;
  }

  @Prop() createdStartupId: Number;
  inviteColleagues = false;
  positionWithoutSpecialisation = false;
  async addSpeciality() {
    Spinner.show();
    await CreateProjectPage.createPosition(this);
    Spinner.hide();
  }

  async removeSpeciality(id, i) {
    Spinner.show();
    await CreateProjectPage.removePosition({ context: this, id });
    Spinner.hide();
  }

  async addSpecialityToPosition(data, id) {
    Spinner.show();
    await CreateProjectPage.addSpecialityToPosition({
      context: this,
      titleId: data[0].id,
      id,
    });
    Spinner.hide();
  }

  goToStepThree() {
    CreateProjectPage.draftStartup.positions.forEach((position) => {
      if (position.specialisation === null) {
        this.positionWithoutSpecialisation = true;
      } else {
        this.positionWithoutSpecialisation = false;
      }
    });
    if (!this.positionWithoutSpecialisation) {
      this.$emit("goToStepThree");
    }
  }

  async inviteCollegue(data) {
    Spinner.show();
    await CreateProjectPage.inviteCollegue({ context: this, data });
    Spinner.hide();

    this.inviteColleagues = !this.inviteColleagues;
    enableScrolling();
  }

  toggleInviteColleagues() {
    if (
      CreateProjectPage.draftStartup.positions.length !== 0 &&
      !CreateProjectPage.draftStartup.positions.some(
        (position) => position.specialisation === null
      )
    ) {
      this.inviteColleagues = !this.inviteColleagues;
      this.inviteColleagues ? disableScrolling() : enableScrolling();
    } else {
      this.goToStepThree();
    }
  }

  async removeInvitedcolleagues(id) {
    Spinner.show();
    await CreateProjectPage.deleteInviteCollegue({ context: this, id });
    Spinner.hide();
  }

  async addTechnologyToPosition({ positionId, technology }) {
    await CreateProjectPage.addTechnologyToPosition({
      positionId,
      technology,
    });
  }

  async removeTechnologyToPosition({ positionId, technology }) {
    await CreateProjectPage.removeTechnologyToPosition({
      positionId,
      technology,
    });
  }

  async removePersonalTechnology({ positionId, technologies }) {
    await CreateProjectPage.removePersonalTechnology({
      technologies,
      positionId,
    });
  }

  async createCustomTechnology({ positionId, technology }) {
    await CreateProjectPage.createCustomTechnology({
      context: this,
      positionId,
      technology,
    });
  }

  async updatePosition({ positionId, technologies, specialisation }) {
    await CreateProjectPage.updatePosition({
      context: this,
      positionId,
      technologies,
      specialisation,
    });
  }

  async skipTechnologies({ positionId, chosenTechnologies }) {
    await CreateProjectPage.skipTechnologies({
      positionId,
      chosenTechnologies,
    });
  }
}
</script>
