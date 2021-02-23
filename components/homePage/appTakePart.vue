<template>
  <div class="take-part">
    <h2 class="take-part__title">Take part to</h2>
    <div
      class="take-part__technologies"
      v-for="(item, i) in takePart"
      :key="i"
      :class="{ 'technologies-active': item.status === true }"
    >
      <div class="take-part__technologies-title" @click="switchingtakePart(i)">
        <h2>{{ item.title }}</h2>
        <img src="@/assets/img/arrow.svg" alt="arrow" />
      </div>
      <h3>
        {{ item.text }}
      </h3>

      <img
        v-if="!item.status"
        class="take-part__technologies-img"
        :alt="item.img"
        :src="item.img"
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState("takePartTo", ["takePart"]),
  },
  methods: {
    ...mapActions("takePartTo", ["switchingtakePart"]),
  },
};
</script>
<style lang="scss">
.take-part {
  .take-part__technologies.technologies-active {
    height: 60px;
    overflow: hidden;
    background-color: transparent;
    transition: 1s;
  }
}
.take-part__technologies.technologies-active
  .take-part__technologies-title
  img {
  transform: rotate(90deg);
  transition: 1s;
}
</style>