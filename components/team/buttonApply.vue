<template>
  <div class="button-next">
    <button type="button" @click="applyStartUp">Apply</button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["applyStartUp"]),
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.button-next {
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 92px;
  background: #232b39;
  border: 1px solid #3b465a;
  box-shadow: inset 0 0 10px 2px #262f3f;
  border-radius: 16px 16px 0 0;
  button {
    margin-top: 16px;
    width: 343px;
    height: 48px;
    background-color: $button-color-blue;
    &:hover {
      background-color: $button-color-blue-hover;
    }
    &:focus {
      background-color: $button-color-blue-focus;
    }
    &:active {
      background-color: $button-color-blue-active;
    }
  }
}
@media (min-width: 768px){
  .button-next{
    position: relative;
    width: 660px;
   border: none;
   height: 89px;
   border-radius: 0;
   background-color: transparent;
   box-shadow: none;
   border-top: 1px solid #3B465A;
   margin: 0 auto;
   margin-top: 30px;
    button{
       width: 660px;
    height: 56px;
    margin-top: 35px;
    }
  }
}
</style>