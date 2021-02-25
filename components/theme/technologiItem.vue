<template>
  <label :for="technologiId" class="technologi-item" :class="checkedClass">
    {{ technologiName }}
    <input
      :id="technologiId"
      type="checkbox"
      @click.prevent="$emit('pickTechnologi', $event.target)"
    />
  </label>
</template>
<script>
export default {
  props: {
    technologiName: {
      type: String,
      default: "Java",
    },
    technologiId: {
      type: Number,
      default: Number,
    },
    checkedClass: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.technologi-item {
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: #fff;
  font-weight: 300;
  font-size: 14px;
  padding: 10px 16px;
  border: 1px solid #59667e;
  box-sizing: border-box;
  border-radius: 32px;
  margin-right: 8px;
  margin-bottom: 14px;
  background: rgba(89, 102, 126, 0);
  transition: 0.2s;

  input {
    position: absolute;
    z-index: -1;
    top: 5px;
    left: 22px;
    height: 0;
    width: 0;
  }
}
.checked {
  background: rgba(89, 102, 126, 1);
}
</style>
