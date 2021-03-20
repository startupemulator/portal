<template>
  <div class="start-ups startup-block challenges">
    <div class="start-ups__content">
      <div class="start-ups__header challenges__header">
        <U-title :text="'Challenges'"></U-title>
        <div class="start-ups__header-filter">
          <p>Filter by Specialty</p>
          <ul
            class="start-ups__header-filter_list challenges-filter_list"
            :class="filterList ? 'filter_list--opend' : ''"
          >
            <li
              v-for="specialisation in specialisations"
              :key="specialisation.id"
              class="start-ups__header-filter_item"
            >
              <U-tags
                :id="specialisation.id"
                :title="specialisation.title"
                :name="specialisation.title"
                :type="'checkbox'"
                :checked-class="specialisation.checked ? 'checked' : ''"
                @pick="specialty(i)"
              ></U-tags>
            </li>
          </ul>
        </div>
      </div>

      <div class="start-ups_cards-content startup-block">
        <div data-v-4c0228a8="" class="transition__startup-card">
          <challenge-card
            v-for="card in challenges"
            :key="card.id"
            :card="card"
          >
          </challenge-card>
        </div>
      </div>
      <u-button
        :class="'u-button-gray u-button-gray__show-more'"
        :button-name="'Show More'"
      ></u-button>
      <app-team-develop></app-team-develop>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import AppTeamDevelop from "~/components/organisms/landing/appTeamDevelop.vue";
import ChallengeCard from "~/components/molecules/challengeCard.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UTags from "~/components/atoms/uTags.vue";
import { Challenge } from "~/models/Challenge";
import { Specialisation } from "~/models/Specialisation";
import UButton from "~/components/atoms/uButton.vue";

@Component({
  components: {
    UTitle,
    UTags,
    AppTeamDevelop,
    ChallengeCard,
    UButton,
  },
})
export default class extends Vue {
  @Prop()
  challenges: Array<Challenge>;

  @Prop()
  specialisations: Array<Specialisation>;

  private filterList: boolean = false;
  toggleFilserList() {
    this.filterList = !this.filterList;
  }

  specialty(i) {
    this.specialisations.forEach((el) => {
      if (i + 1 === el.id) {
        el.checked = !el.checked;
      }
    });
  }
}
</script>
