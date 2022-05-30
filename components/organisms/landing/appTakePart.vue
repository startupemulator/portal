<template>
  <div class="take-part">
    <h2 class="take-part__title">Take part to</h2>
    <div
      v-for="(item, i) in takePart"
      :key="i"
      :class="{ 'technologies-active': item.status === true }"
      class="take-part__technologies"
    >
      <div class="take-part__technologies-title" @click="switchingTakePart(i)">
        <h2>{{ item.title }}</h2>
        <img src="~/assets/img/arrow.svg" alt="arrow" />
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
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class AppTakePart extends Vue {
  takePart = takePart();

  switchingTakePart(i) {
    this.takePart.forEach((item) => {
      item.status = item.id.toString() !== i.toString();
    });
  }
}

function takePart() {
  return [
    {
      id: "0",
      status: false,
      title: "Use new technologies",
      text: "There are many technologies and frameworks released and updated daily, and you will learn how to choose the right ones for your web application right in the process of working on your startup.",
      img: require("~/assets/img/benefits.svg"),
    },
    {
      id: "1",
      status: true,
      title: "Collaborate with others",
      text: "The best platform to help improve your hard and soft skills, meet like-minded people, create your dream team and your own project.",
      img: require("~/assets/img/benefits2.svg"),
    },
    {
      id: "2",
      status: true,
      title: "Receive feedback from our experts",
      text: "For both beginners and experienced professionals, feedback is an important development tool. Argumentative criticism helps to see areas of growth and correct mistakes that may have gone unnoticed.",
      img: require("~/assets/img/benefits3.svg"),
    },
  ];
}
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

.take-part__technologies.technologies-active {
  .take-part__technologies-title {
    img {
      transform: rotate(90deg);
      transition: 1s;
    }
  }
}
</style>
