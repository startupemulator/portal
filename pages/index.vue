<template>
<div>
    <app-header></app-header>
    <app-get-experience></app-get-experience>
    <app-startups-block></app-startups-block>
    <app-challenges-block></app-challenges-block>
    <app-team-develop></app-team-develop> 
    <app-take-part></app-take-part>
    <app-top-startups></app-top-startups> 
    <app-practicants></app-practicants>
    <app-footer> </app-footer> 

    
</div>
</template>

<script>
import AppHeader from '@/components/appHeader.vue'
import AppGetExperience from '@/components/appGetExperience.vue'
import AppStartupsBlock from '@/components/appStartupsBlock.vue'
import AppChallengesBlock from '@/components/appChallengesBlock.vue'
import AppTeamDevelop from '~/components/appTeamDevelop.vue'
import AppTakePart from '~/components/appTakePart.vue'
import AppTopStartups from '~/components/appTopStartups.vue'
import AppPracticants from '~/components/appPracticants.vue'
import AppFooter from '~/components/appFooter.vue'

export default {
    components:{
        AppHeader,
        AppGetExperience,
        AppStartupsBlock,
        AppChallengesBlock,
        AppTeamDevelop,
        AppTakePart,
        AppTopStartups,
        AppPracticants,
        AppFooter
    }
}
</script>

<style >


</style> 