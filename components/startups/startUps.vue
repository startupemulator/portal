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
              <technology-item
                v-for="item in technologies"
                :key="Math.random() + item.id"
                :title="item.name"
              ></technology-item>
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
          <!-- ------------Вставить карточки циклом -->
          <div data-v-4c0228a8="" class="startup-block__startup-card">
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
                  class="startup-card__started-technologies"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologies-items"
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
                  <Ubutton
                    button-name="Details"
                    type="button"
                    class="u-button u-button-gray"
                  >
                    Details
                  </Ubutton>
                  <Ubutton
                    button-name="Apply"
                    type="button"
                    class="u-button u-button-blue"
                  >
                  </Ubutton>
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
                  class="startup-card__started-technologies"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologies-items"
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
                  class="startup-card__started-technologies"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologies-items"
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
                  class="startup-card__started-technologies"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologies-items"
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
                  class="startup-card__started-technologies"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologies-items"
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
                  class="startup-card__started-technologies"
                >
                  <ul
                    data-v-1ba1c684=""
                    class="startup-card__started-technologies-items"
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
                  <Ubutton
                    button-name="Details"
                    type="button"
                    class="u-button u-button-gray"
                  >
                    Details
                  </Ubutton>
                  <Ubutton
                    button-name="Apply"
                    type="button"
                    class="u-button u-button-blue"
                  >
                  </Ubutton>
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
import UTitle from "../atoms/uTitle";
import TechnologyItem from "../moleculas/technologyItem";
import AppTeamDevelop from "../homePage/appTeamDevelop.vue";
import UTabs from "~/components/atoms/uTabs";
import Ubutton from "~/components/atoms/uButton";

export default {
  components: {
    UTitle,
    UTabs,
    TechnologyItem,
    AppTeamDevelop,
    Ubutton,
  },
  props: {
    cards: {
      type: [String, Array],
      default() {
        return ["cards"];
      },
    },
  },
  data() {
    return {
      filterList: false,
      technologies: [
        { id: 1, checked: false, name: "Javascript" },
        { id: 2, checked: false, name: "Java" },
        { id: 3, checked: false, name: "Python" },
        { id: 4, checked: false, name: "HTML5" },
        { id: 5, checked: false, name: "CSS3" },
        { id: 6, checked: false, name: "Javascript" },
        { id: 7, checked: false, name: "Java" },
        { id: 8, checked: false, name: "Javascript" },
        { id: 9, checked: false, name: "Javascript" },
        { id: 10, checked: false, name: "Javascript" },
      ],
    };
  },
  methods: {
    toggleFilserList() {
      this.filterList = !this.filterList;
    },
    pickTechnologi(item, i) {
      this.technologies.forEach((el) => {
        if (i === el.id) {
          el.checked = !el.checked;
        }
      });
    },
  },
};
</script>
