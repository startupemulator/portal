<template>
  <div class="my-projects">
    <div
      v-show="!createChallenge && !challengePage"
      class="my-projects__content"
    >
      <div class="my-projects__header">
        <div class="my-projects__header-add-project">
          <U-title :text="'My projects'"></U-title>

          <button
            type="button"
            class="my-projects_btn"
            @click="toggleMobileMenu"
          >
            <img src="~/assets/img/+.svg" alt="" /> <span>Create Project</span>
            <div v-if="!$device.isMobile" class="my-projects__super-admin-menu">
              <div class="super-admin-menu__list">
                <div class="super-admin-menu__item">
                  <div
                    class="super-admin-menu__item-button"
                    @click="toggleChallengePage"
                  >
                    Create Startup
                  </div>
                </div>
                <div class="super-admin-menu__item">
                  <div
                    class="super-admin-menu__item-button"
                    @click="toggleCreateChallenge"
                  >
                    Create Challenge
                  </div>
                </div>
              </div>
            </div>
          </button>
          <div
            v-if="$device.isMobile"
            v-show="mobileAdminMenu"
            class="my-projects__super-admin-menu"
          >
            <div class="super-admin-menu__list">
              <div class="super-admin-menu__item">
                <div
                  class="super-admin-menu__item-button"
                  @click="toggleCreateChallenge"
                >
                  Create Startup
                </div>
              </div>
              <div class="super-admin-menu__item">
                <div class="super-admin-menu__item-button">
                  Create Challenge
                </div>
              </div>
            </div>
          </div>
        </div>
        <U-Tabs-Long :owned="true"></U-Tabs-Long>
      </div>
      <div class="start-ups_cards-content startup-block">
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
        </div>
      </div>
    </div>
    <CreateChallenge
      v-show="createChallenge"
      @clikOnButton="toggleCreateChallenge"
    ></CreateChallenge>
    <ChallengePage
      v-show="challengePage"
      @clickOnMenuButton="editChallenge"
    ></ChallengePage>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTabsLong from "../../atoms/uTabsLong.vue";
import CreateChallenge from "./createChallenge.vue";
import ChallengePage from "./challengePage.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Startup } from "~/models/Startup";
import DraftCard from "~/components/molecules/draftCard.vue";
import StartupCard from "~/components/molecules/startupCard.vue";
@Component({
  components: {
    UTitle,
    UTabsLong,
    DraftCard,
    StartupCard,
    CreateChallenge,
    ChallengePage,
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

  mobileAdminMenu = false;
  createChallenge = false;
  challengePage = false;
  toggleChallengePage() {
    this.challengePage = !this.challengePage;
  }

  toggleMobileMenu() {
    this.mobileAdminMenu = !this.mobileAdminMenu;
  }

  toggleCreateChallenge() {
    this.createChallenge = !this.createChallenge;
  }

  editChallenge() {
    this.createChallenge = !this.createChallenge;
    this.challengePage = !this.challengePage;
  }
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
  .my-projects__header-add-project {
    position: relative;
    .my-projects_btn ~ .my-projects__super-admin-menu {
      color: #fff;
    }
    .my-projects_btn {
      &:hover .my-projects__super-admin-menu {
        display: block;
      }
    }
    .my-projects__super-admin-menu {
      padding-top: 20px;
      margin-top: -4px;
      .super-admin-menu__list {
        background: #3b465a;
        box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
        border-radius: 12px;
        padding: 8px 0;
        margin: 0;
      }
      .super-admin-menu__item .super-admin-menu__item-button {
        font-weight: normal;
        font-size: 18px;
        line-height: 32px;
        padding: 8px 24px;
        background: transparent;
        border-radius: 0;
        width: 100%;
        text-align: left;
        box-sizing: border-box;
        cursor: pointer;

        &:hover {
          background: #4b4ac8;
        }
      }
    }
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
    .my-projects__header-add-project {
      .my-projects__super-admin-menu {
        position: absolute;
        bottom: -85px;
        padding-top: 10px;
        right: -90px;
        width: 320px;
      }
    }
  }
}
</style>
