<template>
  <div class="existing-sources">
    <p>{{ name }}</p>
    <div class="existing-sources__link-name">
      <div class="link-name__inputs">
        <U-input
          :type="'text'"
          :placeholder="'Enter a link name'"
          :value="linkName"
          @textInput="$emit('textInput', [$event, 'name'])"
        ></U-input>
        <U-input
          :type="'text'"
          :placeholder="'https://...'"
          :value="linkHref"
          @textInput="$emit('textInput', [$event, 'url'])"
        ></U-input>
      </div>
      <button
        class="button-remove-link"
        type="button"
        @click="$emit('removeExistingSources')"
      >
        <img src="~/assets/img/close.svg" alt="" />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UInput from "../atoms/uInput.vue";

@Component({
  components: { UInput },
})
export default class AppHeader extends Vue {
  @Prop() name: String;
  @Prop() linkName: String;
  @Prop() linkHref: String;
}
</script>
<style lang="scss">
.existing-sources__link-name {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 340px;
  label {
    width: 100%;
  }
  .button-remove-link {
    position: relative;
    background: transparent;
    margin-left: 10px;
    margin-top: 15px;
    right: -5px;
  }
  .link-name__inputs label {
    margin-bottom: 8px;
    display: inline-block;
    .standart-input {
      padding-left: 16px;
    }
  }
}
@media (min-width: 768px) {
  .existing-sources__link-name {
    width: 660px;
    label {
      width: 620px;
    }
  }
}
</style>
