<template>
  <div class="technology-picker">
    <h2>{{ title }}</h2>
    <form>
      <technology-item
        v-for="technology in technologies"
        :key="technology.id"
        :technologi-id="technology.id"
        :title="technology.title"
        :checked-class="technology.checked ? 'checked' : ''"
        :type="'radio'"
        :name="'duration'"
        @pickTechnologi="pickTechnology($event, technology.id)"
      >
        {{ technology.title }}
      </technology-item>
    </form>
  </div>
</template>
<script>
import TechnologyItem from "./technologyItem.vue";
export default {
  components: {
    TechnologyItem,
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
        { id: "01", checked: true, title: "Less than 6 months" },
        { id: "02", checked: false, title: "6 months – 1 year" },
        { id: "03", checked: false, title: "1–2 years" },
        { id: "04", checked: false, title: "2–3 years" },
        { id: "05", checked: false, title: "3–4 years" },
        { id: "06", checked: false, title: "4–5 years" },
        { id: "07", checked: false, title: "More than 5 years" },
      ],
    };
  },
  methods: {
    pickTechnology(item, i) {
      this.technologies.forEach((el) => {
        if (i === el.id) {
          el.checked = !el.checked;
        } else if (i !== el.id) {
          el.checked = false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.technology-picker h2 {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 13px;
}
</style>
