<template>
  <div class="pick-bage">
    <h4>{{ title }}</h4>
    <div class="pick-bage__content">
      <ul class="pick-bage__conten-list">
        <li
          v-for="achievement in badges"
          :key="achievement.id"
          :class="achievement.isActive === true ? 'active' : ''"
          class="pick-bage__content-item"
          @click="clickOnBage(achievement.id)"
        >
          <div class="">
            <img :src="achievement.image[0].url" alt="boots" />
            <span>{{ achievement.title }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Badges } from "~/models/Badges";

@Component({
  components: {},
})
export default class extends Vue {
  @Prop({ default: "Pick a badge" }) title: String;
  @Prop() badges: Array<Badges>;

  clickOnBage(achievementId) {
    this.badges.forEach((item) => {
      if (item.id === achievementId) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });

    // const obj = $event.currentTarget;
    // if (obj.classList.contains("active")) {
    //   obj.classList.remove("active");
    // } else {
    //   const bageList = this.$refs.pickBageList.children;
    //   bageList.forEach((item) =>
    //     item.classList.contains("active") ? item.classList.remove("active") : ""
    //   );
    //   obj.classList.add("active");
    // }
    // this.$emit("addBadge", badge);
  }

  mounted() {
    this.badges.forEach((badge) => (badge.isActive = false));
  }
}
</script>
<style lang="scss" scoped>
.pick-bage {
  color: #fff;

  h4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    margin-bottom: 12px;
  }

  ul {
    margin: 0;
    padding: 0;

    li {
      padding: 8px 12px 8px 8px;
      box-sizing: border-box;
      border: 2px solid transparent;
      border-radius: 12px;
      display: inline-block;
      margin-right: 8px;
      margin-bottom: 12px;
      cursor: pointer;

      &.active {
        border: 2px solid #b5c1d8;
        box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
        background: #2e384a;
      }

      div {
        display: flex;
        align-items: center;
      }

      img {
        width: 48px;
      }

      span {
        font-size: 16px;
        line-height: 32px;
        display: inline-block;
        margin-left: 8px;
      }
    }
  }
}
@media (min-width: 768px) {
  .pick-bage {
    h4 {
      font-weight: 500;
      font-size: 17px;
      line-height: 32px;
      margin-top: 32px;
      margin-bottom: 10px;
    }

    ul {
      li {
        margin-right: 5px;
        margin-bottom: 8px;

        img {
          width: 72px;
        }

        span {
          font-weight: 500;
          font-size: 16px;
          line-height: 32px;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
