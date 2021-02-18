<template>
 <div>
      <app-header :logined="true"></app-header>
       <div class="createProgect">
      <create-prodgect></create-prodgect>
      </div>
    <app-footer></app-footer>  
     </div>
    
</template>
<script>
import AppFooter from '~/components/appFooter.vue'
import appHeader from '~/components/appHeader.vue'
import CreateProdgect from '~/components/createProgect/createProdgect.vue'

export default {
  components: { 
      appHeader,
      AppFooter,
    CreateProdgect },
    
}
</script>