<template>
  <div class="my-projects">
    <div class="my-projects__header">
      <div class="my-projects__header-add-project">
        <U-title :text="'My projects'"></U-title>
        <button type="button" class="my-projects_btn">
          <img src="~/assets/img/+.svg" alt="" /> <span>Create Startup</span>
        </button>
      </div>
      <U-Tabs-Long :owned="true"></U-Tabs-Long>
    </div>
    <!-- <div class="start-ups_cards-content startup-block">
      <div data-v-4c0228a8="" class="transition__startup-card">
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
                Flower Watering
              </h2>
              <h3 data-v-1ba1c684="" class="startup-card__started-text">
                Flower Watering Reminder Application The Goal is to solve the
                problem...
              </h3>
              <div data-v-1ba1c684="" class="startup-card__started-technologys">
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
              <div data-v-1ba1c684="" class="startup-card__started-start-time">
                <div data-v-1ba1c684="" class="started-start-time__start">
                  <h3 data-v-1ba1c684="">Start</h3>
                  <p data-v-1ba1c684="">Jul 14, 2020</p>
                </div>
                <div data-v-1ba1c684="" class="started-start-time__duration">
                  <h3 data-v-1ba1c684="">Duration</h3>
                  <p data-v-1ba1c684="">100 days</p>
                </div>
              </div>
              <div
                data-v-1ba1c684=""
                class="startup-block__buttons myproject-details"
              >
                <button
                  data-v-74dcdff6=""
                  data-v-1ba1c684=""
                  type="button"
                  class="u-button u-button-gray"
                >
                  Details
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
                  In progress
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
              <div data-v-1ba1c684="" class="startup-card__started-technologys">
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
              <div data-v-1ba1c684="" class="startup-card__started-start-time">
                <div data-v-1ba1c684="" class="started-start-time__start">
                  <h3 data-v-1ba1c684="">Start</h3>
                  <p data-v-1ba1c684="">Jul 14, 2020</p>
                </div>
                <div data-v-1ba1c684="" class="started-start-time__duration">
                  <h3 data-v-1ba1c684="">Duration</h3>
                  <p data-v-1ba1c684="">100 days</p>
                </div>
              </div>
              <div
                data-v-1ba1c684=""
                class="startup-block__buttons myproject-details"
              >
                <button
                  data-v-74dcdff6=""
                  data-v-1ba1c684=""
                  type="button"
                  class="u-button u-button-gray"
                >
                  Details
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
              <div data-v-1ba1c684="" class="startup-card__started-technologys">
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
              <div data-v-1ba1c684="" class="startup-card__started-start-time">
                <div data-v-1ba1c684="" class="started-start-time__start">
                  <h3 data-v-1ba1c684="">Start</h3>
                  <p data-v-1ba1c684="">Jul 14, 2020</p>
                </div>
                <div data-v-1ba1c684="" class="started-start-time__duration">
                  <h3 data-v-1ba1c684="">Duration</h3>
                  <p data-v-1ba1c684="">100 days</p>
                </div>
              </div>
              <div
                data-v-1ba1c684=""
                class="startup-block__buttons myproject-details"
              >
                <button
                  data-v-74dcdff6=""
                  data-v-1ba1c684=""
                  type="button"
                  class="u-button u-button-gray"
                >
                  Details
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
                Flower Watering
              </h2>
              <h3 data-v-1ba1c684="" class="startup-card__started-text">
                Flower Watering Reminder Application The Goal is to solve the
                problem...
              </h3>
              <div data-v-1ba1c684="" class="startup-card__started-technologys">
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
              <div data-v-1ba1c684="" class="startup-card__started-start-time">
                <div data-v-1ba1c684="" class="started-start-time__start">
                  <h3 data-v-1ba1c684="">Start</h3>
                  <p data-v-1ba1c684="">Jul 14, 2020</p>
                </div>
                <div data-v-1ba1c684="" class="started-start-time__duration">
                  <h3 data-v-1ba1c684="">Duration</h3>
                  <p data-v-1ba1c684="">100 days</p>
                </div>
              </div>
              <div
                data-v-1ba1c684=""
                class="startup-block__buttons myproject-details"
              >
                <button
                  data-v-74dcdff6=""
                  data-v-1ba1c684=""
                  type="button"
                  class="u-button u-button-gray"
                >
                  Details
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
              <div data-v-1ba1c684="" class="startup-card__started-technologys">
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
              <div data-v-1ba1c684="" class="startup-card__started-start-time">
                <div data-v-1ba1c684="" class="started-start-time__start">
                  <h3 data-v-1ba1c684="">Start</h3>
                  <p data-v-1ba1c684="">Jul 14, 2020</p>
                </div>
                <div data-v-1ba1c684="" class="started-start-time__duration">
                  <h3 data-v-1ba1c684="">Duration</h3>
                  <p data-v-1ba1c684="">100 days</p>
                </div>
              </div>
              <div
                data-v-1ba1c684=""
                class="startup-block__buttons myproject-details"
              >
                <button
                  data-v-74dcdff6=""
                  data-v-1ba1c684=""
                  type="button"
                  class="u-button u-button-gray"
                >
                  Details
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
                  In progress
                </div>
                <div
                  data-v-1ba1c684=""
                  class="startup-card__started-title feedback owner"
                >
                  Owner
                </div>
                <div class="startup-card__started--messege">
                  <span>1</span>
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
              <div data-v-1ba1c684="" class="startup-card__started-technologys">
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
              <div data-v-1ba1c684="" class="startup-card__started-start-time">
                <div data-v-1ba1c684="" class="started-start-time__start">
                  <h3 data-v-1ba1c684="">Start</h3>
                  <p data-v-1ba1c684="">Jul 14, 2020</p>
                </div>
                <div data-v-1ba1c684="" class="started-start-time__duration">
                  <h3 data-v-1ba1c684="">Duration</h3>
                  <p data-v-1ba1c684="">100 days</p>
                </div>
              </div>
              <div
                data-v-1ba1c684=""
                class="startup-block__buttons myproject-details"
              >
                <button
                  data-v-74dcdff6=""
                  data-v-1ba1c684=""
                  type="button"
                  class="u-button u-button-gray"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div data-v-4c0228a8="" class="startup-block__startup-card">
          <div
            data-v-1ba1c684=""
            data-v-4c0228a8=""
            class="startup-card startup-card--draft"
          >
            <div data-v-1ba1c684="" class="startup-card__started">
              <div class="startup-card__started-state draft">
                <div data-v-1ba1c684="" class="startup-card__started-title">
                  Draft
                </div>
              </div>
            </div>
            <div data-v-1ba1c684="" class="startup-card-content">
              <h2 data-v-1ba1c684="" class="startup-card__started-name">
                Flower Watering
              </h2>
              <h3 data-v-1ba1c684="" class="startup-card__started-text">
                Continue creating your own startup to gather a team you need to
                develop your idea.
              </h3>

              <div data-v-1ba1c684="" class="">
                <button
                  data-v-74dcdff6=""
                  data-v-1ba1c684=""
                  type="button"
                  class="u-button u-button-blue"
                >
                  Continue Creating
                </button>
                <button
                  data-v-74dcdff6=""
                  data-v-1ba1c684=""
                  type="button"
                  class="u-button u-button-gray"
                >
                  Delete Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="start-ups_cards-content startup-block">
      <div class="transition__startup-card">
        <Draft-card
          v-for="card in draft"
          :key="card.id"
          :card="card"
        ></Draft-card>
        <Startup-card
          v-for="card in startups"
          :key="card.id"
          :card="card"
          :button_apply="false"
          :button_details="true"
        ></Startup-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTitle from "~/components/atoms/uTitle.vue";
import { Startup } from "~/models/Startup";
import UTabsLong from "~/components/atoms/utabsLong.vue";
import DraftCard from "~/components/molecules/draftCard.vue";
import StartupCard from "~/components/molecules/startupCard.vue";
@Component({
  components: {
    UTitle,
    UTabsLong,
    DraftCard,
    StartupCard,
  },
})
export default class extends Vue {
  @Prop() startups: Array<Startup>;
  @Prop({
    default: () => [
      {
        id: "0",
        title: "Startup #1",
        description:
          "Continue creating your own startup to gather a team you need to develop your idea. Continue creating your own startup to gather a team you need to develop your idea.",
      },
    ],
  })
  draft: Array<"Draft">;
}
</script>
<style lang="scss">
.my-projects {
  .startup-block {
    min-height: 100px;
  }
  .startup-block__buttons.myproject-details {
    button {
      width: 295px;
      height: 48px;
    }
  }
  .owner {
    margin-left: 8px;
  }
}

@media (min-width: 768px) {
  .my-projects {
    .startup-block {
      max-width: 1450px;
    }
    .startup-block__buttons.myproject-details {
      button {
        width: 254px;
        height: 56px;
      }
    }
  }
}
</style>
