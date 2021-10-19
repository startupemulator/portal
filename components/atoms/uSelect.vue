<template>
  <div class="u-select">
    <div class="u-select__list">
      <div
        class="u-select__item"
        :class="openSpeciality ? 'opend' : ''"
        @click="toggleSelect"
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

      <ul v-show="openSpeciality" class="u-select__item-list">
        <li
          v-for="item in specialisations"
          :key="item.id"
          @click="chooseSpeciality($event, item.id)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class extends Vue {
  @Prop() specialisations: Array<any>;
  openSpeciality: Boolean = false;
  choosenSpeciality: String = "Select a speciality";
  toggleSelect() {
    this.openSpeciality = !this.openSpeciality;
  }

  chooseSpeciality(e, id) {
    this.choosenSpeciality = e.target.textContent;
    this.openSpeciality = !this.openSpeciality;
    this.$emit("choosenSpeciality", id);
  }
}
</script>
<style lang="scss">
.u-select__list {
  width: 343px;
  height: 48px;
  background: #2e384a;
  border-radius: 12px;
}

.u-select__item {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  line-height: 32px;
  background: #2e384a;
  color: #b5c1d8;
  border-radius: 12px;
  box-sizing: border-box;
  border: 2px solid transparent;

  img {
    transform: rotate(90deg);
    transition: 1s;
  }
}

.u-select__item.opend {
  border: 2px solid #b5c1d8;
  color: #fff;
  border-radius: 12px;
  font-weight: 500;
}

.u-select__item-list {
  padding: 0;
  font-weight: 500;
  position: relative;
  z-index: 12;
  margin-top: 4px;
  cursor: pointer;
  font-size: 16px;
  line-height: 32px;
  color: #fff;
  background: #2e384a;
  border-radius: 12px;

  li {
    padding: 8px 16px;

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
@media (min-width: 768px) {
  .u-select__list {
    width: 660px;
    margin-top: 40px;
    box-sizing: border-box;

    .u-select__item {
      font-weight: normal;
      font-size: 18px;
      line-height: 32px;
      padding: 10px 24px;
    }
  }
}
</style>
