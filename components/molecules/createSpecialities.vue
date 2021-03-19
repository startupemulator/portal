<template>
  <div class="">
    <div class="specialityOne">
      <p>{{ name }}</p>
      <div class="specialityOne__list">
        <div
          class="specialityOne__item"
          :class="
            choosenSpeciality !== 'Select a speciality' ? 'item-choosen' : ''
          "
          @click="openSpeciality = !openSpeciality"
        >
          <span>{{ choosenSpeciality }}</span>
          <img
            src="~/assets/img/arrow.svg"
            alt="arrow"
            :style="
              openSpeciality ? 'transform: rotate(-90deg); transition: 1s' : ''
            "
          />
        </div>
        <button
          v-show="choosenSpeciality !== 'Select a speciality'"
          class="button-remove-speciality"
          type="button"
          @click="$emit('removeSpeciality')"
        >
          <img src="~/assets/img/close.svg" alt="" />
        </button>
        <ul v-show="openSpeciality" class="specialityOne__item-list">
          <li
            v-for="item in speciality"
            :key="item.id"
            class="specialityOne__item-item"
            @click="chosespeciality($event.target)"
          >
            {{ item.specialityPosition }}
          </li>
        </ul>
        <ul
          class="chosen-technology"
          :class="
            pickedTechnology.length === 0 ? 'chosen-technology--empty' : ''
          "
        >
          <li v-for="(item, i) in pickedTechnology" :key="i">
            {{ item.title }}
          </li>
          <button
            v-show="pickedTechnology.length !== 0"
            type="button"
            style="margin: 0 0 8px 0"
            class="button_pick_technologies"
            @click="popupPickTechnology = !popupPickTechnology"
          >
            Edit technologies
          </button>
        </ul>
        <button
          v-show="
            (choosenSpeciality !== 'Select a speciality') &
            (pickedTechnology.length === 0)
          "
          type="button"
          class="button_pick_technologies"
          :class="
            pickedTechnology.length === 0
              ? 'button_pick_technologies--empty'
              : ''
          "
          @click="popupPickTechnology = !popupPickTechnology"
        >
          Pick technologies for this speciality
        </button>
      </div>
    </div>
    <div v-show="popupPickTechnology" class="technologi-popup">
      <div class="technologi-popup__pick-technology step-1">
        <div class="pick-technology__content">
          <h2>
            Pick technologies you need to use within
            <span>{{ choosenSpeciality }}</span> developer speciality
          </h2>
          <div class="step-1__experience">
            <div class="technology-picker">
              <h2>{{ title }}</h2>
              <form>
                <label
                  v-for="technologi in technologies"
                  :key="technologi.id"
                  class="technologi-item"
                  :class="technologi.checked ? 'checked' : ''"
                >
                  {{ technologi.title }}
                  <input
                    @click.prevent="
                      pickTechnologi($event, technologi.id, technologi.title)
                    "
                  />
                </label>
              </form>
            </div>
          </div>
          <input
            type="text"
            placeholder="Type a technology to add"
            @keydown="inputTechnology($event)"
          />
          <div class="createProgect-step2__buttons-popup">
            <U-button
              :button-name="'Save'"
              :button-class="'u-button-blue'"
              @clickOnButton="popupPickTechnology = !popupPickTechnology"
            ></U-button>
            <U-button
              :button-name="'Skip'"
              :button-class="'u-button-transpend'"
              @clickOnButton="skipTechnologi"
            ></U-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UButton from "~/components/atoms/uButton";

export default {
  components: {
    UButton,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: " ",
    },
  },
  data() {
    return {
      openSpeciality: false,
      choosenSpeciality: "Select a speciality",
      popupPickTechnology: false,
      speciality: [
        { id: 0, specialityPosition: "Front-end" },
        { id: 1, specialityPosition: "Back-end" },
        { id: 2, specialityPosition: "DevOps" },
        { id: 3, specialityPosition: "Seo" },
      ],
      technologies: [
        { id: 1, checked: false, title: "Javascript" },
        { id: 2, checked: false, title: "Java" },
        { id: 3, checked: false, title: "Python" },
        { id: 4, checked: false, title: "HTML5" },
        { id: 5, checked: false, title: "CSS3" },
        { id: 6, checked: false, title: "Javascript" },
        { id: 7, checked: false, title: "Javascript" },
        { id: 8, checked: false, title: "Java" },
        { id: 9, checked: false, title: "Javascript" },
        { id: 10, checked: false, title: "Java" },
        { id: 11, checked: false, title: "Python" },
        { id: 12, checked: false, title: "HTML5" },
        { id: 13, checked: false, title: "CSS3" },
        { id: 14, checked: false, title: "Java" },
        { id: 15, checked: false, title: "Python" },
        { id: 16, checked: false, title: "Javascript" },
        { id: 17, checked: false, title: "Java" },
        { id: 18, checked: false, title: "Python" },
        { id: 19, checked: false, title: "HTML5" },
        { id: 20, checked: false, title: "CSS3" },
      ],
      pickedTechnology: [],
    };
  },
  methods: {
    inputTechnology(e) {
      const value = e.target.value.trim();
      if ((e.keyCode === 13) & (value.length > 2)) {
        this.technologies.push({
          id: this.technologies.length + 2,
          checked: false,
          title: e.target.value,
        });
        e.target.value = "";
      }
    },
    chosespeciality(e) {
      this.choosenSpeciality = e.textContent;
      this.openSpeciality = !this.openSpeciality;
    },
    mychosenTechnologi(pickedTechnology) {
      this.pickedTechnology = pickedTechnology;
    },
    skipTechnologi() {
      this.popupPickTechnology = !this.popupPickTechnology;
    },
    pickTechnologi(item, i, title) {
      this.technologies.forEach((el) => {
        if (i === el.id) {
          el.checked = !el.checked;
        }
      });
      this.pickedTechnology = this.technologies.filter((item) => item.checked);
    },
  },
};
</script>

<style lang="scss">
.specialityOne .chosen-technology {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin-top: 16px;

  li {
    padding: 8px 14px;
    border: 1px solid #59667e;
    box-sizing: border-box;
    border-radius: 32px;
    margin-right: 4px;
    margin-bottom: 8px;
    color: #b5c1d8;
    font-size: 14px;
  }
}
.createProgect-step2 .speciality-content:not(:first-of-type) {
  p {
    margin-top: 14px;
  }
  .chosen-technology {
    margin-top: 16px;
  }
}
.createProgect-step2
  .speciality-content
  .chosen-technology.chosen-technology--empty {
  display: none;
}
.button_pick_technologies.button_pick_technologies--empty {
  margin-top: 10px;
}
</style>