<template>
  <div class="technology-picker">
    <h2>{{ title }}</h2>
    <form>
      <uTags
        v-for="technology in technologies"
        :key="technology.id"
        :technologi-id="technology.id"
        :title="technology.title"
        :checked-class="technology.checked ? 'checked' : ''"
        :type="'radio'"
        :name="'duration'"
        @pickTechnologi="pickTechnologi($event, technology.id)"
      >
        {{ technology.title }}
      </uTags>
    </form>
  </div>
</template>
<script>
// import TechnologyItem from "./technologyItem.vue";
import uTags from "~/components/atoms/uTags.vue";
export default {
  components: {
    uTags,
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
        { id: 1, checked: false, title: "1–2 days" },
        { id: 2, checked: false, title: "1 week" },
        { id: 3, checked: false, title: "Up to 2 weeks" },
        { id: 4, checked: true, title: "Up to 1 month" },
        { id: 5, checked: false, title: "More than 1 month" },
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
.technology-picker h2 {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 13px;
}
</style>
