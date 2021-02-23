<template>
  <div class="startup-block">
    <div class="startup-block-content">
      <div class="startup-block-content__head">
        <h2>Startups</h2>
        <button type="button" class="tartup-block-buttton">
          <span>See All Startups</span>
          <img src="@/assets/img/arrow.svg" alt="" />
        </button>
      </div>
      <div class="startup-block-content__desctop-buttons">
        <h3>
          Find a startup that is going to work with technologies you need to get
          experience with. Then join a team and improve your skills with a
          feedback from our experts.
        </h3>
        <div class="desctop-buttons__slider">
          <button
            type="button"
            class="slider-buttton"
            @click="slideRigth('startupCard')"
          >
            <img src="@/assets/img/arrow.svg" alt="arrow" />
          </button>
          <button
            type="button"
            class="slider-buttton"
            @click="slideLeft('startupCard')"
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
          v-for="(card, i) in startupCard"
          :key="card.id"
          class="startup-block__startup-card"
        >
          <div
            class="startup-card"
            :class="i > 3 ? 'startup-card_animation' : ''"
          >
            <div class="startup-card__started">
              <div
                class="startup-card__started-title"
                :class="card.started ? 'started' : ''"
              >
                {{ card.started ? "In progress" : "Not started" }}
              </div>
            </div>
            <div class="startup-card-content">
              <h2 class="startup-card__started-name">{{ card.title }}</h2>
              <h3 class="startup-card__started-text">
                {{ card.text }}
              </h3>
              <div class="startup-card__started-technologys">
                <ul class="startup-card__started-technologys-items">
                  <li
                    v-for="skill in card.skills"
                    :key="skill.i"
                    class="startup-card__started-technology"
                  >
                    {{ skill }}
                  </li>
                </ul>
              </div>
              <div class="startup-card__started-start-time">
                <div class="started-start-time__start">
                  <h3>Start</h3>
                  <p>{{ card.start }}</p>
                </div>
                <div class="started-start-time__duration">
                  <h3>Duration</h3>
                  <p>{{ card.duration }}</p>
                </div>
              </div>
              <div class="startup-block__buttons">
                <button type="button" class="tartup-block__button-details">
                  Details
                </button>
                <button type="button" class="tartup-block__button-apply">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div></transition-group
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["startupCard"]),
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
