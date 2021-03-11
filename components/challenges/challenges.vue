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
              v-for="(specialisation, i) in specialisations"
              :key="specialisation.id"
              class="start-ups__header-filter_item"
            >
              <U-tags
                :id="specialisation.id"
                :title="specialisation.title"
                :name="specialisation.title"
                :type="'checkbox'"
                :checked-class="specialisation.checked ? 'checked' : ''"
                @pick="pickTechnologi(i)"
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
          ></challenge-card>
          <!-- ------------Вставить карточки циклом -->
          <!-- <div data-v-4c0228a8="" class="startup-block__startup-card">
            <div data-v-1ba1c684="" data-v-4c0228a8="" class="startup-card">
              <div data-v-1ba1c684="" class="startup-card__started">
                <div class="startup-card__started-state">
                  <div
                    data-v-1ba1c684=""
                    class="startup-card__started-title finished"
                  >
                    Finished
                  </div>
                </div>
              </div>
              <div data-v-1ba1c684="" class="startup-card-content">
                <h2 data-v-1ba1c684="" class="startup-card__started-name">
                  Flower Watering
                </h2>
                <h3 data-v-1ba1c684="" class="startup-card__started-text">
                  Flower Watering Reminder Application The Goal is to solve the
                  problem...
                </h3>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-technologys"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologys-items"
                  >
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      docker
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      ux
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      db
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      javascript
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      html
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      css
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      node.js
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      cloud
                    </li>
                  </ul>
                </div>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-start-time"
                >
                  <div data-v-1ba1c684="" class="started-start-time__start">
                    <h3 data-v-1ba1c684="">Start</h3>
                    <p data-v-1ba1c684="">Jul 14, 2020</p>
                  </div>
                  <div data-v-1ba1c684="" class="started-start-time__duration">
                    <h3 data-v-1ba1c684="">Duration</h3>
                    <p data-v-1ba1c684="">100 days</p>
                  </div>
                </div>
                <div data-v-1ba1c684="" class="startup-block__buttons">
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-gray"
                  >
                    Details
                  </button>
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-blue"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div data-v-4c0228a8="" class="startup-block__startup-card">
            <div data-v-1ba1c684="" data-v-4c0228a8="" class="startup-card">
              <div data-v-1ba1c684="" class="startup-card__started">
                <div class="startup-card__started-state">
                  <div data-v-1ba1c684="" class="startup-card__started-title">
                    Not started
                  </div>
                </div>
              </div>
              <div data-v-1ba1c684="" class="startup-card-content">
                <h2 data-v-1ba1c684="" class="startup-card__started-name">
                  EDU4U - Learning Management Portal
                </h2>
                <h3 data-v-1ba1c684="" class="startup-card__started-text">
                  The goal is to implement Learning Management Portal - a portal
                  for ma...
                </h3>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-technologys"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologys-items"
                  >
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      ui
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      mongodb
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      javascript
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      react
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      ux
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      node.js
                    </li>
                  </ul>
                </div>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-start-time"
                >
                  <div data-v-1ba1c684="" class="started-start-time__start">
                    <h3 data-v-1ba1c684="">Start</h3>
                    <p data-v-1ba1c684="">Jul 07, 2020</p>
                  </div>
                  <div data-v-1ba1c684="" class="started-start-time__duration">
                    <h3 data-v-1ba1c684="">Duration</h3>
                    <p data-v-1ba1c684="">100 days</p>
                  </div>
                </div>
                <div data-v-1ba1c684="" class="startup-block__buttons">
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-gray"
                  >
                    Details
                  </button>
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-blue"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div data-v-4c0228a8="" class="startup-block__startup-card">
            <div data-v-1ba1c684="" data-v-4c0228a8="" class="startup-card">
              <div data-v-1ba1c684="" class="startup-card__started">
                <div class="startup-card__started-state">
                  <div
                    data-v-1ba1c684=""
                    class="startup-card__started-title started"
                  >
                    In_progress
                  </div>
                </div>
              </div>
              <div data-v-1ba1c684="" class="startup-card-content">
                <h2 data-v-1ba1c684="" class="startup-card__started-name">
                  Math.random Community portal
                </h2>
                <h3 data-v-1ba1c684="" class="startup-card__started-text">
                  The goal is to implement portal for Math.random() engineering
                  communit...
                </h3>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-technologys"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologys-items"
                  >
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      nocode
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      next.js
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      typescript
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      react
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      node.js
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      cloud
                    </li>
                  </ul>
                </div>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-start-time"
                >
                  <div data-v-1ba1c684="" class="started-start-time__start">
                    <h3 data-v-1ba1c684="">Start</h3>
                    <p data-v-1ba1c684="">Nov 09, 2020</p>
                  </div>
                  <div data-v-1ba1c684="" class="started-start-time__duration">
                    <h3 data-v-1ba1c684="">Duration</h3>
                    <p data-v-1ba1c684="">200 days</p>
                  </div>
                </div>
                <div data-v-1ba1c684="" class="startup-block__buttons">
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-gray"
                  >
                    Details
                  </button>
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-blue"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div data-v-4c0228a8="" class="startup-block__startup-card">
            <div data-v-1ba1c684="" data-v-4c0228a8="" class="startup-card">
              <div data-v-1ba1c684="" class="startup-card__started">
                <div class="startup-card__started-state">
                  <div
                    data-v-1ba1c684=""
                    class="startup-card__started-title feedback"
                  >
                    Waiting for feedback
                  </div>
                  <div class="startup-card__started--messege">
                    <span>1</span>
                  </div>
                </div>
              </div>
              <div data-v-1ba1c684="" class="startup-card-content">
                <h2 data-v-1ba1c684="" class="startup-card__started-name">
                  EDU4U - Learning Management Portal
                </h2>
                <h3 data-v-1ba1c684="" class="startup-card__started-text">
                  The goal is to implement Learning Management Portal - a portal
                  for ma...
                </h3>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-technologys"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologys-items"
                  >
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      ux
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      javascript
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      node.js
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      mongodb
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      ui
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      react
                    </li>
                  </ul>
                </div>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-start-time"
                >
                  <div data-v-1ba1c684="" class="started-start-time__start">
                    <h3 data-v-1ba1c684="">Start</h3>
                    <p data-v-1ba1c684="">Jul 07, 2020</p>
                  </div>
                  <div data-v-1ba1c684="" class="started-start-time__duration">
                    <h3 data-v-1ba1c684="">Duration</h3>
                    <p data-v-1ba1c684="">100 days</p>
                  </div>
                </div>
                <div data-v-1ba1c684="" class="startup-block__buttons">
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-gray"
                  >
                    Details
                  </button>
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-blue"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div data-v-4c0228a8="" class="startup-block__startup-card">
            <div data-v-1ba1c684="" data-v-4c0228a8="" class="startup-card">
              <div data-v-1ba1c684="" class="startup-card__started">
                <div class="startup-card__started-state">
                  <div
                    data-v-1ba1c684=""
                    class="startup-card__started-title started"
                  >
                    In_progress
                  </div>
                </div>
              </div>
              <div data-v-1ba1c684="" class="startup-card-content">
                <h2 data-v-1ba1c684="" class="startup-card__started-name">
                  Math.random Community portal
                </h2>
                <h3 data-v-1ba1c684="" class="startup-card__started-text">
                  The goal is to implement portal for Math.random() engineering
                  communit...
                </h3>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-technologys"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologys-items"
                  >
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      nocode
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      next.js
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      node.js
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      cloud
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      react
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      typescript
                    </li>
                  </ul>
                </div>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-start-time"
                >
                  <div data-v-1ba1c684="" class="started-start-time__start">
                    <h3 data-v-1ba1c684="">Start</h3>
                    <p data-v-1ba1c684="">Nov 09, 2020</p>
                  </div>
                  <div data-v-1ba1c684="" class="started-start-time__duration">
                    <h3 data-v-1ba1c684="">Duration</h3>
                    <p data-v-1ba1c684="">200 days</p>
                  </div>
                </div>
                <div data-v-1ba1c684="" class="startup-block__buttons">
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-gray"
                  >
                    Details
                  </button>
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-blue"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div data-v-4c0228a8="" class="startup-block__startup-card">
            <div data-v-1ba1c684="" data-v-4c0228a8="" class="startup-card">
              <div data-v-1ba1c684="" class="startup-card__started">
                <div class="startup-card__started-state">
                  <div
                    data-v-1ba1c684=""
                    class="startup-card__started-title feedback"
                  >
                    Waiting for feedback
                  </div>
                  <div class="startup-card__started--messege">
                    <span>99</span>
                  </div>
                </div>
              </div>
              <div data-v-1ba1c684="" class="startup-card-content">
                <h2 data-v-1ba1c684="" class="startup-card__started-name">
                  Flower Watering
                </h2>
                <h3 data-v-1ba1c684="" class="startup-card__started-text">
                  Flower Watering Reminder Application The Goal is to solve the
                  problem...
                </h3>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-technologys"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologys-items"
                  >
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      node.js
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      ux
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      css
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      db
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      docker
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      javascript
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      html
                    </li>
                    <li
                      data-v-1ba1c684=""
                      class="startup-card__started-technology"
                    >
                      cloud
                    </li>
                  </ul>
                </div>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-start-time"
                >
                  <div data-v-1ba1c684="" class="started-start-time__start">
                    <h3 data-v-1ba1c684="">Start</h3>
                    <p data-v-1ba1c684="">Jul 14, 2020</p>
                  </div>
                  <div data-v-1ba1c684="" class="started-start-time__duration">
                    <h3 data-v-1ba1c684="">Duration</h3>
                    <p data-v-1ba1c684="">100 days</p>
                  </div>
                </div>
                <div data-v-1ba1c684="" class="startup-block__buttons">
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-gray"
                  >
                    Details
                  </button>
                  <button
                    data-v-74dcdff6=""
                    data-v-1ba1c684=""
                    type="button"
                    class="u-button u-button-blue"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div> -->
          <!-- ------------Вставить карточки циклом  END   -->
        </div>
      </div>
      <app-team-develop></app-team-develop>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTitle from "../theme/uTitle.vue";
import AppTeamDevelop from "../homePage/appTeamDevelop.vue";
import UTags from "../theme/uTags.vue";
import { Challenge } from "../../models/Challenge";
import { Technology } from "../../models/Technology";
import ChallengeCard from "../moleculas/challengeCard.vue";

@Component({
  components: {
    UTitle,
    UTags,
    AppTeamDevelop,
    ChallengeCard,
  },
})
export default class extends Vue {
  @Prop()
  challenges: Array<Challenge>;

  @Prop({
    default() {
      return [
        { id: 1, checked: false, title: "Full Stack Developer" },
        { id: 2, checked: false, title: "Back-end Developer" },
        { id: 3, checked: false, title: "Front-end Developer" },
        { id: 4, checked: false, title: "UI/UX Designer" },
      ];
    },
  })
  specialisations: Array<Technology>;

  private filterList: boolean = false;
  toggleFilserList() {
    this.filterList = !this.filterList;
  }

  pickTechnologi(i) {
    this.specialisations.forEach((el) => {
      if (i + 1 === el.id) {
        el.checked = !el.checked;

        console.log(this.challenges[i].specialisations);
      }
    });
  }
}
</script>
