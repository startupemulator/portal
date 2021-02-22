<template>
    <div class="button-next">
        
        <button type="button" @click="changeStepOnApplyToTeam">Next</button>
    </div>
</template>
<script>
import { mapActions} from "vuex";
export default {
  
      methods: {
      ...mapActions(["changeStepOnApplyToTeam"]),
    },
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.button-next{
display: flex;
justify-content: center ;
height: 92px;
background: #232B39;
border: 1px solid #3B465A;
box-shadow: inset 0 0 10px 2px #262F3F;
border-radius: 16px 16px 0 0;
position: fixed;
z-index: 2;
width: 100%;
bottom: 0;
button{
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
    width: 660px;
   border: none;
   border-radius: 0;
   background-color: transparent;
   box-shadow: none;
   border-top: 1px solid #3B465A;
   margin: 0 auto;
   margin-top: 24px;
   position: relative;
    button{
       width: 660px;
    height: 56px;
    }
  }
}
</style>