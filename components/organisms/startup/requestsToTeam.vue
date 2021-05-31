<template>
  <div class="request-to-team">
    <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
    <div class="request-to-team__header">
      <UTitle :text="'Requests to team'"></UTitle>
      <div class="request-to-team__header-description">
        Review candidates that applied to your team. You can choose several
        candidates with the same speciality. Select the most relevant for your
        needs and start the project with your dream team.
      </div>
      <!-- <pre style="color: #fff">{{ applications }} </pre> -->
    </div>
    <div class="request-to-team__content">
      <PositionList
        v-for="item in startup.positions"
        :id="item.id"
        :key="item.id"
        :title="item.specialisation.title"
        :position="applications"
        @accept="accept"
        @decline="decline"
      ></PositionList>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTitle from "~/components/atoms/uTitle.vue";
import PositionList from "~/components/molecules/positionList.vue";
import UBack from "~/components/atoms/uBack.vue";
import { Applications } from "~/models/Applications";
import { Startup } from "~/models/Startup";

@Component({
  components: { UTitle, PositionList, UBack },
})
export default class extends Vue {
  @Prop() applications: Array<Applications>;
  @Prop() startup!: Array<Startup>;

  accept(id) {
    this.$emit("accept", id);
  }

  decline(id, declinetext) {
    this.$emit("decline", id, declinetext);
  }
}
</script>
