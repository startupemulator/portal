<template>
  <div class="technologi-picker">
    <h2>{{ title }}</h2>
    <form>
      <Technologi-item
        v-for="technologi in technologies"
        :key="technologi.id"
        :technologi-id="technologi.id"
        :technologi-name="technologi.title"
        :checked-class="technologi.checked ? 'checked' : ''"
        @pickTechnologi="pickTechnologi($event, technologi.id)"
      >
        {{ technologi.title }}
      </Technologi-item>
    </form>
  </div>
</template>
<script>
import TechnologiItem from "./technologiItem.vue";
export default {
  components: {
    TechnologiItem,
  },
  props: {
    title: {
      type: String,
      default: " ",
    },
  },
  data() {
    return {
      technologies: [
        { id: 1, checked: true, title: "Javascript" },
        { id: 2, checked: false, title: "Java" },
        { id: 3, checked: false, title: "Python" },
        { id: 4, checked: false, title: "HTML5" },
        { id: 5, checked: false, title: "CSS3" },
        { id: 6, checked: false, title: "Javascript" },
        { id: 7, checked: false, title: "Javascript" },
        { id: 8, checked: false, title: "Java" },
        { id: 9, checked: false, title: "Javascript" },
        { id: 10, checked: false, title: "Java" },
        { id: 11, checked: false, title: "Python" },
        { id: 12, checked: false, title: "HTML5" },
        { id: 13, checked: false, title: "CSS3" },
        { id: 14, checked: false, title: "Java" },
        { id: 15, checked: false, title: "Python" },
        { id: 16, checked: false, title: "Javascript" },
        { id: 17, checked: false, title: "Java" },
        { id: 18, checked: false, title: "Python" },
        { id: 19, checked: false, title: "HTML5" },
        { id: 20, checked: false, title: "CSS3" },
      ],
    };
  },
  methods: {
    pickTechnologi(item, i) {
      this.technologies.forEach((el) => {
        if (i === el.id) {
          el.checked = !el.checked;
        }
      });
    },
  },
};
</script>
