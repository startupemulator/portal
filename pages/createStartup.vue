<template>
  <div>
    <div class="createProject">
      <create-prodgect></create-prodgect>
    </div>
  </div>
</template>
<script>
import CreateProdgect from "~/components/organisms/startups/createProject.vue";
export default {
  components: {
    CreateProdgect,
  },
  middleware: ["deny-unauthenticated"],
};
</script>
