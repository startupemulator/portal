<template>
  <div class="practicants">
    <div class="startup-block-content__desctop-buttons">
      <h2 class="practicants-title">What our participants say</h2>
      <div class="desctop-buttons__slider">
        <button
          type="button"
          class="slider-buttton"
          @click="slideRigth('practicant')"
        >
          <img src="@/assets/img/arrow.svg" alt="arrow" />
        </button>
        <button
          type="button"
          class="slider-buttton"
          @click="slideLeft('practicant')"
        >
          <img src="@/assets/img/arrow.svg" alt="arrow" />
        </button>
      </div>
    </div>
    <transition-group
      key="practicants"
      class="practicants-content"
      tag="div"
      name="flip-list"
    >
      <div v-for="item in practicant" :key="item.id" class="practicant-block">
        <h3>{{ item.text }}</h3>
        <p class="practicant-block__full-name">{{ item.fullName }}</p>
        <p class="practicant-block__position">{{ item.position }}</p>
        <img class="practicant-block__img" :src="item.img" alt="practicant" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["practicant"]),
  },
  methods: {
    ...mapActions(["slideRigth", "slideLeft"]),
  },
};
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
