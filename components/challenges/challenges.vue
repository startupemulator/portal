<template>
  <div class="start-ups challenges">
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
              v-for="technologi in technologies"
              :key="Math.random() + technologi.id"
              class="start-ups__header-filter_item"
            >
              <Technologi-item
                :technologi-id="technologi.id"
                :technologi-name="technologi.name"
                :checked-class="technologi.checked ? 'checked' : ''"
                @pickTechnologi="
                  pickTechnologi($event, technologi.id, technologi.name)
                "
              ></Technologi-item>
            </li>
          </ul>
        </div>
      </div>
      <div class="start-ups_cards-content startup-block">
        <div data-v-4c0228a8="" class="transition__startup-card">
          <!-- ------------Вставить карточки цыклом -->
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
import TechnologiItem from "../theme/technologiItem";
import AppTeamDevelop from "../homePage/appTeamDevelop.vue";

export default {
  components: {
    UTitle,

    TechnologiItem,
    AppTeamDevelop,
  },
  data() {
    return {
      filterList: false,
      technologies: [
        { id: 1, checked: false, name: "Full Stack Developer" },
        { id: 2, checked: false, name: "Back-end Developer" },
        { id: 3, checked: false, name: "Front-end Developer" },
        { id: 4, checked: false, name: "UI/UX Designer" },
      ],
    };
  },
  methods: {
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
