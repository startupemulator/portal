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
        @pick="pickTechnologi(technology.id)"
      >
      </uTags>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import { Estimation } from "../../models/Estimation";
import uTags from "~/components/atoms/uTags.vue";

@Component({
  components: { uTags },
})
export default class extends Vue {
  @Prop({ default: " " }) title: String;
  @Prop() duration: String | Number;
  @Prop() estimations: Array<Estimation>;

  pickTechnologi(i) {
    this.estimations.forEach((el) => {
      if (i === el.id) {
        this.$emit("clickOnDuration", el);
      }
    });
  }

  @Watch("duration")
  changeDuration() {
    console.log(this.duration);
    const dataMatch = this.estimations.filter(
      (el) => el.value === +this.duration
    );
    this.$refs.utags.children.forEach((element, i) => {
      element.classList.remove("checked");
    });
    if (dataMatch.length !== 0) {
      this.$refs.utags.children.forEach((element, i) => {
        if (i + 1 === dataMatch[0].id) {
          element.classList.add("checked");
        }
      });
    }
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
