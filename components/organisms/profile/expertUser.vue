<template>
  <div class="expert-user">
    <div class="profile-projects">
      <div class="profile-projects__header">
        <h3>Feedbacks</h3>
        <!-- {{ testimonial }} -->
        <div class="profile-projects__header-project-quantity">
          <span>{{ testimonial.length }}</span>
          <feed-back-card></feed-back-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Testimonial } from "~/models/Testimonial";
import FeedBackCard from "~/components/molecules/feedBackCard.vue";

@Component({
  components: { FeedBackCard },
})
export default class extends Vue {
  @Prop() testimonial: Array<Testimonial>;
}
</script>
