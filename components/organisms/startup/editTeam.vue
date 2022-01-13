<template>
  <div class="edit-team createProject-step2">
    <div class="edit-team__header">
      <U-Back :is-button="true" @clikOnButton="$emit('clikOnButton')"></U-Back>
      <U-Title :text="'Edit team'"></U-Title>
      <p>
        Add an additional speciality to receive new requests, change access
        rights for existing team members or remove them from your team.
      </p>
      <div class="edit-team__openposition">
        <h3>Open positions</h3>
        <Create-Specialities
          v-for="(position, i) in Startup.startup.positions"
          :key="position.id"
          :class="'speciality-content'"
          :name="'Speciality ' + (i + 1)"
          :picker="true"
          :is-edit-team="true"
          :status="position.status"
          :position-without-specialisation="false"
          :creator="Startup.startup.owner.id"
          :specialisations="Startup.specialisations"
          :all-technologies="Startup.technologies"
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
          @changeStatusPosition="changeStatusPosition($event)"
        >
        </Create-Specialities>
      </div>
      <div class="edit-team__header-buttons">
        <U-Button
          :button-name="'Add Speciality'"
          :button-class="'u-button-blue'"
          :style="'max-width:169px'"
          @clickOnButton="addSpeciality"
        ></U-Button>
        <U-Button
          :button-name="'Invite Collegues'"
          :button-class="'u-button-gray'"
          @clickOnButton="toggleInviteColleagues"
        ></U-Button>
      </div>
    </div>
    <div class="edit-team__content">
      <h3>Team</h3>

      <div v-for="(items, i) in Startup.startup.positions" :key="items.id">
        <Team-Member-Card
          v-for="item in items.applications.filter(
            (el) => el.status === 'accepted' || el.status === 'advanced'
          )"
          :key="item.id"
          :specialisation="items.specialisation.title"
          :user-name="item.user.profile.name"
          :position-count="i"
          :application-id="item.id"
          :premission="item.status"
          @chagePremission="chagePremission"
          @removeUserMember="$emit('removeUserMember', $event)"
        ></Team-Member-Card>
      </div>

      <div class="edit-team__content-buttons">
        <U-Button
          :button-name="'Save'"
          :button-class="'u-button-blue'"
          @clickOnButton="save"
        ></U-Button>
        <U-Button
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
          @clickOnButton="cancel"
        ></U-Button>
      </div>
    </div>
    <Invite-Collegue
      v-if="inviteColleagues"
      :specialisations="Startup.startup.positions"
      @closePopupLinkEmail="toggleInviteColleagues"
      @inviteCollegue="inviteCollegue"
    ></Invite-Collegue>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

import Spinner from "../../../store/modules/Spinner";
import UButton from "~/components/atoms/uButton.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import TeamMemberCard from "~/components/molecules/teamMemberCard.vue";
import CreateSpecialities from "~/components/molecules/createSpecialities.vue";
import InviteCollegue from "~/components/molecules/inviteColleagues.vue";
import {
  enableScrolling,
  disableScrolling,
} from "~/assets/jshelper/toggleScroll.js";
import { Startup } from "~/store";

@Component({
  components: {
    UButton,
    UBack,
    UTitle,
    TeamMemberCard,
    CreateSpecialities,
    InviteCollegue,
  },
})
export default class extends Vue {
  Startup;
  constructor() {
    super();
    this.Startup = Startup;
  }

  inviteColleagues: Boolean = false;

  loading = false;
  async addSpeciality() {
    Spinner.show();
    await Startup.createPosition(this);
    Spinner.hide();
  }

  async removeSpeciality(id) {
    Spinner.show();
    await Startup.removePosition({ context: this, id });
    Spinner.hide();
  }

  async addSpecialityToPosition(data, id) {
    Spinner.show();
    await Startup.addSpecialityToPosition({
      context: this,
      titleId: data[0].id,
      id,
    });
    Spinner.hide();
  }

  async addTechnologyToPosition({ positionId, technology }) {
    await Startup.addTechnologyToPosition({
      positionId,
      technology,
    });
  }

  async removeTechnologyToPosition({ positionId, technology }) {
    await Startup.removeTechnologyToPosition({
      positionId,
      technology,
    });
  }

  async removePersonalTechnology({ positionId, technologies }) {
    await Startup.removePersonalTechnology({
      technologies,
      positionId,
    });
  }

  async createCustomTechnology({ positionId, technology }) {
    await Startup.createCustomTechnology({
      context: this,
      positionId,
      technology,
    });
  }

  async updatePosition({ positionId, technologies, specialisation }) {
    await Startup.updatePosition({
      context: this,
      positionId,
      technologies,
      specialisation,
    });
  }

  async skipTechnologies({ positionId, chosenTechnologies }) {
    await Startup.skipTechnologies({
      positionId,
      chosenTechnologies,
    });
  }

  cancel() {
    this.$emit("cancelEditTeam");
  }

  save() {
    this.$emit("cancelEditTeam");
  }

  toggleInviteColleagues() {
    this.inviteColleagues = !this.inviteColleagues;
    this.inviteColleagues ? disableScrolling() : enableScrolling();
  }

  async inviteCollegue(data) {
    Spinner.show();
    await Startup.inviteCollegue({ context: this, data });
    Spinner.hide();

    this.inviteColleagues = !this.inviteColleagues;
    enableScrolling();
  }

  chagePremission({ premission, applicationId, positionCount }) {
    Startup.changePremission({
      context: this,
      premission,
      applicationId,
      positionCount,
    });
  }

  changeStatusPosition({ positionId, status }) {
    Startup.changePositionStatus({ context: this, positionId, status });
  }
}
</script>
<style lang="scss">
.edit-team {
  max-width: 660px;
  margin: 0 auto;
  padding: 0 16px;
  margin-top: 40px;
  color: #fff;

  .edit-team__header {
    h2 {
      margin-bottom: 0;
    }

    p {
      margin-top: 12px;
      margin-bottom: 24px;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
    }

    .u-button {
      height: 40px;
    }

    .u-button-gray {
      margin-top: 12px;
    }
  }

  .edit-team__content {
    h3 {
      font-weight: bold;
      font-size: 26px;
      line-height: 32px;
      margin-top: 32px;
    }
  }

  .edit-team__content-buttons {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 16px 16px 28px 16px;
    background: #232b39;
    border: 1px solid #3b465a;
    box-shadow: inset 0 0 10px 2px #262f3f;
    border-radius: 16px 16px 0 0;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    z-index: 4;

    .u-button-gray {
      margin-left: 16px;
    }
  }

  .edit-team__openposition {
    h3 {
      font-weight: bold;
      font-size: 26px;
      line-height: 32px;
      margin-bottom: 16px;
    }
  }
}
@media (min-width: 768px) {
  .edit-team {
    margin-top: 48px;

    .invite-colleagues {
      margin-top: 33px;
      padding-top: 16px;
    }

    .u-button {
      min-height: 56px;
    }

    .button_pick_technologyes {
      margin-bottom: 16px;
    }

    .edit-team__header {
      p {
        font-size: 17px;
        line-height: 24px;
        width: 600px;
      }

      .edit-team__header-buttons {
        display: flex;
        width: 360px;

        .u-button {
          height: 48px;
        }

        .u-button-gray {
          margin-top: 0;
          margin-left: 16px;
        }
      }
    }

    .edit-team__content {
      h3 {
        font-weight: 600;
        font-size: 35px;
        line-height: 40px;
        margin-top: 40px;
        margin-bottom: 24px;
      }
    }

    .edit-team__content-buttons {
      position: static;
      border: none;
      border-top: 1px solid #3b465a;
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 36px 0;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      margin-top: 32px;

      .u-button-gray {
        margin-left: 24px;
      }
    }

    .edit-team__openposition {
      h3 {
        font-weight: 600;
        font-size: 35px;
        line-height: 40px;
        margin-bottom: 24px;
        margin-top: 42px;
      }
    }
  }
}
</style>
