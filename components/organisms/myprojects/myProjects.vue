<template>
  <div class="my-projects">
    <div class="my-projects__header">
      <div class="my-projects__header-add-project">
        <U-title :text="'My projects'"></U-title>
        <nuxt-link to="/startup/create" class="my-projects_btn">
          <img src="~/assets/img/+.svg" alt="" /> <span>Create Startup</span>
        </nuxt-link>
      </div>
      <U-Tabs-Long
        :owned="true"
        :in-progress="inProgress"
        @filterCards="filterCards"
      ></U-Tabs-Long>
    </div>
    <div class="start-ups_cards-content startup-block">
      <div class="transition__startup-card">
        <Draft-card
          v-for="card in draft"
          :key="card.id"
          :card="card"
          @clickOnButton="deleteDraft"
        ></Draft-card>

        <Startup-card
          v-for="card in startup"
          :key="card.id"
          :card="card"
          :user-id="userId"
          :button_apply="false"
          :button_details="true"
        ></Startup-card>
      </div>
    </div>

    <PopupDeleteStartup
      v-show="popupDeleteStartup"
      :move-away-startup="moveAwayStartup"
      :move-away-startup-name="moveAwayStartupName"
      @clickOnButton="togglePopupDeleteStartup"
      @closePopupLinkEmail="togglePopupDeleteStartup"
      @deleteStartup="deleteStartup"
    ></PopupDeleteStartup>
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
  draft: Array<Startup> = [];
  startup: Array<Startup> = [];
  inProgress: Number = 0;
  popupDeleteStartup = false;
  moveAwayStartup: string = "";
  moveAwayStartupName: string = "";
  deleteStartup(startupName, startupId) {
    this.$emit("deleteDraft", startupId, startupName);
  }

  deleteDraft(id, title) {
    console.log(id, title);
    this.popupDeleteStartup = !this.popupDeleteStartup;
    this.moveAwayStartup = id;
    this.moveAwayStartupName = title;
  }

  filterCards($event) {
    switch ($event) {
      case 2:
        this.startup = this.startups.filter((el) => el.state !== "draft");
        break;
      case 3:
        this.startup = this.startups.filter((el) => el.state === "not_started");
        break;
      case 4:
        this.startup = this.startups.filter((el) => el.state === "in_progress");
        break;
      case 5:
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
    this.startup = this.startups.filter((el) => el.state !== "draft");
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
