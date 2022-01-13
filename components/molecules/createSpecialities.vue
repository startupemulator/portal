<template>
  <div>
    <div class="specialityOne">
      <div class="specialityOne__header">
        <p>{{ name }}</p>
        <div v-if="isEditTeam" class="position-status">
          <span :class="isOpenPosition ? 'active' : ''" @click="openPosition"
            >open</span
          >
          <span
            :class="isStaffedPosition ? 'active' : ''"
            @click="staffedPosition"
            >staffed</span
          >
        </div>
      </div>

      <div class="specialityOne__list">
        <div
          :style="!isDropping ? 'cursor:default' : ''"
          class="specialityOne__item"
          :class="
            chosenSpeciality !== 'Select a speciality' ? 'item-chosen' : ''
          "
          @click="openSpeciality = !openSpeciality"
        >
          <span>{{ chosenSpeciality }}</span>
          <img
            v-if="isDropping"
            src="~/assets/img/arrow.svg"
            alt="arrow"
            :style="
              openSpeciality ? 'transform: rotate(-90deg); transition: 1s' : ''
            "
          />
        </div>
        <button
          v-show="chosenSpeciality !== 'Select a speciality'"
          class="button-remove-speciality"
          type="button"
          @click="$emit('removeSpeciality')"
        >
          <img src="~/assets/img/close.svg" alt="" />
        </button>

        <ul
          v-if="isDropping"
          v-show="openSpeciality"
          class="specialityOne__item-list"
        >
          <li
            v-for="(item, i) in specialisations"
            :key="i"
            class="specialityOne__item-item"
            @click="chosespeciality($event.target, item.id)"
          >
            {{ item.title }}
          </li>
        </ul>

        <ul
          class="chosen-technology"
          :class="
            checkedTechnologies.length === 0 ? 'chosen-technology--empty' : ''
          "
        >
          <U-Tags
            v-for="(item, i) in checkedTechnologies"
            :key="i"
            :title="item.title || item.name || item"
          >
          </U-Tags>
          <button
            v-show="checkedTechnologies.length !== 0"
            type="button"
            style="margin: 0 0 8px 0"
            class="button_pick_technologyes"
            @click="openPopupPickTechnologies"
          >
            Edit technologyes
          </button>
        </ul>
        <button
          v-if="picker"
          v-show="
            (chosenSpeciality !== 'Select a speciality') &
            (checkedTechnologies.length === 0)
          "
          type="button"
          class="button_pick_technologyes"
          :class="
            checkedTechnologies.length === 0
              ? 'button_pick_technologyes--empty'
              : ''
          "
          @click="openPopupPickTechnologies"
        >
          Pick technologyes for this speciality
        </button>
      </div>
    </div>
    <div v-if="popupPickTechnology" class="technology-popup popup">
      <div class="technology-popup__pick-technology step-1">
        <div class="pick-technology__content">
          <h2>
            Pick technologyes you need to use within
            <span>{{ chosenSpeciality }}</span> developer speciality
          </h2>
          <div class="step-1__experience">
            <div class="technology-picker">
              <h2>{{ title }}</h2>
              <Technology-Picker
                :choosen-technologies="checkedTechnologies"
                :technologies="publicTechnologies"
                :unique-id="name"
                @chosenTechnologi="chosenTechnologi"
                @addTechnologies="createCustomTechnology"
                @removeTechnology="removeTechnology"
              ></Technology-Picker>
            </div>
          </div>

          <div class="createProject-step2__buttons-popup">
            <U-Button
              :button-name="'Save'"
              :button-class="'u-button-blue'"
              @clickOnButton="savePopupPickTechnologies"
            ></U-Button>
            <U-Button
              :button-name="'Skip'"
              :button-class="'u-button-transpend'"
              @clickOnButton="skiptechnology"
            ></U-Button>
          </div>
        </div>
      </div>
    </div>
    <p
      v-show="positionWithoutSpecialisation && !specialityFromParent"
      class="errorInput"
    >
      Choose specialisation
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";
import {
  enableScrolling,
  disableScrolling,
} from "~/assets/jshelper/toggleScroll";
import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import UTags from "~/components/atoms/uTags.vue";
import { Specialisation } from "~/models/Specialisation";
import { Technology } from "~/models/Technology";

@Component({
  components: {
    UButton,
    TechnologyPicker,
    UTags,
  },
})
export default class extends Vue {
  @Prop({ default: "" }) name: String;
  @Prop({ default: "" }) title: String;
  @Prop() positionWithoutSpecialisation: boolean;

  @Prop({
    default() {
      return [];
    },
  })
  checkedTechnologies: Array<any>;

  @Prop({ default: "" }) picker: boolean;
  @Prop({ default: "Select a speciality" }) specialityFromParent!: String;
  @Prop() specialisations: Array<Specialisation>;
  @Prop() creator: number;
  @Prop() status!: string;
  @Prop() isEditTeam: boolean;
  @Prop() positionId: string;
  @Prop({ default: true }) isDropping: boolean;
  @Prop({ default: [] }) allTechnologies: Technology[];
  openSpeciality = false;
  chosenSpeciality = this.specialityFromParent[0]
    ? this.specialityFromParent[0]
    : "Select a speciality";

  popupPickTechnology = false;

  chosenTechnologies = [];
  pickedTechnologyId = [];
  newTechnologies = [];
  customTechnologiesForRemove = [];
  publicTechnologies: Technology[] = [];

  specialityId = this.specialityFromParent[1]
    ? this.specialityFromParent[1]
    : "";

  isOpenPosition = this.status === "open";
  isStaffedPosition = this.status === "staffed";

  chosenTechnologi({ item, id }) {
    if (item.checked) {
      this.publicTechnologies.forEach((technology) => {
        if (+technology.id === +id) {
          this.$emit("addTechnologyToPosition", {
            positionId: this.positionId,
            technology,
          });
        }
      });
    } else {
      this.publicTechnologies.forEach((technology) => {
        if (+technology.id === +id) {
          this.$emit("removeTechnologyToPosition", {
            positionId: this.positionId,
            technology,
          });
        }
      });
    }
  }

  createCustomTechnology(technology) {
    this.newTechnologies.push(technology);
  }

  removeTechnology(data) {
    this.customTechnologiesForRemove = [];
    if (data.length === 0) {
      this.customTechnologiesForRemove.push(false);
    } else {
      this.customTechnologiesForRemove = data;
    }
  }

  chosespeciality(e, id) {
    this.chosenSpeciality = e.textContent.trim();
    this.openSpeciality = !this.openSpeciality;
    this.specialityId = id;
    this.$emit("chosenSpeciality", [
      { title: this.chosenSpeciality.trim(), id },
    ]);
  }

  openPopupPickTechnologies() {
    this.newTechnologies = [];
    this.popupPickTechnology = !this.popupPickTechnology;
  }

  async savePopupPickTechnologies() {
    this.chosenTechnologies = [];

    if (this.customTechnologiesForRemove.length !== 0) {
      await this.$emit("removePersonalTechnology", {
        technologies: this.customTechnologiesForRemove,
        positionId: this.positionId,
      });
    }

    for (const technology of this.newTechnologies) {
      await this.$emit("createCustomTechnology", {
        positionId: this.positionId,
        technology,
      });
    }

    this.publicTechnologies.forEach((technology) => {
      if (technology.checked) {
        this.chosenTechnologies.push(technology.id);
      }
    });
    this.checkedTechnologies.forEach((technology) => {
      if (!technology.is_public) {
        this.chosenTechnologies.push(technology.id);
      }
    });
    await this.$emit("updatePosition", {
      positionId: this.positionId,
      technologies: this.chosenTechnologies,
      specialisation: this.specialityId,
    });
    this.closeTechnologiPicker();
  }

  async skiptechnology() {
    await this.$emit("skipTechnologies", {
      positionId: this.positionId,
      chosenTechnologies: this.chosenTechnologies,
    });

    this.publicTechnologies.forEach((technology) => {
      if (this.checkedTechnologies.some((el) => el.id === technology.id)) {
        technology.checked = true;
      } else {
        technology.checked = false;
      }
    });
    this.checkedTechnologies.forEach((el) => {
      if (!el.is_public) {
        this.chosenTechnologies.push(el.id);
      }
    });
    enableScrolling();
    this.popupPickTechnology = !this.popupPickTechnology;
  }

  closeTechnologiPicker() {
    this.popupPickTechnology = !this.popupPickTechnology;
    this.popupPickTechnology ? disableScrolling() : enableScrolling();
  }

  openPosition() {
    this.isOpenPosition = true;
    this.isStaffedPosition = false;
    this.$emit("changeStatusPosition", {
      positionId: this.positionId,
      status: "open",
    });
  }

  staffedPosition() {
    this.isOpenPosition = false;
    this.isStaffedPosition = true;
    this.$emit("changeStatusPosition", {
      positionId: this.positionId,
      status: "staffed",
    });
  }

  mounted() {
    if (this.checkedTechnologies) {
      this.publicTechnologies = JSON.parse(
        JSON.stringify(this.allTechnologies)
      );
      this.publicTechnologies.forEach((technology) => {
        if (this.checkedTechnologies.some((el) => el.id === technology.id)) {
          technology.checked = true;
          this.chosenTechnologies.push(technology.id);
        } else {
          technology.checked = false;
        }
      });
    }
    this.checkedTechnologies.forEach((el) => {
      if (!el.is_public) {
        this.chosenTechnologies.push(el.id);
      }
    });
  }
}
</script>

<style lang="scss">
.button_pick_technologyes {
  background: transparent;
  text-decoration: underline;
  color: #8c97ac;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
}

.speciality-content {
  .technology-picker {
    margin-right: 0;
    margin-left: 0;
  }
}

.specialityOne {
  color: #fff;

  .specialityOne__header {
    display: flex;
  }

  .position-status {
    display: flex;
    border: 1px solid #59667e;
    border-radius: 12px;
    height: 36px;
    width: 140px;
    justify-content: space-between;
    margin-left: 16px;

    span {
      padding: 10px;
      border-radius: 10px;
      height: 16px;
      cursor: pointer;
      font-size: 14px;
      color: #b5c1d8;
      transition: 0.4s;

      &.active {
        background: #4b4ac8;
        transition: 0.4s;
      }
    }
  }
}

.specialityOne__list {
  position: relative;

  .button-remove-speciality {
    position: absolute;
    top: 15px;
    right: 0;
    background-color: transparent;
  }
}

.specialityOne__item {
  width: 340px;
  height: 48px;
  background: #2e384a;
  color: #b5c1d8;
  border-radius: 12px;
  padding: 8px 16px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: normal;
  font-size: 16px;
  line-height: 32px;
  position: relative;
  transition: 0.4s;

  img {
    transform: rotate(90deg);
    margin-right: 5px;
    transition: 1s;
  }
}

.specialityOne__item.item-chosen {
  width: 304px;
}

.specialityOne__item-list {
  width: 340px;
  background: #2e384a;
  border-radius: 12px;
  box-sizing: border-box;
  position: absolute;
  padding: 0;
  z-index: 6;
  color: #fff;

  .specialityOne__item-item {
    width: 100%;
    height: 48px;
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    position: relative;
    padding: 8px 16px;
    box-sizing: border-box;
    cursor: pointer;

    &:first-child {
      border-radius: 12px 12px 0 0;
    }

    &:last-child {
      border-radius: 0 0 12px 12px;
    }

    &:hover {
      background: #4e5a71;
    }

    &:active {
      background: #4b4ac8;
    }
  }
}
</style>
