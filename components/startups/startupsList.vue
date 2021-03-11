<template>
  <div class="start-ups">
    <div class="start-ups__content">
      <div class="start-ups__header">
        <U-title :text="'Startups'"></U-title>
        <div class="start-ups__header-filter">
          <p>Filter by Technologies</p>
          <ul
            class="start-ups__header-filter_list"
            :class="filterList ? 'filter_list--opend' : ''"
          >
            <li v-for="item in technologies" :key="item.id">
              <U-tags
                :id="item.id"
                :title="item.title"
                :name="item.title"
                :type="'checkbox'"
                @pick="pickTechnologi($event)"
              ></U-tags>
            </li>
          </ul>

          <button
            type="button"
            class="start-ups__all-technologies"
            @click="toggleFilserList"
          >
            <span v-show="!filterList">Show All Technologies</span>
            <span v-show="filterList">Show short list Technologies</span>
          </button>
        </div>
        <div class="start-ups__header-state-button">
          <U-Tabs></U-Tabs>
        </div>
      </div>
      <div class="start-ups_cards-content startup-block">
        <div data-v-4c0228a8="" class="transition__startup-card">
          <startup-card
            v-for="card in startups"
            :key="card.id"
            :card="card"
          ></startup-card>
        </div>
      </div>
      <app-team-develop></app-team-develop>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTitle from "../theme/uTitle.vue";
// import TechnologyItem from "../theme/technologyItem.vue";
import AppTeamDevelop from "../homePage/appTeamDevelop.vue";
import { Startup } from "../../models/Startup";
import { Technology } from "../../models/Technology";
import UTags from "../theme/uTags.vue";
import StartupCard from "~/components/moleculas/startupCard.vue";
import UTabs from "~/components/theme/uTabs.vue";

@Component({
  components: {
    UTitle,
    UTabs,
    // TechnologyItem,
    AppTeamDevelop,
    StartupCard,
    UTags,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
  @Prop() technologies: Array<Technology>;

  private filterList: boolean = false;

  toggleFilserList() {
    this.filterList = !this.filterList;
  }

  pickTechnologi(event) {
    const el = event.target;
    if (el.checked & !el.parentElement.classList.contains("checked")) {
      el.parentElement.classList.add("checked");
    } else {
      el.parentElement.classList.remove("checked");
    }
  }
}
</script>
