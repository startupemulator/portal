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
    // width: 375px;
    display: flex;
    justify-content: center ;
height: 92px;
background: #232B39;
border: 1px solid #3B465A;
box-shadow: inset 0px 0px 10px 2px #262F3F;
border-radius: 16px 16px 0px 0px;
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
</style>