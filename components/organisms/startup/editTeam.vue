<template>
  <div v-cloak class="edit-team createProject-step2">
    <div class="edit-team__header">
      <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
      <UTitle :text="'Edit team'"></UTitle>
      <p>
        Add an additional speciality to receive new requests, change access
        rights for existing team members or remove them from your team.
      </p>
      <div class="edit-team__openposition">
        <h3>Open positions</h3>
        <div
          :is="item.type"
          v-for="(item, i) in specialityComponent"
          :key="item.id"
          :technologies="technologies"
          :class="'speciality-content'"
          :name="'Speciality ' + (i + 1)"
          :picker="true"
          :specialisations="specialisations"
          :speciality-from-parent="[item.speciality, item.speciality_id]"
          :checked-technologies="item.technologies"
          @removeSpeciality="removeSpeciality(item.id, i)"
          @chosenSpeciality="
            addSpecialityToSpecialityComponent($event, i, item.id)
          "
          @chosenTechnologies="addchosenTechnologies($event, i, item.id)"
        ></div>
      </div>
      <div class="edit-team__header-buttons">
        <U-button
          :button-name="'Add Speciality'"
          :button-class="'u-button-blue'"
          :style="invitedcolleagues.length > 0 ? 'max-width:169px' : ''"
          @clickOnButton="addSpeciality"
        ></U-button>

        <U-button
          v-if="invitedcolleagues.length === 0"
          :button-name="'Invite Collegues'"
          :button-class="'u-button-gray'"
          @clickOnButton="toggleInviteColleagues"
        ></U-button>
      </div>

      <div v-if="invitedcolleagues.length > 0" class="invite-colleagues">
        <div
          :is="item.type"
          v-for="item in invitedcolleagues"
          :key="item.id"
          :name="item.email"
          :specialisations="specialisations"
          :speciality="specialityComponent"
          :picker="false"
          :speciality-from-parent="[item.choosenSpeciality]"
          @removeSpeciality="removeInvitedcolleagues(item.id)"
        ></div>
      </div>
      <U-button
        v-if="invitedcolleagues.length > 0"
        :button-name="'Invite Collegues'"
        :button-class="'u-button-gray'"
        :style="
          invitedcolleagues.length > 0 ? 'max-width:169px; height: 50px' : ''
        "
        @clickOnButton="toggleInviteColleagues"
      ></U-button>
    </div>
    <div class="edit-team__content">
      <h3>Team</h3>
      <TeamMemberCard
        v-for="item in team"
        :key="item.id"
        :position="item"
      ></TeamMemberCard>
      <div class="edit-team__content-buttons">
        <U-button
          :button-name="'Save'"
          :button-class="'u-button-blue'"
        ></U-button>
        <U-button
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
          @clickOnButton="$emit('clikOnButton')"
        ></U-button>
      </div>
    </div>
    <Invitecolleagues
      v-if="invitecolleagues"
      :specialisations="specialityComponent"
      @closePopupLinkEmail="toggleInviteColleagues"
      @inviteCollegue="inviteCollegue"
    ></Invitecolleagues>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

import UButton from "~/components/atoms/uButton.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import TeamMemberCard from "~/components/molecules/teamMemberCard.vue";
import { Positions } from "~/models/Positions";
import { Startup } from "~/models/Startup";
import Spiner from "~/components/molecules/spiner.vue";
import CreateSpecialities from "~/components/molecules/createSpecialities.vue";
import { Specialisation } from "~/models/Specialisation";
import { Technology } from "~/models/Technology";
import Invitecolleagues from "~/components/molecules/inviteColleagues.vue";
import {
  enableScrolling,
  disableScrolling,
} from "~/assets/jshelper/toggleScroll.js";
@Component({
  components: {
    UButton,
    UBack,
    UTitle,
    TeamMemberCard,
    CreateSpecialities,
    Spiner,
    Invitecolleagues,
  },
})
export default class extends Vue {
  @Prop() staffedPosition: Array<Positions>;
  @Prop() startup!: Array<Startup>;
  @Prop() startupId: Array<Startup>;
  @Prop() updateKey: Number;
  @Prop() specialisations: Array<Specialisation>;
  @Prop() technologies: Array<Technology>;

  specialityComponent: Array<any> = [{ id: 0, type: "create-specialities" }];
  invitedcolleagues: Array<any> = [];
  invitecolleagues: Boolean = false;
  team = [];
  loading = false;
  async addSpeciality() {
    this.loading = true;
    const newPosition = await this.$createPosition(this.startupId, ["0"], "12");
    this.specialityComponent.push({
      id: newPosition.id,
      type: "create-specialities",
    });
    this.loading = false;
  }

  async removeSpeciality(id, i) {
    this.loading = true;
    const removedPosition = await this.$deletePositions(id);
    if (removedPosition.id === id) {
      this.specialityComponent = this.specialityComponent.filter(
        (item) => item.id !== this.specialityComponent[i].id
      );
      this.invitedcolleagues.forEach((el) => {
        if (+el.position_id === +removedPosition.id) {
          this.removeInvitedcolleagues(el.id);
        }
      });
    }
    this.loading = false;
  }

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

  toggleInviteColleagues() {
    if (
      this.specialityComponent.length !== 0 &&
      this.specialityComponent[0].speciality
    ) {
      this.invitecolleagues = !this.invitecolleagues;
      this.invitecolleagues ? disableScrolling() : enableScrolling();
    }
  }

  async inviteCollegue(data) {
    const invite = await this.$createInvite(
      data.email,
      data.position_id,
      this.startupId,
      this.startup.owner.id
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

  async removeInvitedcolleagues(id) {
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
    if (this.startup.coleagues) {
      this.invitedcolleagues = this.startup.coleagues;
    } else if (this.startup.positions) {
      this.specialityComponent = [];
      this.startup.positions.forEach((el) => {
        const technologies = [];
        el.technologies.forEach((el) => technologies.push(el));
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

    if (this.startup.specialists) {
      this.specialityComponent = this.startup.specialists;
    } else if (this.startup.owner.invites) {
      this.invitedcolleagues = [];

      this.startup.owner.invites.forEach((el) => {
        if (
          el.position &&
          el.position.startup !== null &&
          this.startup.id === el.position.startup.id
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

    this.staffedPosition.forEach((position) => {
      position.applications.forEach((el, i) => {
        if (el.status === "accepted" || el.status === "advanced") {
          const team = {
            id: el.id,
            title: position.specialisation.title,
            status: el.status,
            email: el.user.email,
          };
          this.team.push(team);
        }
      });
    });
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
