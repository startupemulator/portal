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
        :type="'radio'"
        :name="'duration'"
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
        { id: 1, checked: false, title: "Less than 6 months" },
        { id: 2, checked: false, title: "6 months – 1 year" },
        { id: 3, checked: false, title: "1–2 years" },
        { id: 4, checked: true, title: "2–3 years" },
        { id: 5, checked: false, title: "3–4 years" },
        { id: 6, checked: false, title: "4–5 years" },
        { id: 7, checked: false, title: "More than 5 years" },
      ],
    };
  },
  methods: {
    pickTechnologi(item, i) {
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
.technologi-picker h2 {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 13px;
}
</style>
