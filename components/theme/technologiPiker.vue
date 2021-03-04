<template>
  <div class="technologi-picker">
    <h2 class="technologi-picker__title">{{ title }}</h2>
    <form>
      <Technologi-item
        v-for="technologi in technologies"
        :key="technologi.id"
        :technologi-id="technologi.id"
        :technologi-name="technologi.title"
        :checked-class="technologi.checked ? 'checked' : ''"
        @pickTechnologi="
          pickTechnologi($event, technologi.id, technologi.title)
        "
      >
        {{ technologi.title }}
      </Technologi-item>
    </form>
    <input
      class="input-technology"
      type="text"
      placeholder="Type a technology to add"
      @keydown="inputTechnology($event)"
    />
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
        { id: 1, checked: false, title: "Javascript" },
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
      chosenTechnologi: [],
    };
  },
  methods: {
    pickTechnologi(item, i, title) {
      this.technologies.forEach((el) => {
        if (i === el.id) {
          el.checked = !el.checked;
        }
      });

      this.chosenTechnologi = this.technologies.filter((item) => item.checked);
      this.$emit("chosenTechnologi", this.chosenTechnologi);
    },
    inputTechnology(e) {
      const value = e.target.value.trim();

      if ((e.keyCode === 13) & (value.length > 2)) {
        this.technologies.push({
          id: this.technologies.length + 1,
          checked: false,
          title: value,
        });
      }
    },
  },
};
</script>
<style lang="scss">
.input-technology {
  width: 340px;
  height: 48px;
  background: #2e384a;
  color: #fff;
  border-radius: 12px;
  border: 2px solid transparent;
  padding: 8px 16px;
  box-sizing: border-box;
  &::placeholder {
    color: #b5c1d8;
  }
  &:focus {
    border: 2px solid #b5c1d8;
  }
}
@media (min-width: 768px) {
  .input-technology {
    width: 660px;
    height: 56px;
  }
}
</style>
