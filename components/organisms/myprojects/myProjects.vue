<template>
  <div class="my-projects">
    <div class="my-projects__header">
      <div class="my-projects__header-add-project">
        <U-Title :text="'My projects'"></U-Title>
        <nuxt-link
          v-if="!isSuperAdmin"
          to="/startup/create"
          class="user-menu my-projects_btn"
        >
          <img src="~/assets/img/+.svg" alt="" /> <span>Create Startup</span>
        </nuxt-link>
        <div v-if="isSuperAdmin" class="super-admin-menu">
          <div class="super-admin-menu__content">
            <div class="super-admin-menu__title">
              <img src="~/assets/img/+.svg" alt="" />
              <span>Create Project</span>
            </div>
            <ul class="super-admin-menu-links">
              <li class="super-admin-menu-link">
                <nuxt-link to="/startup/create" class="super-admin-menu_btn">
                  <span>Create Startup</span>
                </nuxt-link>
              </li>
              <li class="super-admin-menu-link">
                <nuxt-link to="/challenge/create" class="super-admin-menu_btn">
                  <span>Create Challenge</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <U-Tabs-Long
        :owned="true"
        :in-progress="inProgress"
        @filterCards="filterCards"
      ></U-Tabs-Long>
    </div>
    <div class="start-ups_cards-content startup-block">
      <div class="transition__startup-card">
        <Draft-Card
          v-for="card in draft"
          :key="card.id"
          :card="card"
          @clickOnButton="deleteDraft"
        ></Draft-Card>
        <Startup-Card
          v-for="card in startup"
          :key="card.id"
          :card="card"
          :user-id="userId"
        ></Startup-Card>
      </div>
    </div>

    <Popup-Delete-Startup
      v-show="popupDeleteStartup"
      :move-away-startup="moveAwayStartup"
      :move-away-startup-name="moveAwayStartupName"
      @clickOnButton="togglePopupDeleteStartup"
      @closePopupLinkEmail="togglePopupDeleteStartup"
      @deleteStartup="deleteStartup"
    ></Popup-Delete-Startup>
    <div v-if="startups.length === 0" class="emty-state-my-startups">
      <p class="emty-state-my-startups__title">There is no any startups yet</p>
      <span>Create the your first startup.</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UTabsLong from "../../atoms/uTabsLong.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import { Startup } from "~/models/Startup";
import DraftCard from "~/components/molecules/draftCard.vue";
import StartupCard from "~/components/molecules/startupCard.vue";
import PopupDeleteStartup from "~/components/molecules/PopupDeleteOrStartStartup.vue";

@Component({
  components: {
    UTitle,
    UTabsLong,
    DraftCard,
    StartupCard,
    PopupDeleteStartup,
  },
})
export default class extends Vue {
  @Prop() startups!: Array<Startup>;
  @Prop() userId: Number;
  @Prop() isSuperAdmin: boolean;
  draft: Array<Startup> = [];
  startup: Array<Startup> = [];
  inProgress: Number = 0;
  popupDeleteStartup = false;
  moveAwayStartup: string = "";
  moveAwayStartupName: string = "";

  deleteStartup(startupName, startupId) {
    this.$emit("deleteDraft", startupId, startupName);
    this.popupDeleteStartup = !this.popupDeleteStartup;
  }

  deleteDraft(id, title) {
    this.popupDeleteStartup = !this.popupDeleteStartup;
    this.moveAwayStartup = id;
    this.moveAwayStartupName = title;
  }

  filterCards($event) {
    switch ($event) {
      case 2:
        this.startup = this.startups.filter(
          (el) => el.state !== "draft" && +el.owner.id === +this.userId
        );
        break;
      case 3:
        this.startup = this.startups.filter((el) => el.state === "review");
        break;
      case 4:
        this.startup = this.startups.filter((el) => el.state === "not_started");
        break;
      case 5:
        this.startup = this.startups.filter((el) => el.state === "in_progress");
        break;
      case 6:
        this.startup = this.startups.filter((el) => el.state === "finished");
        break;
      default:
        break;
    }
  }

  togglePopupDeleteStartup() {
    this.popupDeleteStartup = !this.popupDeleteStartup;
  }

  mounted() {
    this.draft = this.startups.filter((el) => el.state === "draft");
    this.startup = this.startups.filter(
      (el) => el.state !== "draft" && +el.owner.id === +this.userId
    );
    this.inProgress = this.startups.filter(
      (el) => el.state === "in_progress"
    ).length;
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

@media (min-width: 1425px) {
  .my-projects {
    .startup-block {
      max-width: 1450px;
      margin-left: -25px;
    }
  }
}
</style>
