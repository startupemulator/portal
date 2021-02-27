<template>
  <div>
    <app-header></app-header>
    <div class="createProgect">
      <create-prodgect></create-prodgect>
      <buttons-next-draft></buttons-next-draft>
    </div>
    <app-footer></app-footer>

    <!-- <buttons-next-draft  v-if="device"></buttons-next-draft> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import AppFooter from "~/components/appFooter.vue";
import appHeader from "~/components/appHeader.vue";
import ButtonsNextDraft from "~/components/createProgect/buttonsNextDraft.vue";
import CreateProdgect from "~/components/createProgect/createProdgect.vue";
export default {
  components: {
    appHeader,
    AppFooter,
    CreateProdgect,
    ButtonsNextDraft,
  },
  computed: {
    ...mapState(["applyToTeam", "device"]),
    step: (state) => state.applyToTeam.stepOne,
  },
};
</script>
