<template>
<div class="createaccount-fullscreen" >
<app-header :logined="false"></app-header>
    
    <create-account></create-account>
    <app-footer :mobileBottomButton="false"></app-footer>
   
</div>
</template>

<script>
import AppHeader from '@/components/appHeader.vue'
import CreateAccount from '@/components/acc/createAccount.vue'
import AppFooter from '~/components/appFooter.vue'

export default {
    components:{
        AppHeader,
        AppFooter,
        CreateAccount
    }
}
</script>

<style lang="scss" scoped>
.createaccount-fullscreen{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    
}

</style>