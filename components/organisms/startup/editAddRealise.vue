<template>
  <div class="edit-add-realise">
    <div class="edit-add-realise__content">
      <div class="edit-add-realise__header">
        <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
        <div class="edit-add-realise__header--title">
          <UTitle :text="'New feedback'"></UTitle>
          <span>2</span>
        </div>
      </div>
      <FeedBackCard
        v-for="testimonial in 1"
        :key="testimonial.id"
        :comment="testimonial.comment"
        :author="testimonial.author"
        :published="testimonial.published_at"
        :is_expert="true"
        :u_button_blue="'Publish'"
        :u_button_gray="'Decline'"
      >
      </FeedBackCard>
      <FeedBackCard
        v-for="testimonial in 1"
        :key="testimonial.id"
        :comment="testimonial.comment"
        :author="testimonial.author"
        :published="testimonial.published_at"
        :is_expert="true"
        :u_button_blue="'Publish'"
        :u_button_gray="'Decline'"
        :activity_state="true"
        :show_feedback="false"
      >
      </FeedBackCard>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import FeedBackCard from "~/components/molecules/feedBackCard.vue";

@Component({
  components: { UBack, UTitle, FeedBackCard },
})
export default class extends Vue {}
</script>
