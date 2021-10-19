<template>
  <div class="date-input">
    <img src="~/assets/img/calendar.svg" alt="calendar" />
    <input class="date-input--day" placeholder="20" type="text" />
    <input class="date-input--monts" placeholder="09" type="text" />
    <input class="date-input--year" placeholder="2020" type="text" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.date-input {
  background: #2e384a;
  border-radius: 12px;
  width: 100%;
  padding: 8px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  img {
    margin-right: 16px;
  }

  input {
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    color: #fff;
    border: none;
    background: transparent;
    width: 20px;
    height: 32px;
    padding-right: 12px;
    padding-left: 12px;
    border-right: 1px solid #4e5a71;

    &::placeholder {
      color: #8c97ac;
    }
  }

  .date-input--day {
    padding-left: 0;
  }

  .date-input--year {
    width: 40px;
    border-right: none;
  }
}
</style>
