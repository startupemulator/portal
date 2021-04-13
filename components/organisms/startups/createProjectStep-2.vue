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
      :class="'speciality-content'"
      :name="'Speciality ' + (i + 1)"
      @removeSpeciality="removeSpeciality(item.id, i)"
      @chosenSpeciality="addSpecialityToSpecialityComponent($event, i)"
    ></div>

    <button class="specialityOne__button" @click="addSpeciality">
      Add Speciality
    </button>
    <div class="invite-colleagues">
      <h5>
        You can also invite your colleagues
        <p>to the team as developers or as product owners.</p>
      </h5>
      <ul class="invited-colleagues">
        <li v-for="item in invitedcolleagues" :key="item.email">
          <p>{{ item.email }}</p>
          <div class="invited-colleagues__speciality-block">
            <div class="invited-colleagues__speciality">
              {{ item.speciality }}
            </div>
            <button
              type="button"
              class="sign-up-link__close"
              @click="removeInvitedcolleagues(item.email, item.speciality)"
            >
              <img src="~/assets/img/close.svg" alt="Close" />
            </button>
          </div>
        </li>
      </ul>
      <button class="invite-colleagues__button" @click="toggleInviteColleagues">
        Invite colleagues
      </button>
    </div>
    <div class="createProject-step1__buttons">
      <U-button
        :button-name="'Next'"
        :button-class="'u-button-blue'"
        @clickOnButton="$emit('goToStepThree')"
      ></U-button>
      <U-button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
        @clickOnButton="test"
      ></U-button>
    </div>
    <invite-colleagues
      v-if="invitecolleagues"
      @closePopupLinkEmail="toggleInviteColleagues"
      @inviteCollegue="inviteCollegue"
    ></invite-colleagues>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";
import CreateSpecialities from "~/components/molecules/createSpecialities.vue";
import invitecolleagues from "~/components/molecules/inviteColleagues.vue";
import {
  enableScrolling,
  disableScrolling,
} from "~/assets/jshelper/toggleScroll.js";

@Component({
  components: { UButton, CreateSpecialities, invitecolleagues },
})
export default class extends Vue {
  specialityComponent: Array<[number | string]> = [
    { id: 1, type: "create-specialities" },
  ];

  invitedcolleagues: Array<any>;
  invitecolleagues: Boolean = false;

  test() {
    console.log(this.specialityComponent);
  }

  addSpecialityToSpecialityComponent($event, i) {
    this.specialityComponent[i].speciality = $event[0];
    console.dir(this.specialityComponent);
    console.log($event, i);
  }

  inviteCollegue(data) {
    this.invitecolleagues = !this.invitecolleagues;
    enableScrolling();
    this.invitedcolleagues.push({
      email: data.email,
      speciality: data.speciality,
    });
  }

  toggleInviteColleagues() {
    this.invitecolleagues = !this.invitecolleagues;
    console.log(this.invitecolleagues);
    this.invitecolleagues ? disableScrolling() : enableScrolling();
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
      (item) => (item.email !== email) & (item.speciality !== speciality)
    );
  }
}
</script>
