<template>
<div>
    <app-header></app-header>
    <app-get-experience></app-get-experience>
    <app-startups-block></app-startups-block>
    <app-challenges-block></app-challenges-block>
</div>
</template>

<script>
import AppHeader from '@/components/appHeader.vue'
import AppGetExperience from '@/components/appGetExperience.vue'
import AppStartupsBlock from '@/components/appStartupsBlock.vue'
import AppChallengesBlock from '@/components/appChallengesBlock.vue'

export default {
  components: {
    AppHeader,
    AppGetExperience,
    AppStartupsBlock,
    AppChallengesBlock
  },
  async asyncData(context) {
    try {
      const challenges = await context.$strapi.find('challenges');
      console.warn(challenges);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style lang,
        AppStartupsBlock
        AppGetExperience="scss">


</style>
