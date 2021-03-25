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
    </div>
    <div class="request-to-team__content">
      <PositionList
        v-for="specialisation in specialisations"
        :id="specialisation.id"
        :key="specialisation.id"
        :title="specialisation.title"
        :position="specialisation"
      ></PositionList>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import UTitle from "~/components/atoms/uTitle.vue";
import PositionList from "~/components/molecules/positionList.vue";
import UBack from "~/components/atoms/uBack.vue";
@Component({
  components: { UTitle, PositionList, UBack },
})
export default class extends Vue {
  data() {
    return {
      specialisations: [
        {
          id: 0,
          title: "Back-end Developer",
          position: [
            {
              user: "Andrey Maslov",
              uncheck: false,
              check: false,
              access: false,
              profile: false,
            },
          ],
        },
        {
          id: 1,
          title: "Front-end Developer",
          position: [
            {
              user: "Artem Mith",
              uncheck: false,
              check: true,
              access: true,
              profile: false,
            },
            {
              user: "Jon Snow",
              uncheck: true,
              check: true,
              access: true,
              profile: true,
            },
            {
              user: "Sara Conor",
              uncheck: true,
              check: true,
              access: true,
              profile: false,
            },
          ],
        },
        {
          id: 2,
          title: "Full Stack Developer",
          position: [
            {
              user: "Jon Dow",
              uncheck: true,
              check: false,
              access: true,
              profile: false,
            },
          ],
        },
        {
          id: 3,
          title: "UI/UX Designer",
          position: [
            {
              user: "Alex Cortex",
              uncheck: false,
              check: false,
              access: false,
              profile: false,
            },
          ],
        },
      ],
    };
  }
}
</script>
