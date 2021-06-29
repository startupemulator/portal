<template>
  <div v-cloak class="start-ups">
    <pre style="color: #fff">{{ waitingFeedback }}</pre>
    <div class="start-ups__content">
      <div class="start-ups__header">
        <U-title :text="'Startups'"></U-title>
        <div class="start-ups__header-filter">
          <p>Filter by Technologies</p>
          <ul
            class="start-ups__header-filter_list"
            :class="filterList ? 'filter_list--opend' : ''"
          >
            <li v-for="item in technologies" :key="item.id" ref="filter">
              <U-tags
                :id="item.id"
                :title="item.title"
                :name="item.title"
                :type="'checkbox'"
                @pick="pickTechnologi($event.target)"
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
          <U-Tabs
            :staffed="waitingFeedback.length"
            @activateButton="$emit('filterByPosition', $event)"
          ></U-Tabs>
        </div>
      </div>
      <div class="start-ups_cards-content startup-block">
        <div class="transition__startup-card">
          <Startup-card
            v-for="card in startups"
            :key="card.id"
            :card="card"
            :technology="technologies"
            :user-id="userId"
          ></Startup-card>
        </div>
      </div>

      <u-button
        v-if="!emptyState"
        :class="'u-button-gray u-button-gray__show-more'"
        :button-name="'Show More'"
      ></u-button>
      <EmptyState v-if="emptyState" @clickOnButton="cleanFilter"></EmptyState>
      <AppTeamDevelop v-if="!autorizated"></AppTeamDevelop>
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

  @Prop() autorizated: Boolean;
  @Prop() userId: string;
  @Prop() waitingFeedback: Array<AskFeedbacks>;
  private filterList: boolean = false;
  pickedTechnologies: Array<string> = [];

  toggleFilserList() {
    this.filterList = !this.filterList;
  }

  cleanFilter() {
    this.$refs.filter.forEach((el) => {
      el.children[0].classList.remove("checked");
    });
    this.$emit("cleanFilter");
  }

  pickTechnologi(event) {
    const el = event;
    if (el.checked & !el.parentElement.classList.contains("checked")) {
      el.parentElement.classList.add("checked");
      this.pickedTechnologies.push(["technologies.id", event.id]);
    } else {
      this.pickedTechnologies = this.pickedTechnologies.filter(
        (el) => el[1] !== event.id
      );
      el.parentElement.classList.remove("checked");
    }
    this.$emit("pickedTechnologies", this.pickedTechnologies);
  }
}
</script>
