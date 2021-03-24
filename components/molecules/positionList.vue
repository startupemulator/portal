<template>
  <div class="position-list">
    <div class="position-list__header">
      <div class="position-list__header-name">
        <h4>{{ title }}</h4>

        <span>99</span>
      </div>
      <div class="position-list__header-button">
        <span>{{ id }}</span>
        <img
          src="~/assets/img/arrow.svg"
          alt="arrow"
          :style="opendPosition ? 'transform: rotate(-90deg)' : ''"
          @click="togglePosition"
        />
      </div>
    </div>

    <div class="position-list__cards">
      <position-card
        v-for="item in position.position"
        v-show="opendPosition"
        :key="item.user"
        :name="item.user"
        :uncheck="item.uncheck"
        :check="item.check"
        :access="item.access"
        :decline-reason="item.profile"
      ></position-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import PositionCard from "./positionCard.vue";

@Component({
  components: { PositionCard },
})
export default class extends Vue {
  @Prop() title: String;
  @Prop() id: Number;
  @Prop() position: Array<any>;
  opendPosition = false;
  togglePosition() {
    this.opendPosition = !this.opendPosition;
  }
}
</script>
<style lang="scss" scoped>
.position-list {
  padding-bottom: 24px;
  padding-top: 24px;
  border-bottom: 1px solid #4e5a71;
  .position-list__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .position-list__header-name {
      display: flex;
      align-items: center;
      h4 {
        font-weight: 600;
        font-size: 18px;
        line-height: 32px;
        margin: 0;
      }
      span {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #4e5a71;
        background: #eaf42c;
        width: 24px;
        height: 24px;
        box-shadow: 0 -2px 8px rgba(234, 244, 44, 0.3),
          0 2px 8px rgba(234, 244, 44, 0.3),
          inset 0 -2px 4px 1px rgba(117, 122, 14, 0.15),
          inset 0 1px 4px rgba(255, 255, 255, 0.15);
        border-radius: 14px;
        margin-left: 12px;
      }
    }
    .position-list__header-button {
      width: 65px;
      display: flex;
      justify-content: space-between;
      margin-right: 7px;
      span {
        width: 24px;
        height: 24px;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #fff;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 14px;
      }
      img {
        transform: rotate(90deg);
        cursor: pointer;
        transition: 0.2s;
      }
    }
  }
}
@media (min-width: 1440px) {
  .position-list {
    display: block;
  }
  .position-list__cards {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>