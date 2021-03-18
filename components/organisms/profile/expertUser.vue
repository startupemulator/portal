<template>
  <div class="expert-user">
    <div class="profile-projects">
      <div class="profile-projects__header">
        <h3>Feedbacks</h3>
        <div class="profile-projects__header-project-quantity">
          <span>{{ testimonials.length }}</span>
        </div>
      </div>
      <feed-back-card
        v-for="testimonial in testimonials"
        :key="testimonial.id"
        :comment="testimonial.comment"
        :author="testimonial.author"
        :published="testimonial.published_at"
      ></feed-back-card>
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
  @Prop() testimonials: Array<Testimonial>;
}
</script>
