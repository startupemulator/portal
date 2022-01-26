<template>
  <div>
    <div class="createProject">
      <Create-Challenge
        :specialisations="Challenge.specialisations"
        :sources="Challenge.sources"
        @createSource="createSource"
        @removeSource="removeSource"
        @updateSource="updateSource"
        @pickSpecialisation="pickSpecialisation($event)"
        @publishChallenge="publishChallenge"
      ></Create-Challenge>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Spinner from "../../../store/modules/Spinner";
import CreateChallenge from "~/components/organisms/challenges/createChallenge.vue";
import { Challenge } from "~/store";

@Component({
  components: {
    CreateChallenge,
  },
  middleware: ["access-garden-keeper"],
})
export default class extends Vue {
  Challenge;
  constructor() {
    super();
    this.Challenge = Challenge;
  }

  async asyncData(context) {
    await Challenge.init(context);
  }

  createSource() {
    Challenge.createSource();
  }

  removeSource(i) {
    Challenge.removeSource(i);
  }

  updateSource({ title, link, positionLink }) {
    Challenge.updateSource({ title, link, positionLink });
  }

  pickSpecialisation(id) {
    Challenge.pickSpecialisation(id);
  }

  async publishChallenge({
    challengeName,
    challengeDescription,
    difficultyLevel,
    specialisation,
    status,
  }) {
    Spinner.show();
    await Challenge.createChallenge({
      context: this,
      challengeName,
      challengeDescription,
      difficultyLevel,
      specialisation,
      status,
    });

    if (Challenge.challenge.length !== 0) {
      this.$router.push(`/challenge/${Challenge.challenge.slug}`);
    }
    Spinner.hide();
  }
}
</script>
