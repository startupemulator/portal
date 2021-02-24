<template>
  <h2>{{ text }}</h2>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/css/variables.scss";
h2 {
  font-weight: bold;
  margin: 0 auto;
  font-size: 36px;
  line-height: 40px;
  color: $main-text-color;
  margin-top: 22px;
  margin-bottom: 33px;
}
@media (min-width: 768px) {
  h2 {
    font-weight: bold;
    font-size: 56px;
    line-height: 64px;
    margin-top: 54px;
    margin-bottom: 40px;
  }
}
</style>
