<template>
  <div v-cloak class="request-to-team">
    <U-Back :is-button="false" :link="'/startup/' + startup.slug"></U-Back>
    <div class="request-to-team__header">
      <U-Title :text="'Requests to team'"></U-Title>
      <div class="request-to-team__header-description">
        Review candidates that applied to your team. You can choose several
        candidates with the same speciality. Select the most relevant for your
        needs and start the project with your dream team.
      </div>
    </div>
    <div class="request-to-team__content">
      <Position-List
        v-for="(item, i) in (positions = startup.positions.filter(
          (el) => el.specialisation !== null
        ))"
        :id="item.id"
        :key="item.id"
        :title="item.specialisation.title"
        :position="item"
        :position-count="i"
        @accept="changePremission"
        @decline="changePremission"
        @advancedAccess="changePremission"
      ></Position-List>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTitle from "~/components/atoms/uTitle.vue";
import PositionList from "~/components/molecules/positionList.vue";
import UBack from "~/components/atoms/uBack.vue";

import { Startup } from "~/models/Startup";

@Component({
  components: { UTitle, PositionList, UBack },
})
export default class extends Vue {
  @Prop() startup: Array<Startup>;

  changePremission({ id, declineReason, status, positionCount }) {
    this.$emit("updateTeamRequest", {
      id,
      declineReason,
      status,
      positionCount,
    });
  }
}
</script>
