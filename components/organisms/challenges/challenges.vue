<template>
  <div class="challenges">
    <div class="challenges__header">
      <U-Title :text="'Challenges'"></U-Title>
      <div class="challenges__header-speciality-filters">
        <div class="challenges__header-speciality-filter">
          <p>Filter by Specialty</p>
          <ul
            class="challenges__header-speciality-filter_list"
            :class="filterList ? 'opend-filter' : ''"
          >
            <li
              v-for="specialisation in specialisations"
              :key="specialisation.id"
              class="challenges__header-speciality-filter_item"
            >
              <U-Tags
                :id="specialisation.id"
                :title="specialisation.title"
                :name="specialisation.title"
                :class="specialisation.isChecked ? 'checked' : ''"
                :type="'checkbox'"
                @pick="specialty(specialisation)"
              ></U-Tags>
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

          <ul class="challenges__header-diffculty-filter-list">
            <li class="challenges__header-diffculty-filter-item">
              <U-Tags
                v-for="(item, i) in difficultyLevel"
                :id="i + 1 + '.difficulty'"
                :key="i * 124"
                :type="'checkbox'"
                :class="item.isChecked ? 'checked' : ''"
                :title="'Level ' + (i + 1)"
                @pick="levelFilter(item)"
              ></U-Tags>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="challenges__cards">
      <Challenge-Card
        v-for="card in $device.isMobile
          ? challenges.slice(0, lengthCardList)
          : challenges"
        :key="card.id"
        class="card"
        :card="card"
        :user-id="userId"
        :is-expert="isExpert"
        :user-challenges="userChallenges"
        :feed-back-for-challenges="feedBackForChallenges"
      ></Challenge-Card>
    </div>
    <div class="button-more-cards">
      <U-Button
        v-if="$device.isMobile && challenges.length > lengthCardList"
        :button-name="'Show More'"
        :button-class="'u-button-gray more-cards'"
        @clickOnButton="showMoreCards"
      ></U-Button>
    </div>
    <Empty-State v-if="emptyState" @clickOnButton="cleanFilter"></Empty-State>
    <App-Team-Develop v-if="!autorizated"></App-Team-Develop>
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
import { AskFeedbacks } from "~/models/AskFeedbacks";
import { userChallenges } from "~/models/UserChallenges";
import UButton from "~/components/atoms/uButton.vue";
import EmptyState from "~/components/molecules/emptyState.vue";

@Component({
  components: {
    UTitle,
    UTags,
    AppTeamDevelop,
    ChallengeCard,
    UButton,
    EmptyState,
  },
})
export default class Challenges extends Vue {
  @Prop()
  challenges: Array<Challenge>;

  @Prop() userChallenges: Array<userChallenges>;

  @Prop() feedBackForChallenges: Array<AskFeedbacks>;
  @Prop() isExpert: Boolean;
  @Prop()
  specialisations: Array<Specialisation>;

  @Prop() emptyState: Boolean;
  @Prop() autorizated: Boolean;
  @Prop() userId: string;

  difficultyLevel: Array<{ id: number; isChecked: boolean }> = [
    { id: 1, isChecked: false },
    { id: 2, isChecked: false },
    { id: 3, isChecked: false },
    { id: 4, isChecked: false },
    { id: 5, isChecked: false },
  ];

  private filterList: boolean = false;
  difficultyFilter: Array<any> = [];
  specialityFilter: Array<any> = [];
  lengthCardList = 4;

  showMoreCards() {
    this.lengthCardList = this.lengthCardList + 1;
  }

  toggleFilserList() {
    this.filterList = !this.filterList;
  }

  cleanFilter() {
    this.difficultyLevel.forEach((el) => (el.isChecked = false));
    this.specialisations.forEach((el) => (el.isChecked = false));

    this.$emit("cleanFilter", []);
  }

  levelFilter(difficultyLevel) {
    if (!difficultyLevel.isChecked) {
      difficultyLevel.isChecked = true;
      this.difficultyFilter.push({ id: difficultyLevel.id });
    } else {
      difficultyLevel.isChecked = false;
      this.difficultyFilter.forEach((level, i) => {
        if (level.id === difficultyLevel.id) {
          this.difficultyFilter.splice(i, 1);
        }
      });
    }
    this.$emit("difficultyFilter", this.difficultyFilter);
  }

  specialty(specialisation) {
    if (!specialisation.isChecked) {
      specialisation.isChecked = true;
      this.specialityFilter.push({ id: specialisation.id });
    } else {
      specialisation.isChecked = false;
      this.specialityFilter.forEach((speciality, i) => {
        if (speciality.id === specialisation.id) {
          this.specialityFilter.splice(i, 1);
        }
      });
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
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }

  .button-more-cards {
    display: flex;
    justify-content: center;
  }

  .u-button-gray.more-cards {
    max-width: 343px;
    margin-top: 16px;
  }

  .team-develop {
    background: transparent;
    margin-top: 0;
    // margin-left: 0;
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
      gap: 24px;
      // .card {
      // margin-bottom: 24px;
      // }
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
          width: 100%;
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
@media (min-width: 1365px) {
  .challenges .challenges__cards {
    justify-content: flex-start;
  }
}
</style>
