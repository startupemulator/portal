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
      :key="Math.floor(Math.random() * 144554) + i"
      :technologies="technologies"
      :class="'speciality-content'"
      :name="'Speciality ' + (i + 1)"
      :picker="true"
      :specialisations="specialisations"
      :speciality-from-parent="item.speciality"
      :checked-technologies="item.technologies"
      @removeSpeciality="removeSpeciality(item.id, i)"
      @chosenSpeciality="addSpecialityToSpecialityComponent($event, i)"
      @chosenTechnologies="addchosenTechnologies($event, i)"
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
        :picker="false"
        :speciality-from-parent="item.choosenSpeciality"
        @removeSpeciality="
          removeInvitedcolleagues(item.email, item.choosenSpeciality)
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
        @clickOnButton="saveDraft"
      ></U-button>
    </div>
    <invite-colleagues
      v-if="invitecolleagues"
      :specialisations="specialityComponent"
      @closePopupLinkEmail="toggleInviteColleagues"
      @inviteCollegue="inviteCollegue"
    ></invite-colleagues>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";
import CreateSpecialities from "~/components/molecules/createSpecialities.vue";
import invitecolleagues from "~/components/molecules/inviteColleagues.vue";
import { Specialisation } from "~/models/Specialisation";
import {
  enableScrolling,
  disableScrolling,
} from "~/assets/jshelper/toggleScroll.js";
import { Technology } from "~/models/Technology";
@Component({
  components: { UButton, CreateSpecialities, invitecolleagues },
})
export default class extends Vue {
  @Prop() technologies: Array<Technology>;
  @Prop() startUpData!: Array<any>;
  @Prop() specialisations: Array<Specialisation>;
  @Prop() createdStartupId: Number;
  specialityComponent: Array<any> = [{ id: 0, type: "create-specialities" }];
  invitedcolleagues: Array<any> = [];
  invitecolleagues: Boolean = false;

  saveDraft() {}

  addSpecialityToSpecialityComponent(data, i) {
    this.specialityComponent[i].speciality = data[0].title;
    this.specialityComponent[i].speciality_id = data[0].id;
  }

  addchosenTechnologies($event, i) {
    this.specialityComponent[i].technologies = $event[0].technologies;
    this.specialityComponent[i].technologiesId = $event[0].id;
    this.specialityComponent[i].newTechnologies = $event[0].newTechnologies;
  }

  goToStepThree() {
    this.$emit("goToStepThree", [
      this.specialityComponent,
      this.invitedcolleagues,
    ]);
  }

  inviteCollegue(data) {
    this.invitecolleagues = !this.invitecolleagues;
    const someData = {
      id: this.invitedcolleagues.length + 1,
      type: "create-specialities",
      email: data.email,
      choosenSpeciality: data.speciality.trim(),
    };
    this.invitedcolleagues.push(someData);
    enableScrolling();
  }

  toggleInviteColleagues() {
    if (this.specialityComponent[0].speciality) {
      this.invitecolleagues = !this.invitecolleagues;
      this.invitecolleagues ? disableScrolling() : enableScrolling();
    }
  }

  removeSpeciality(id, i) {
    this.specialityComponent = this.specialityComponent.filter(
      (item) => item.id !== this.specialityComponent[i].id
    );
  }

  addSpeciality() {
    this.specialityComponent.push({
      id: this.specialityComponent.length + 1,
      type: "create-specialities",
    });
  }

  removeInvitedcolleagues(email, speciality) {
    this.invitedcolleagues = this.invitedcolleagues.filter(
      (item) => item.email !== email && item.choosenSpeciality !== speciality
    );
  }

  mounted() {
    if (this.startUpData.coleagues) {
      this.invitedcolleagues = this.startUpData.coleagues;
    }
    if (this.startUpData.specialists) {
      this.specialityComponent = this.startUpData.specialists;
    }
  }
}
</script>
