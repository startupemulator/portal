<template>
  <div v-cloak class="position-list">
    <div class="position-list__header">
      <div class="position-list__header-name">
        <h4>{{ title }}</h4>

        <span v-if="newAplications !== 0">{{ newAplications }}</span>
      </div>
      <div class="position-list__header-button">
        <span>{{ applications.length }}</span>
        <img
          src="~/assets/img/arrow.svg"
          alt="arrow"
          :style="opendPosition ? 'transform: rotate(-90deg)' : ''"
          @click="togglePosition"
        />
      </div>
    </div>

    <div class="position-list__cards">
      <Position-Card
        v-for="item in applications"
        v-show="opendPosition"
        :key="item.id"
        :name="item.user.profile.name"
        :uncheck="item.status === 'declined'"
        :check="item.status === 'accepted'"
        :advanced="item.status === 'advanced'"
        :access="
          item.status === 'accepted'
            ? true
            : item.status === 'declined'
            ? true
            : item.status === 'advanced'
            ? true
            : false
        "
        :decline-reason="item.decline_reason"
        :experience="item.user.profile.experience.title"
        :technologies="item.user.profile.technologies"
        :position-id="item.id"
        @accept="accept"
        @decline="decline"
        @advancedAccess="advancedAccess"
      ></Position-Card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import PositionCard from "./positionCard.vue";

@Component({
  components: { PositionCard },
})
export default class extends Vue {
  @Prop() title: String;
  @Prop() id: Number;
  @Prop() position!: Array<any>;
  @Prop() updateKey: Number;
  opendPosition = false;
  newAplications: Number = 0;
  applications = [];
  togglePosition() {
    this.opendPosition = !this.opendPosition;
  }

  accept(id) {
    this.$emit("accept", id);
  }

  decline(id, declinetext) {
    this.$emit("decline", id, declinetext);
  }

  advancedAccess(id) {
    this.$emit("advancedAccess", id);
  }

  mounted() {
    this.applications = this.position.applications;
    this.newAplications = this.applications.filter(
      (position) => position.status === "waiting"
    ).length;
  }

  @Watch("updateKey")
  update() {
    this.applications = this.position.applications;
    this.newAplications = this.applications.filter(
      (position) => position.status === "waiting"
    ).length;
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
