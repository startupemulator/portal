<template>
  <div class="project-participant">
    <p>{{ position || "Product Owners" }}</p>
    <div v-if="!isOwner" style="display: flex; flex-wrap: wrap">
      <div
        v-for="user in acceptedTeamMember"
        :key="user.name"
        class="specializacion_names"
      >
        <nuxt-link
          class="project-participant__team-button"
          :to="'/user/' + user.user.profile.slug"
        >
          <span>{{ user.user ? user.user.username : "" }}</span>
          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </nuxt-link>
      </div>
    </div>
    <div class="project-participant_technologies">
      <UTags
        v-for="technology in technologies"
        :key="technology.id + '-' + 'participant-technologies'"
        :technologi-id="technology.id"
        :title="technology.title"
      ></UTags>
    </div>
    <div v-if="isOwner">
      <div class="specializacion_names">
        <nuxt-link
          class="project-participant__team-button"
          :to="'/user/' + username.profile.slug"
        >
          <span>{{ username.username }}</span>

          <img src="~/assets/img/arrow.svg" alt="arrow" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UBack from "~/components/atoms/uBack.vue";
import UTags from "~/components/atoms/uTags.vue";
import UButton from "~/components/atoms/uButton.vue";

@Component({
  components: { UBack, UTags, UButton },
})
export default class AppHeader extends Vue {
  @Prop() position: String;
  @Prop() username: Array<any>;
  @Prop() isOwner: boolean;
  technologies = [];
  acceptedTeamMember = [];
  mounted() {
    if (this.username.length !== undefined) {
      this.username.forEach((item) => {
        if (item.status === "advanced" || item.status === "accepted") {
          this.acceptedTeamMember.push(item);
        }
        item.user.profile.technologies.forEach((el) => {
          this.technologies.push(el);
        });
      });
      this.technologies = this.technologies.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );
    }
  }
}
</script>

<style lang="scss" scoped>
.project-participant {
  padding-bottom: 24px;
  border-bottom: 1px solid #4e5a71;
  p {
    margin-top: 16px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  .project-participant__team-button {
    display: flex;
    align-items: center;
    padding: 4px 16px;
    background: #2e384a;
    box-shadow: 0 8px 24px rgba(28, 35, 48, 0.2);
    border-radius: 12px;
    span {
      font-weight: normal;
      font-size: 16px;
      line-height: 32px;
      color: #fff;
    }
    img {
      margin-left: 16px;
    }
  }
  .specializacion_names {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
    .project-participant__team-button {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
  .project-participant_technologies {
    .technology-item {
      color: #b5c1d8;
      font-weight: normal;
      font-size: 14px;
      line-height: 32px;
      padding: 0 16px;
      margin-bottom: 8px;
    }
  }
}
.project-participant:last-child {
  border-bottom: 1px solid transparent;
}
@media (min-width: 768px) {
  .project-participant {
    padding-bottom: 0;
  }
}
</style>
