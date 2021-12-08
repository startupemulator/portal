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
      :creator="CreateProjectPage.draftStartup.owner.id"
      :specialisations="CreateProjectPage.specialisations"
      :speciality-from-parent="[
        position.specialisation.title,
        position.specialisation.id,
      ]"
      :checked-technologies="position.technologies"
      :position-id="position.id"
      @removeSpeciality="removeSpeciality(position.id, i)"
      @chosenSpeciality="addSpecialityToPosition($event, position.id)"
      @chosenTechnologies="addChosenTechnologies($event, i, position.id)"
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
      <div
        :is="item.type"
        v-for="item in invitedcolleagues"
        :key="item.id"
        :name="item.email"
        :specialisations="CreateProjectPage.specialisations"
        :speciality="specialityComponent"
        :picker="false"
        :speciality-from-parent="[item.choosenSpeciality]"
        @removeSpeciality="removeInvitedcolleagues(item.id)"
      ></div>
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
      v-if="invitecolleagues"
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
  specialityComponent: Array<any> = [{ id: 0, type: "create-specialities" }];
  invitedcolleagues: Array<any> = [];
  invitecolleagues: Boolean = false;

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

  async addChosenTechnologies(data, i, id) {
    try {
      await this.$updatePosition(id, data[0].id, data[0].specialisation);
      this.specialityComponent[i].technologies = data[0].technologies;
      this.specialityComponent[i].technologiesId = data[0].id;
      this.specialityComponent[i].newTechnologies = data[0].newTechnologies;
    } catch (e) {
      console.error(e);
    }
  }

  goToStepThree() {
    this.$emit("goToStepThree", [
      this.specialityComponent,
      this.invitedcolleagues,
    ]);
  }

  async inviteCollegue(data) {
    const invite = await this.$createInvite(
      data.email,
      data.position_id,
      CreateProjectPage.draftStartup.id,
      CreateProjectPage.draftStartup.owner.id
    );
    if (invite !== null) {
      const inviteData = {
        id: invite.id,
        type: "create-specialities",
        email: invite.email,
        choosenSpeciality: data.speciality.trim(),
        position_id: data.position_id,
      };
      this.invitedcolleagues.push(inviteData);

      this.invitecolleagues = !this.invitecolleagues;

      enableScrolling();
    }
  }

  toggleInviteColleagues() {
    if (CreateProjectPage.draftStartup.positions.length !== 0) {
      this.invitecolleagues = !this.invitecolleagues;
      this.invitecolleagues ? disableScrolling() : enableScrolling();
    }
  }

  async removeInvitedcolleagues(id) {
    Spinner.show();
    await this.$deleteInvite(id);
    if (id === removeInvite.id) {
      this.invitedcolleagues = this.invitedcolleagues.filter(
        (item) => item.id !== removeInvite.id
      );
    }
    Spinner.hide();
  }

  mounted() {
    if (CreateProjectPage.draftStartup.coleagues) {
      this.invitedcolleagues = CreateProjectPage.draftStartup.coleagues;
    }

    if (CreateProjectPage.draftStartup.specialists) {
      this.specialityComponent = CreateProjectPage.draftStartup.specialists;
    } else if (CreateProjectPage.draftStartup.owner.invites) {
      this.invitedcolleagues = [];

      CreateProjectPage.draftStartup.owner.invites.forEach((el) => {
        if (
          el.position &&
          el.position.startup !== null &&
          CreateProjectPage.draftStartup.id === el.position.startup.id
        ) {
          const data = {
            id: el.id,
            type: "create-specialities",
            email: el.email,
            choosenSpeciality: el.position.specialisation.title,
          };
          this.invitedcolleagues.push(data);
        }
      });
    }
  }
}
</script>
