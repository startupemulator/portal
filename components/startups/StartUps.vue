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
            <li>
              <technologi-item
                v-for="item in technologies"
                :key="Math.random() + item.id"
                :technologi-name="item.name"
              ></technologi-item>
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
          <!-- ------------Вставить карточки цыклом -->
          <div data-v-4c0228a8="" class="startup-block__startup-card">
            <div data-v-1ba1c684="" data-v-4c0228a8="" class="startup-card">
              <div data-v-1ba1c684="" class="startup-card__started">
                <div class="startup-card__started-state">
                  <div data-v-1ba1c684="" class="startup-card__started-title">
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
                    Finished
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
                  <div data-v-1ba1c684="" class="startup-card__started-title">
                    Finished
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
                  <div data-v-1ba1c684="" class="startup-card__started-title">
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
          </div>

          <!-- ------------Вставить карточки цыклом  END   -->
        </div>
      </div>

      <app-team-develop></app-team-develop>
    </div>
  </div>
</template>
<script>
import UTitle from "../theme/UTitle";
import TechnologiItem from "../theme/TechnologiItem";
import AppTeamDevelop from "../homePage/appTeamDevelop.vue";
import UTabs from "~/components/theme/UTabs";

export default {
  components: {
    UTitle,
    UTabs,
    TechnologiItem,
    AppTeamDevelop,
  },
  data() {
    return {
      filterList: false,
      technologies: [
        { id: 1, name: "Javascript" },
        { id: 2, name: "Java" },
        { id: 3, name: "Python" },
        { id: 4, name: "HTML5" },
        { id: 5, name: "CSS3" },
        { id: 6, name: "Javascript" },
        { id: 7, name: "Java" },
        { id: 8, name: "Javascript" },
        { id: 9, name: "Javascript" },
        { id: 10, name: "Javascript" },
      ],
    };
  },
  methods: {
    toggleFilserList() {
      this.filterList = !this.filterList;
    },
  },
};
</script>
