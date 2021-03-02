<template>
  <div class="createProgect-step2">
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
      :class="'id' + i"
      :name="'Speciality ' + (i + 1)"
      @removeSpeciality="removeSpeciality(item.id, i)"
    ></div>

    <button class="specialityOne__button" @click="addSpeciality">
      Add Speciality
    </button>
    <div class="invite-collegues">
      <h5>
        You can also invite your collegues
        <p>to the team as developers or as product owners.</p>
      </h5>
      <ul class="invited-collegues">
        <li v-for="item in invitedCollegues" :key="item.email">
          <p>{{ item.email }}</p>
          <div class="invited-collegues__speciality-block">
            <div class="invited-collegues__speciality">
              {{ item.speciality }}
            </div>
            <button
              type="button"
              class="sign-up-link__close"
              @click="removeInvitedCollegues(item.email, item.speciality)"
            >
              <img src="@/assets/img/close.svg" alt="Close" />
            </button>
          </div>
        </li>
      </ul>
      <button
        class="invite-collegues__button"
        @click="inviteCollegues = !inviteCollegues"
      >
        Invite Collegues
      </button>
    </div>
    <div class="createProgect-step1__buttons">
      <U-button
        :button-name="'Next'"
        :button-class="'u-button-blue'"
        @clickOnButton="$emit('goToStepTwo')"
      ></U-button>
      <U-button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
      ></U-button>
    </div>
    <invite-collegues
      v-if="inviteCollegues"
      @closePopupLinkEmail="inviteCollegues = !inviteCollegues"
      @inviteCollegue="inviteCollegue"
    ></invite-collegues>
  </div>
</template>
<script>
import UButton from "~/components/theme/UButton";
import CreateSpecialities from "~/components/theme/CreateSpecialities";
import inviteCollegues from "~/components/theme/inviteCollegues";

export default {
  components: {
    UButton,
    CreateSpecialities,
    inviteCollegues,
  },
  data: () => ({
    specialityComponent: [{ id: 1, type: "create-specialities" }],
    invitedCollegues: [{ email: "wef@wef.caf", speciality: "wefweg" }],
    inviteCollegues: false,
  }),

  methods: {
    inviteCollegue(data) {
      this.inviteCollegues = !this.inviteCollegues;
      this.invitedCollegues.push({
        email: data.email,
        speciality: data.speciality,
      });
    },
    removeSpeciality(id, i) {
      this.specialityComponent = this.specialityComponent.filter(
        (item) => item.id !== this.specialityComponent[i].id
      );
    },
    addSpeciality() {
      this.specialityComponent.push({
        id: Math.random(),
        type: "create-specialities",
      });
    },
    removeInvitedCollegues(email, speciality) {
      this.invitedCollegues = this.invitedCollegues.filter(
        (item) => (item.email !== email) & (item.speciality !== speciality)
      );
      console.log(email, speciality);
    },
  },
};
</script>
