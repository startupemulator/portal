<template>
  <div class="criterios">
    <h4>{{ direction.title }}</h4>
    <p>
      {{ direction.comment }}
    </p>
    <div class="criterios_raiting">
      <ul ref="starsList" class="criterios_raiting-stars">
        <li v-for="(item, i) in 5" :key="i" class="criterios_raiting-star">
          <svg
            width="36"
            height="37"
            viewBox="0 0 36 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="clickOnStar($event, i)"
          >
            <path
              d="M13.1257 13.1857L17.5358 2.1606C17.7034 1.74152 18.2966 1.74152 18.4642 2.1606L22.8743 13.1857C22.9502 13.3755 23.1341 13.5 23.3385 13.5H34.2929C34.7383 13.5 34.9614 14.0386 34.6464 14.3536L26.9552 22.0448C26.8283 22.1717 26.7791 22.3568 26.8263 22.5299L30.1726 34.7995C30.2911 35.2342 29.8193 35.5916 29.433 35.3598L18.2572 28.6543C18.0989 28.5593 17.9011 28.5593 17.7428 28.6543L6.56705 35.3598C6.18066 35.5916 5.70886 35.2342 5.82742 34.7995L9.17365 22.5299C9.22086 22.3568 9.1717 22.1717 9.04482 22.0448L1.35355 14.3536C1.03857 14.0386 1.26165 13.5 1.70711 13.5H12.6615C12.8659 13.5 13.0498 13.3755 13.1257 13.1857Z"
              stroke="#59667E"
              stroke-width="2"
            />
          </svg>
        </li>
      </ul>
      <U-button
        :button-name="'Skip'"
        :button-class="'u-button-transpend'"
        @clickOnButton="clickOnButtonSkip"
      ></U-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UButton from "../atoms/uButton.vue";
import { Directions } from "~/models/Directions";

@Component({
  components: {
    UButton,
  },
})
export default class extends Vue {
  @Prop() i: Number;
  @Prop() direction: Array<Directions>;

  clickOnStar($event: any, i: Number) {
    const stars = this.$refs.starsList.children;
    const choosenStarLenght = i;
    stars.forEach((item: any, i: Number) => {
      if (item.children[0].classList.contains("active")) {
        item.children[0].classList.remove("active");
      }
      if (i <= choosenStarLenght) {
        item.children[0].classList.add("active");
      }
    });
    this.$emit("markDirection", this.direction.id, (i + 1).toString());
  }

  clickOnButtonSkip() {
    this.$refs.starsList.children.forEach((item) =>
      item.children[0].classList.remove("active")
    );
    this.$emit("markDirection", this.direction.id, "skip");
  }
}
</script>
<style lang="scss" scoped>
.criterios {
  color: #fff;
  margin-bottom: 24px;

  h4 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  p {
    margin-top: 2px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #dbe4f3;
    margin-bottom: 12px;
  }
  .criterios_raiting {
    display: flex;
    align-items: center;
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      margin-left: 2px;
      li:not(:last-child) {
        margin-right: 12px;
      }
    }
    svg {
      cursor: pointer;
      &.active {
        fill: #eaf42c;
        path {
          stroke: #eaf42c;
        }
      }
      &:hover {
        path {
          stroke: #eaf42c;
        }
      }
    }

    .u-button-transpend {
      border: 2px solid #59667e;
      width: 85px;
      height: 40px;
      margin-left: 26px;
    }
  }
}
@media (min-width: 768px) {
  .criterios {
    margin-bottom: 28px;
    h4 {
      font-size: 17px;
      line-height: 32px;
    }
    .criterios_raiting {
      ul {
        margin-top: 3px;
        margin-left: 3px;
        li:not(:last-child) {
          margin-right: 22px;
        }
      }
      svg {
        width: 42px;
        height: 42px;
      }
      .u-button-transpend {
        width: 85px;
        height: 48px;
        margin-left: 32px;
        color: #fff;
        &:hover {
          background: #59667e;
        }
      }
    }
  }
}
</style>
