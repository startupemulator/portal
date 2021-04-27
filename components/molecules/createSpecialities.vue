<template>
  <div class="">
    <div class="specialityOne">
      <p>{{ name }}</p>
      <div class="specialityOne__list">
        <div
          class="specialityOne__item"
          :class="
            chosenSpeciality !== 'Select a speciality' ? 'item-chosen' : ''
          "
          @click="openSpeciality = !openSpeciality"
        >
          <span>{{ chosenSpeciality }}</span>
          <img
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
        <ul v-show="openSpeciality" class="specialityOne__item-list">
          <li
            v-for="item in specialisations"
            :key="item.id"
            class="specialityOne__item-item"
            @click="chosespeciality($event.target, item.id)"
          >
            {{ item.title }}
          </li>
        </ul>
        <ul
          class="chosen-technology"
          :class="
            pickedTechnology.length === 0 ? 'chosen-technology--empty' : ''
          "
        >
          <Utags v-for="(item, i) in pickedTechnology" :key="i" :title="item">
          </Utags>
          <button
            v-show="pickedTechnology.length !== 0"
            type="button"
            style="margin: 0 0 8px 0"
            class="button_pick_technologyes"
            @click="popupPickTechnology = !popupPickTechnology"
          >
            Edit technologyes
          </button>
        </ul>
        <button
          v-if="picker"
          v-show="
            (chosenSpeciality !== 'Select a speciality') &
            (pickedTechnology.length === 0)
          "
          type="button"
          class="button_pick_technologyes"
          :class="
            pickedTechnology.length === 0
              ? 'button_pick_technologyes--empty'
              : ''
          "
          @click="togglePopupPickTechnologies"
        >
          Pick technologyes for this speciality
        </button>
      </div>
    </div>
    <div v-show="popupPickTechnology" class="technology-popup popup">
      <div class="technology-popup__pick-technology step-1">
        <div class="pick-technology__content">
          <h2>
            Pick technologyes you need to use within
            <span>{{ chosenSpeciality }}</span> developer speciality
          </h2>
          <div class="step-1__experience">
            <div class="technology-picker">
              <h2>{{ title }}</h2>

              <technology-picker
                :technologies="technologies"
                @chosenTechnologi="chosenTechnologi"
              ></technology-picker>
            </div>
          </div>

          <div class="createProject-step2__buttons-popup">
            <U-button
              :button-name="'Save'"
              :button-class="'u-button-blue'"
              @clickOnButton="togglePopupPickTechnologies"
            ></U-button>
            <U-button
              :button-name="'Skip'"
              :button-class="'u-button-transpend'"
              @clickOnButton="skiptechnology"
            ></U-button>
          </div>
        </div>
      </div>
    </div>
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
import Utags from "~/components/atoms/uTags.vue";
import { Specialisation } from "~/models/Specialisation";

@Component({
  components: {
    UButton,
    TechnologyPicker,
    Utags,
  },
})
export default class extends Vue {
  @Prop({ default: "" }) name: String;
  @Prop({ default: "" }) title: String;
  @Prop({
    default() {
      return [];
    },
  })
  technologies: Array<any>;

  @Prop({
    default() {
      return [];
    },
  })
  checkedTechnologies: Array<any>;

  @Prop({ default: "" }) picker: Boolean;
  @Prop({ default: "Select a speciality" }) specialityFromParent: String;
  @Prop() specialisations: Array<Specialisation>;
  data() {
    return {
      openSpeciality: false,
      chosenSpeciality: this.specialityFromParent,
      popupPickTechnology: false,
      pickedTechnology: [],
      chosenTechnologies: [],
      pickedTechnologyId: [],
    };
  }

  chosenTechnologi(chosenTechnologies, pickedTechnologyId) {
    this.pickedTechnologyId = pickedTechnologyId;

    this.chosenTechnologies = chosenTechnologies;
  }

  chosespeciality(e, id) {
    this.chosenSpeciality = e.textContent.trim();
    this.openSpeciality = !this.openSpeciality;
    this.$emit("chosenSpeciality", [
      { title: this.chosenSpeciality.trim(), id },
    ]);
  }

  togglePopupPickTechnologies() {
    this.pickedTechnology = this.chosenTechnologies;

    this.$emit("chosenTechnologies", [
      {
        technologies: this.pickedTechnology,
        id: this.pickedTechnologyId,
      },
    ]);
    this.popupPickTechnology = !this.popupPickTechnology;
    this.popupPickTechnology ? disableScrolling() : enableScrolling();
  }

  mychosentechnology(pickedTechnology) {
    this.pickedTechnology = pickedTechnology;
  }

  skiptechnology() {
    this.pickedTechnology = [];
    enableScrolling();
    this.popupPickTechnology = !this.popupPickTechnology;
  }

  mounted() {
    if (this.checkedTechnologies) {
      this.pickedTechnology = this.checkedTechnologies;
    }
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
