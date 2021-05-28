<template>
  <div class="createProject-step2">
    <h2>Select specialities for your team</h2>
    <h3>
      Add all the specialities that you need in your team. During reviewing
      candidates you will be able to accept as much candidates as you need for
      each speciality.
    </h3>
    <div
      :is="item.type"
      v-for="(item, i) in specialityComponent"
      :key="item.id"
      :technologies="technologies"
      :class="'speciality-content'"
      :name="'Speciality ' + (i + 1)"
      :picker="true"
      :specialisations="specialisations"
      :speciality-from-parent="item.speciality"
      :checked-technologies="item.technologies"
      @removeSpeciality="removeSpeciality(item.id, i)"
      @chosenSpeciality="addSpecialityToSpecialityComponent($event, i, item.id)"
      @chosenTechnologies="addchosenTechnologies($event, i, item.id)"
    ></div>

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
        :specialisations="specialisations"
        :speciality="specialityComponent"
        :picker="false"
        :speciality-from-parent="item.choosenSpeciality"
        @removeSpeciality="
          removeInvitedcolleagues(item.email, item.choosenSpeciality, item.id)
        "
      ></div>
      <button class="invite-colleagues__button" @click="toggleInviteColleagues">
        Invite colleagues
      </button>
    </div>
    <div class="createProject-step1__buttons">
      <U-button
        :button-name="'Next'"
        :button-class="'u-button-blue'"
        @clickOnButton="goToStepThree"
      ></U-button>
      <U-button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
        @clickOnButton="$emit('saveDraft')"
      ></U-button>
    </div>
    <invite-colleagues
      v-if="invitecolleagues"
      :specialisations="specialityComponent"
      @closePopupLinkEmail="toggleInviteColleagues"
      @inviteCollegue="inviteCollegue"
    ></invite-colleagues>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";
import CreateSpecialities from "~/components/molecules/createSpecialities.vue";
import invitecolleagues from "~/components/molecules/inviteColleagues.vue";
import Spiner from "~/components/molecules/spiner.vue";

import { Specialisation } from "~/models/Specialisation";
import {
  enableScrolling,
  disableScrolling,
} from "~/assets/jshelper/toggleScroll.js";
import { Technology } from "~/models/Technology";
@Component({
  components: { UButton, CreateSpecialities, invitecolleagues, Spiner },
})
export default class extends Vue {
  @Prop() technologies: Array<Technology>;
  @Prop() startupData!: Array<any>;
  @Prop() specialisations: Array<Specialisation>;
  @Prop() createdStartupId: Number;
  specialityComponent: Array<any> = [{ id: 0, type: "create-specialities" }];
  invitedcolleagues: Array<any> = [];
  invitecolleagues: Boolean = false;
  loading = false;

  async addSpecialityToSpecialityComponent(data, i, id) {
    this.loading = true;
    const updatePostition = await this.$updatePosition(id, ["0"], data[0].id);
    if (updatePostition !== null) {
      this.specialityComponent[i].speciality = data[0].title;
      this.specialityComponent[i].speciality_id = data[0].id;
    }
    this.loading = false;
  }

  async addchosenTechnologies(data, i, id) {
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
      data.speciality_id,
      this.startupData.id,
      this.startupData.owner.id
    );
    if (invite !== null) {
      const inviteData = {
        id: invite.id,
        type: "create-specialities",
        email: invite.email,
        choosenSpeciality: data.speciality.trim(),
      };
      this.invitedcolleagues.push(inviteData);

      this.invitecolleagues = !this.invitecolleagues;
      enableScrolling();
    }
  }

  toggleInviteColleagues() {
    if (
      this.specialityComponent.length !== 0 &&
      this.specialityComponent[0].speciality
    ) {
      this.invitecolleagues = !this.invitecolleagues;
      this.invitecolleagues ? disableScrolling() : enableScrolling();
    }
  }

  async removeSpeciality(id, i) {
    this.loading = true;
    const removedPosition = await this.$deletePositions(id);
    if (removedPosition.id === id) {
      this.specialityComponent = this.specialityComponent.filter(
        (item) => item.id !== this.specialityComponent[i].id
      );
    }
    this.loading = false;
  }

  async addSpeciality() {
    this.loading = true;
    const newPosition = await this.$createPosition(
      this.createdStartupId.toString(),
      ["0"],
      "12"
    );
    this.specialityComponent.push({
      id: newPosition.id,
      type: "create-specialities",
    });
    this.loading = false;
  }

  async removeInvitedcolleagues(email, speciality, id) {
    this.loading = true;
    const removeInvite = await this.$deleteInvite(id);
    if (id === removeInvite.id) {
      this.invitedcolleagues = this.invitedcolleagues.filter(
        (item) => item.id !== removeInvite.id
      );
    }
    this.loading = false;
  }

  mounted() {
    if (this.startupData.coleagues) {
      this.invitedcolleagues = this.startupData.coleagues;
    } else if (this.startupData.positions) {
      this.specialityComponent = [];
      this.startupData.positions.forEach((el) => {
        const technologies = [];
        el.technologies.forEach((el) => technologies.push(el.title));
        const data = {
          id: el.id,
          type: "create-specialities",
          speciality: el.specialisation.title,
          speciality_id: el.specialisation.id,
          technologies,
        };

        this.specialityComponent.push(data);
      });
    }

    if (this.startupData.specialists) {
      this.specialityComponent = this.startupData.specialists;
    } else if (this.startupData.owner.invites) {
      this.invitedcolleagues = [];

      this.startupData.owner.invites.forEach((el) => {
        if (
          el.position &&
          el.position.startup !== null &&
          this.startupData.id === el.position.startup.id
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
