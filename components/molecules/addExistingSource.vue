<template>
  <div class="existing-sources">
    <p>{{ name }}</p>
    <div class="existing-sources__link-name">
      <div class="link-name__inputs">
        <U-Input
          :type="'text'"
          :placeholder="'Enter a link name'"
          :value="title"
          :account-class="$v.title.$error ? ' error' : ''"
          @textInput="inputlinkName($event)"
        ></U-Input>
        <p v-show="$v.title.$error" class="errorInput">
          Please enter a link name of at least 4 characters
        </p>
        <U-Input
          :type="'text'"
          :placeholder="'https://...'"
          :value="link.trim()"
          :account-class="$v.link.$error ? ' error' : ''"
          @textInput="inputUrl($event)"
        ></U-Input>
        <p v-show="$v.link.$error" class="errorInput">Please enter a link</p>
      </div>
      <button
        class="button-remove-link"
        type="button"
        @click="$emit('removeSource')"
      >
        <img src="~/assets/img/close.svg" alt="" />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { url, minLength, required } from "vuelidate/lib/validators";
import UInput from "../atoms/uInput.vue";

@Component({
  components: { UInput },
  validations: {
    link: {
      minLength: url,
    },
    title: {
      required,
      minLength: minLength(4),
    },
  },
})
export default class extends Vue {
  @Prop() name: String;
  @Prop() linkName!: String;
  @Prop() linkHref!: String;
  link = this.linkHref ? this.linkHref : "";
  title = this.linkName ? this.linkName : "";
  inputUrl(e) {
    this.link = e.trim();
    this.$v.$touch();
    this.emitSourses();
  }

  inputlinkName(e) {
    this.title = e.trim();
    this.$v.$touch();
    this.emitSourses();
  }

  emitSourses() {
    if (!this.$v.$error) {
      this.$emit("updateSource", { title: this.title, link: this.link });
    }
  }
}
</script>
<style lang="scss">
.existing-sources__link-name {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 340px;

  .errorInput {
    top: 0;
  }

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
