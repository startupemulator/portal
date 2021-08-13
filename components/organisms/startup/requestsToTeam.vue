<template>
  <div v-cloak class="request-to-team">
    <UBack :is-button="false" :link="'/startup/' + startup.slug"></UBack>
    <div class="request-to-team__header">
      <UTitle :text="'Requests to team'"></UTitle>
      <div class="request-to-team__header-description">
        Review candidates that applied to your team. You can choose several
        candidates with the same speciality. Select the most relevant for your
        needs and start the project with your dream team.
      </div>
    </div>
    <div class="request-to-team__content">
      <PositionList
        v-for="item in startup.positions"
        :id="item.id"
        :key="item.id"
        :update-key="updateKey"
        :title="item.specialisation.title"
        :position="item"
        @accept="accept"
        @decline="decline"
        @advancedAccess="advancedAccess"
      ></PositionList>
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
  @Prop() updateKey: Number;

  accept(id) {
    this.$emit("accept", id);
  }

  decline(id, declinetext) {
    this.$emit("decline", id, declinetext);
  }

  advancedAccess(id) {
    this.$emit("advancedAccess", id);
  }
}
</script>
