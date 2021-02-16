<template>
<div class="createaccount-fullscreen">
<app-header :logined="false"></app-header>
    
    <log-in></log-in>
    <app-footer></app-footer>
</div>
</template>

<script>
import AppHeader from '@/components/appHeader.vue'
import LogIn from '@/components/acc/logIn.vue'
import AppFooter from '~/components/appFooter.vue'

export default {
    components:{
        AppHeader,
        AppFooter,
        LogIn
    }
}
</script>

<style lang="scss" scoped>
.createaccount-fullscreen{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
}
</style>