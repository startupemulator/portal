<template>
  <div class="buttons-next-draft">
    <button type="button" class="buttons-next" @click="nextStepOnCreateProdject">
      Next
    </button>
    <button
      type="button"
      class="buttons-draft"
      @click="saveDraftOnCreateProdject"
    >
      Save Draft
    </button>
  </div>
</template>
<script>
import { mapActions } from "vuex"
export default {
   methods:{
    ...mapActions(['nextStepOnCreateProdject', 'saveDraftOnCreateProdject'])
  },

};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.buttons-next-draft {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 92px;
  width: 100%;
  background: #232b39;
  border: 1px solid #3b465a;
  box-shadow: inset 0px 0px 10px 2px #262f3f;
  border-radius: 16px 16px 0px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  button{
      width: 163.5px;
height: 48px;
  }
  .buttons-next{
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
  .buttons-draft{
        background-color: $button-color-gray;
        &:hover {
            background-color: $button-color-gray-hover;
        }
        &:focus {
            background-color: $button-color-gray-focus
        }
        &:active {
            background-color: $button-color-gray-active
        }
    }
}
@media (min-width: 768px){
    .buttons-next-draft{
       
    width: 660px;
   border: none;
   border-radius: 0;
   background-color: transparent;
   box-shadow: none;
   border-top: 1px solid #3B465A;
   margin: 0 auto;
   margin-top: 34px;
   
     justify-content: space-between;
    button{
       width: 318px;
    height: 56px;
    margin-top: 24px;
    }
  }
}
</style>