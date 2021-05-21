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
      <pre style="color: #fff">{{ applications[2] }} </pre>
    </div>
    <div class="request-to-team__content">
      <PositionList
        v-for="item in applications"
        :id="item.id"
        :key="item.id"
        :title="item.position.specialisation.title"
        :position="item"
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

@Component({
  components: { UTitle, PositionList, UBack },
})
export default class extends Vue {
  @Prop() applications: Array<Applications>;
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
