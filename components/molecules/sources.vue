<template>
  <div class="startup-card__sources">
    <h3>Sources</h3>
    <div class="startup-card__sources--finished">
      <div class="startup-card__sources-repository">
        <div class="startup-card__sources-content">
          <div>
            <h5>Repository</h5>
            <p>repository.github.io</p>
          </div>
          <a
            target="_blank"
            href="repository.github.io"
            type="button"
            class="startup-card__sources-button"
          >
            <img src="~/assets/img/sources.svg" alt="sources" />
          </a>
        </div>
      </div>

      <div v-if="finished" class="startup-card__sources-design">
        <div class="startup-card__sources-content">
          <div>
            <h5>Design</h5>
            <p>figma.com/as2FKa313t1/aTYOa13</p>
          </div>
          <a
            target="_blank"
            href="figma.com/as2FKa313t1/aTYOa13"
            type="button"
            class="startup-card__sources-button"
          >
            <img src="~/assets/img/sources.svg" alt="sources" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
@Component({})
export default class extends Vue {
  @Prop() finished: Boolean;
}
</script>
