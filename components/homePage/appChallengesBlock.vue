<template>
  <div class="startup-block challenges">
    <div class="startup-block-content">
      <div class="startup-block-content__head">
        <h2>Challenges</h2>
        <button type="button" class="tartup-block-buttton">
          <span>See All Challenges</span>
          <img src="@/assets/img/arrow.svg" alt="" />
        </button>
      </div>
      <div class="startup-block-content__desctop-buttons">
        <h3>
          Practise on single challenges while you are waiting for an appropriate
          startup. Complete tasks and get a feedback from our experts.
        </h3>
        <div class="desctop-buttons__slider">
          <button
            type="button"
            class="slider-buttton"
            @click="slideRigth('challenges')"
          >
            <img src="@/assets/img/arrow.svg" alt="arrow" />
          </button>
          <button
            type="button"
            class="slider-buttton"
            @click="slideLeft('challenges')"
          >
            <img src="@/assets/img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
    <div class="startup-block__startup-cards">
      <transition-group
        name="flip-list"
        tag="div"
        class="transition__startup-card"
      >
        <div
          v-for="card in challenges"
          :key="card.id"
          class="startup-block__startup-card"
        >
          <div class="startup-card">
            <div class="startup-card-content">
              <h2 class="startup-card__started-name">
                Possible name in two lines and a long na...
              </h2>
              <h3 class="startup-card__started-text">
                There is a description ...
              </h3>
              <div class="startup-card__started-technologys">
                <ul class="startup-card__started-technologys-items">
                  <li class="startup-card__started-technology">Javascript</li>
                  <li class="startup-card__started-technology">Java</li>
                  <li class="startup-card__started-technology">HTML5</li>
                  <li class="startup-card__started-technology">Javascript</li>
                </ul>
              </div>
              <div class="startup-card__started-start-time">
                <div class="started-start-time__start">
                  <h3>Start</h3>
                  <p>27 Sep 2020</p>
                </div>
                <div class="started-start-time__duration">
                  <h3>Duration</h3>
                  <p>3 months</p>
                </div>
              </div>
              <div class="startup-block__buttons">
                <button type="button" class="tartup-block__button-details">
                  Details
                </button>
                <button type="button" class="tartup-block__button-apply">
                  Take Part
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("challengesSlider", ["challenges"]),
  },
  methods: {
    ...mapActions("challengesSlider", ["slideRigth", "slideLeft"]),
  },
};
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
