<template>
  <div class="createProgect-step3">
    <h2>Add existing sources</h2>
    <h3>
      Add links on design, userflows, repositories, etc., which will be used
      during the project’s development. You can skip this step for now.
    </h3>
    <div
      :is="item.type"
      v-for="(item, i) in existingSourseComponent"
      :key="item.id"
      :name="'Link ' + (i + 1)"
      @removeExistingSources="removeExistingSources(item.id)"
    ></div>
    <div class="existing-sources__add-link">
      <U-button
        :button-name="'Add Link'"
        :button-class="'u-button-blue'"
        @clickOnButton="addExistingSourse"
      ></U-button>
    </div>
    <div class="createProgect-step1__buttons">
      <U-button
        :button-name="'Next'"
        :button-class="'u-button-blue'"
        @clickOnButton="$emit('goToStepFour')"
      ></U-button>
      <U-button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
      ></U-button>
    </div>
  </div>
</template>
<script>
import UButton from "~/components/theme/uButton";
import AddExistingSourse from "~/components/theme/addExistingSourse";
export default {
  components: { UButton, AddExistingSourse },
  data() {
    return {
      existingSourseComponent: [
        { id: 1, type: "add-existing-sourse" },
        { id: 2, type: "add-existing-sourse" },
      ],
    };
  },
  methods: {
    addExistingSourse() {
      this.existingSourseComponent.push({
        id: this.existingSourseComponent.length + 1,
        type: "add-existing-sourse",
      });
    },
    removeExistingSources(i) {
      this.existingSourseComponent = this.existingSourseComponent.filter(
        (item) => item.id !== i
      );
    },
  },
};
</script>
