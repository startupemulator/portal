<template>
  <div v-cloak class="start-ups">
    <div class="start-ups__content">
      <div class="start-ups__header">
        <U-Title :text="'Startups'"></U-Title>
        <div class="start-ups__header-filter">
          <p>Filter by Technologies</p>
          <ul
            class="start-ups__header-filter_list"
            :class="filterList ? 'filter_list--opend' : ''"
          >
            <li v-for="item in technologies" :key="item.id">
              <U-Tags
                :id="item.id"
                :title="item.title"
                :name="item.title"
                :class="item.isChecked ? 'checked' : ''"
                :is-checked="item.isChecked"
                :type="'checkbox'"
                @pick="pickTechnology(item.id)"
              ></U-Tags>
            </li>
          </ul>

          <button
            type="button"
            class="start-ups__all-technologies"
            @click="toggleFilterList"
          >
            <span v-show="!filterList">Show All Technologies</span>
            <span v-show="filterList">Show short list Technologies</span>
          </button>
        </div>
        <div class="start-ups__header-state-button">
          <U-Tabs
            :staffed="isExpert ? waitingFeedback.length : 0"
            @activateButton="$emit('filterByPosition', $event)"
          ></U-Tabs>
        </div>
      </div>
      <div class="start-ups_cards-content startup-block">
        <div class="transition__startup-card">
          <Startup-Card
            v-for="card in startups"
            :key="card.id"
            :card="card"
            :technology="technologies"
            :user-id="userId"
            :waiting-feedback="card.state !== 'finished' ? waitingFeedback : []"
          ></Startup-Card>
        </div>
      </div>

      <u-button
        v-if="!emptyState"
        :class="'u-button-gray u-button-gray__show-more'"
        :button-name="'Show More'"
      ></u-button>
      <Empty-State v-if="emptyState" @clickOnButton="cleanFilter"></Empty-State>
      <App-Team-Develop v-if="!authorized"></App-Team-Develop>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import AppTeamDevelop from "~/components/organisms/landing/appTeamDevelop.vue";
import { Startup } from "~/models/Startup";
import { Technology } from "~/models/Technology";
import UTags from "~/components/atoms/uTags.vue";
import UTabs from "~/components/atoms/uTabs.vue";
import StartupCard from "~/components/molecules/startupCard.vue";
import EmptyState from "~/components/molecules/emptyState.vue";
import { AskFeedbacks } from "~/models/AskFeedbacks";
@Component({
  components: {
    UTitle,
    UTabs,
    UButton,
    AppTeamDevelop,
    StartupCard,
    UTags,
    EmptyState,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
  @Prop() technologies: Array<Technology>;
  @Prop() emptyState: Boolean;
  @Prop() isExpert: Boolean;
  @Prop() authorized: Boolean;
  @Prop() userId: string;
  @Prop() waitingFeedback: Array<AskFeedbacks>;
  private filterList: boolean = false;

  toggleFilterList() {
    this.filterList = !this.filterList;
  }

  cleanFilter() {
    this.$emit("cleanFilter");
  }

  pickTechnology(technologyId) {
    this.technologies.forEach((technology) => {
      if (technology.id === technologyId && !technology.isChecked) {
        technology.isChecked = true;
      } else if (technology.id === technologyId && technology.isChecked) {
        technology.isChecked = false;
      }
    });

    this.$emit(
      "pickedTechnologies",
      this.technologies.filter((el) => el.isChecked)
    );
  }
}
</script>
