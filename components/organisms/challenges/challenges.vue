<template>
  <div class="challenges">
    <div class="challenges__header">
      <UTitle :text="'Challenges'"></UTitle>
      <div class="challenges__header-speciality-filters">
        <div class="challenges__header-speciality-filter">
          <p>Filter by Specialty</p>
          <ul
            ref="specialityList"
            class="challenges__header-speciality-filter_list"
            :class="filterList ? 'opend-filter' : ''"
          >
            <li
              v-for="specialisation in specialisations"
              :key="specialisation.id"
              class="challenges__header-speciality-filter_item"
            >
              <U-tags
                :id="specialisation.id"
                :title="specialisation.title"
                :name="specialisation.title"
                :type="'checkbox'"
                :checked-class="specialisation.checked ? 'checked' : ''"
                @pick="specialty($event)"
              ></U-tags>
            </li>
          </ul>
          <button
            v-if="$device.isMobile"
            type="button"
            class="filter-list-button"
            @click="toggleFilserList"
          >
            <span v-show="!filterList">Show All Technologies</span>
            <span v-show="filterList">Show short list Technologies</span>
          </button>
        </div>
        <div class="challenges__header-diffculty-filter">
          <p>Filter by Difficulty level</p>

          <ul
            ref="diffcultyList"
            class="challenges__header-diffculty-filter-list"
          >
            <li class="challenges__header-diffculty-filter-item">
              <U-tags
                v-for="(item, i) in 5"
                :id="i + 1 + '.difficulty'"
                :key="i * 124"
                :type="'checkbox'"
                :title="'Level ' + (i + 1)"
                @pick="levelFilter"
              ></U-tags>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="challenges__cards">
      <ChallengeCard
        v-for="card in $device.isMobile
          ? challenges.slice(0, lengthCardList)
          : challenges"
        :key="card.id"
        class="card"
        :card="card"
      ></ChallengeCard>
    </div>
    <U-button
      v-if="$device.isMobile && challenges.length > lengthCardList"
      :button-name="'Show More'"
      :button-class="'u-button-gray more-cards'"
      @clickOnButton="showMoreCards"
    ></U-button>
    <AppTeamDevelop></AppTeamDevelop>
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
  difficultyFilter: Array<any> = [];
  specialityFilter: Array<any> = [];
  lengthCardList = 4;
  showMoreCards() {
    this.lengthCardList = this.lengthCardList + 1;
  }

  toggleFilserList() {
    this.filterList = !this.filterList;
    console.log(this.filterList);
  }

  levelFilter($event) {
    if ($event.currentTarget.labels[0].classList.contains("checked")) {
      $event.currentTarget.labels[0].classList.remove("checked");
      this.difficultyFilter = this.difficultyFilter.filter(
        (el) => el[1] !== $event.currentTarget.id.split(".")[0]
      );
    } else {
      $event.currentTarget.labels[0].classList.add("checked");
      this.difficultyFilter.push([
        "difficulty",
        $event.currentTarget.id.split(".")[0],
      ]);
    }

    this.$emit("difficultyFilter", this.difficultyFilter);
  }

  specialty($event) {
    if ($event.currentTarget.labels[0].classList.contains("checked")) {
      $event.currentTarget.labels[0].classList.remove("checked");
      this.specialityFilter = this.difficultyFilter.filter(
        (el) => el[1] !== $event.currentTarget.id
      );
    } else {
      $event.currentTarget.labels[0].classList.add("checked");
      this.specialityFilter.push(["specialisations", $event.currentTarget.id]);
    }

    this.$emit("filterCards", this.specialityFilter);
  }
}
</script>
<style lang="scss">
@import "~/assets/css/variables.scss";
.challenges {
  max-width: 1344px;
  margin: 0 auto;
  margin-top: 48px;
  padding: 0 5px 0 16px;

  ul {
    padding: 0;
  }
  p {
    color: $main-text-color;
  }
  .challenges__header-speciality-filter {
    margin-bottom: 30px;
    .challenges__header-speciality-filter_list {
      display: flex;
      flex-wrap: wrap;
      max-width: 890px;
      max-height: 92px;
      overflow: hidden;
      &.opend-filter {
        overflow: auto;
        max-height: inherit;
      }
    }
  }
  .filter-list-button {
    background: transparent;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #8c97ac;
    padding: 0;
    &:hover {
      text-decoration-line: underline;
    }
  }
  .challenges__cards {
    .card {
      margin-bottom: 16px;
    }
  }
  .u-button-gray.more-cards {
    max-width: 343px;
  }
  .team-develop {
    background: transparent;
    margin-top: 0;
    margin-left: 0;
    img {
      width: 343px;
      height: 192.88px;
      margin-top: 48px;
    }
    button {
      margin-top: 24px;
      background: #4b4ac8;
      box-shadow: inset 0 -2px 4px 1px rgba(48, 92, 178, 0.15),
        inset 0 1px 4px rgba(255, 255, 255, 0.15);
      &:hover {
        background-color: $button-color-blue-hover;
      }
      &:focus {
        background-color: $button-color-blue-focus;
        border-width: 2px;
        border-color: #b5c1d8;
      }
      &:active {
        background-color: $button-color-blue-active;
      }
    }
    .team-develop__text-block {
      h2 {
        margin: 0;
        margin-top: 23px;
        font-weight: bold;
        font-size: 23px;
        line-height: 32px;
        div {
          display: inline;
        }
      }
      h3 {
        margin: 0;
        margin-top: 8px;
        font-size: 16px;
        line-height: 22px;
        width: auto;
      }
    }
  }
  .tags-item.checked {
    background: #59667e;
  }
}
@media (min-width: 768px) {
  .challenges {
    padding: 0;
    .challenges__header {
      h2 {
        font-weight: bold;
        font-size: 69px;
        line-height: 80px;
        margin-top: 72px;
      }
      .challenges__header-speciality-filters {
        display: flex;
        justify-content: space-between;
        p {
          font-weight: 500;
          font-size: 17px;
          line-height: 32px;
          margin: 0;
        }
      }
      .challenges__header-speciality-filter {
        margin-bottom: 16px;
        .challenges__header-speciality-filter_list {
          margin-top: 14px;
        }
      }
    }
    .challenges__cards {
      display: flex;
      flex-wrap: wrap;
      .card {
        margin-bottom: 24px;
      }
    }
    .team-develop {
      justify-content: space-between;
      img {
        width: 660px;
        height: 384px;
        margin-top: 40px;
      }
      .team-develop__text-block {
        margin-top: 36px;
        h2 {
          font-weight: bold;
          font-size: 56px;
          line-height: 64px;
          div {
            display: block;
          }
        }
        h3 {
          font-size: 17px;
          line-height: 24px;
          margin-top: 16px;
          height: 90px;
        }
      }
    }
  }
}
</style>
