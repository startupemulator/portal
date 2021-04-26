<template>
  <div class="technology-picker">
    <h2>{{ title }}</h2>
    <form ref="utags">
      <uTags
        v-for="technology in estimations"
        :id="technology.id"
        :key="technology.id"
        :title="technology.title"
        :checked-class="technology.checked ? 'checked' : ''"
        :type="'radio'"
        :name="'duration'"
        @pick="pickTechnologi($event.currentTarget, technology.id)"
      >
      </uTags>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import uTags from "~/components/atoms/uTags.vue";
import { Estimations } from "~/models/Estimations";

@Component({
  components: { uTags },
})
export default class extends Vue {
  @Prop({ default: " " }) title: String;
  @Prop() duration: String;
  @Prop() estimations: Array<Estimations>;

  pickTechnologi(item, i) {
    //   this.$emit("aeb");
    this.$refs.utags.children.forEach((element) => {
      element.classList.remove("checked");
    });
    this.estimations.forEach((el) => {
      if (i === el.id) {
        item.parentNode.classList.add("checked");

        this.$emit("clickOnDuration", el);
      }
    });
  }

  mounted() {
    if (this.duration) {
      this.estimations.forEach((el) => {
        if (el.value === this.duration) {
          this.$refs.utags.children[el.id - 1].classList.add("checked");
        }
      });
    }
  }
}
</script>
<style lang="scss">
.technology-picker h2 {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 13px;
}
</style>
