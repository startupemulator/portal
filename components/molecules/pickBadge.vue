<template>
  <div class="pick-bage">
    <h4>Pick a badge (Optional)</h4>
    <div class="pick-bage__content">
      <ul class="pick-bage__conten-list">
        <li
          v-for="(item, i) in 4"
          :key="i"
          class="pick-bage__content-item"
          @click="clickOnBage"
        >
          <div class="">
            <img src="~/assets/img/profile-image.svg" alt="boots" />
            <span>{{
              i % 2
                ? "Boost"
                : i % 3
                ? "Super  supersuper boost "
                : "Super boost"
            }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class extends Vue {
  clickOnBage($event) {
    const obj = $event.currentTarget;
    if (obj.classList.contains("active")) {
      obj.classList.remove("active");
    } else {
      obj.classList.add("active");
    }
    console.log(obj.classList);
  }
}
</script>
<style lang="scss" scoped>
.pick-bage {
  h4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
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
</style>
