<template>
  <div class="edit-team">
    <div class="edit-team__header">
      <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
      <UTitle :text="'Edit team'"></UTitle>
      <p>
        Add an additional speciality to receive new requests, change access
        rights for existing team members or remove them from your team.
      </p>
      <div class="edit-team__header-buttons">
        <U-button
          :button-name="'Add Speciality'"
          :button-class="'u-button-blue'"
        ></U-button>
        <U-button
          :button-name="'Invite Collegues'"
          :button-class="'u-button-gray'"
        ></U-button>
      </div>
    </div>
    <div class="edit-team__content">
      <h3>Team</h3>
      <TeamMemberCard v-for="(item, i) in 3" :key="i"></TeamMemberCard>
      <div class="edit-team__content-buttons">
        <U-button
          :button-name="'Save'"
          :button-class="'u-button-blue'"
        ></U-button>
        <U-button
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
        ></U-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import UButton from "~/components/atoms/uButton.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import TeamMemberCard from "~/components/molecules/teamMemberCard.vue";

@Component({
  components: { UButton, UBack, UTitle, TeamMemberCard },
})
export default class extends Vue {}
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
}
@media (min-width: 768px) {
  .edit-team {
    margin-top: 48px;
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
  }
}
</style>
