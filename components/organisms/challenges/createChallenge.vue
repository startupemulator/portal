<template>
  <div class="create-project__super-admin">
    <U-Back :link="'/profile/projects'"></U-Back>
    <U-Title
      :text="challenge === null ? 'Create a challenge' : 'Edit a challenge'"
    ></U-Title>
    <p>Challenge name</p>
    <input
      v-model.trim="$v.challengeName.$model"
      type="text"
      placeholder="Enter the challenge name"
      :class="$v.challengeName.$error ? ' error ' : ''"
    />

    <p v-show="$v.challengeName.$error" class="errorInput mt">
      Please enter a startup name of at least 8 characters
    </p>
    <p>Description</p>
    <textarea
      v-model.trim="$v.challengeDescription.$model"
      :class="$v.challengeDescription.$error ? ' error' : ''"
      placeholder="Provide a full description of the task"
    ></textarea>
    <p v-show="$v.challengeDescription.$error" class="errorInput">
      Please enter a description name of at least 8 characters
    </p>
    <Difficulty-Level-Picker
      :checked-difficulty-level="difficultyLevel"
      @difficultyLevelId="difficultyLevelId"
    ></Difficulty-Level-Picker>
    <p v-show="$v.difficultyLevel.$error" class="errorInput">
      Please choose difficulty level
    </p>
    <p>Pick specialization this task is for</p>
    <Specialization-Picker
      :specialisations="specialisations"
      :choosen-specialisation="
        challenge !== null ? challenge.specialisations : null
      "
      @pickSpecialisation="$emit('pickSpecialisation', $event)"
    ></Specialization-Picker>
    <p v-show="$v.specialisation.$error" class="errorInput">
      Please choose specialisations
    </p>

    <div v-for="(source, i) in sources" :key="source.id">
      <Source-Link
        :name="'Link ' + (i + 1)"
        :link-name="source.title"
        :link-href="source.link"
        @removeSource="removeSource(i)"
        @updateSource="updateSource($event, i)"
      ></Source-Link>
    </div>
    <U-Button
      :button-name="'Add Link'"
      :button-class="'u-button-blue add-link'"
      @clickOnButton="createSource"
    ></U-Button>
    <p v-show="$v.sources.$error" class="errorInput mt">
      Please add source link
    </p>
    <p v-show="isEmptySource" class="errorInput mt">
      Please fill in all the fields
    </p>

    <div class="create-project__super-admin_button">
      <U-Button
        :button-name="'Publish'"
        :button-class="'u-button-blue'"
        @clickOnButton="publishChallenge"
      ></U-Button>
      <U-Button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
        @clickOnButton="saveDraft"
      ></U-Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

import { required, minLength } from "vuelidate/lib/validators";
import Toast from "../../../store/modules/Toast";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import UInput from "~/components/atoms/uInput.vue";
import DifficultyLevelPicker from "~/components/atoms/difficultyLevelPicker.vue";
import SourceLink from "~/components/molecules/addExistingSource.vue";
import { Specialisation } from "~/models/Specialisation";
import { Challenge } from "~/models/Challenge";
import SpecializationPicker from "~/components/molecules/specializationPicker.vue";
import { Sources } from "~/models/Sources";

@Component({
  components: {
    UButton,
    UTitle,
    UBack,
    UInput,
    SourceLink,
    DifficultyLevelPicker,
    SpecializationPicker,
  },
  validations: {
    challengeName: {
      required,
      minLength: minLength(4),
    },
    challengeDescription: {
      minLength: minLength(10),
      required,
    },
    difficultyLevel: {
      required,
    },
    specialisation: {
      required,
    },
    sources: {
      required,
    },
  },
})
export default class extends Vue {
  @Prop() specialisations: Specialisation[];
  @Prop() sources: Sources[];
  @Prop({ default: null }) challenge!: Array<Challenge>;

  challengeName = this.challenge === null ? "" : this.challenge.title;
  challengeDescription =
    this.challenge === null ? "" : this.challenge.description;

  difficultyLevel = this.challenge === null ? " " : this.challenge.difficulty;
  specialisation = [];
  isEmptySource = false;
  createSource() {
    this.$emit("createSource");
  }

  removeSource(i) {
    this.$emit("removeSource", i);
  }

  updateSource({ title, link }, i) {
    this.$emit("updateSource", { title, link, positionLink: i });
  }

  inputedChallengeName(data) {
    this.challengeName = data;
  }

  difficultyLevelId(data) {
    this.difficultyLevel = data.toString();
  }

  publishChallenge(status = "new") {
    this.sources.forEach((source) => {
      if (source.title.length < 4 || source.link.length < 11) {
        this.isEmptySource = true;
      } else {
        this.isEmptySource = false;
      }
    });
    this.specialisation = [];
    this.specialisations.forEach((specialisation) => {
      if (specialisation.checked) {
        this.specialisation.push(specialisation.id);
      }
    });
    this.$v.$touch();
    if (!this.isEmptySource && !this.$v.$error) {
      this.$emit("publishChallenge", {
        challengeName: this.challengeName,
        challengeDescription: this.challengeDescription,
        difficultyLevel: this.difficultyLevel,
        specialisation: this.specialisation,
        status,
      });
    }
  }

  saveDraft() {
    this.publishChallenge("draft");
  }
}
</script>
<style lang="scss">
.create-project__super-admin {
  color: #fff;
  max-width: 660px;
  margin: 0 auto;
  margin-top: 40px;

  .errorInput {
    top: 0;

    &.mt {
      top: 16px;
    }
  }

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }

  textarea {
    background: #2e384a;
    border-radius: 12px;
    width: 343px;
    min-height: 48px;
    padding: 8px 16px;
    box-sizing: border-box;
    color: #fff;
    outline: none;
    font-weight: normal;
    font-size: 16px;
    margin-bottom: 21px;
    border: 2px solid transparent;

    &:focus {
      border: 2px solid #b5c1d8;
    }

    &::placeholder {
      color: #b5c1d8;
    }
  }

  .create-project__super-admin-progress-bar {
    position: relative;
    max-width: 660px;
    height: 12px;
    border: 1px solid #4e5a71;
    box-sizing: border-box;
    box-shadow: inset 2px -1px 8px rgba(78, 100, 141, 0.5);
    border-radius: 16px;
    background: #232b39;

    .create-project__super-admin__progress-bar--progress {
      position: relative;
      top: -1px;
      left: -1px;
      background: #6295fc;
      box-shadow: -2px 0 8px rgba(98, 149, 252, 0.8),
        2px 0 8px rgba(98, 149, 252, 0.8);
      border-radius: 14px;
      height: 12px;
      width: 30%;
      transition: 0.2s;
    }
  }

  .create-project__super-admin_button {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 16px 16px 28px 16px;
    background: #232b39;
    border: 1px solid #3b465a;
    box-shadow: inset 0 0 10px 2px #262f3f;
    border-radius: 16px 16px 0 0;
    box-sizing: border-box;
    width: 100%;
    display: flex;

    .u-button-gray {
      margin-left: 16px;
    }
  }
}
@media (min-width: 768px) {
  .create-project__super-admin {
    p {
      font-weight: 500;
      font-size: 17px;
      line-height: 32px;
    }

    .standart-label .standart-input {
      padding-left: 24px;
    }

    .create-project__super-admin_button {
      position: static;
      border: none;
      border-top: 1px solid #3b465a;
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 36px 0;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      margin-top: 32px;

      .u-button-gray {
        margin-left: 24px;
      }
    }

    textarea {
      width: 660px;
      min-height: 136px;
      font-weight: normal;
      font-size: 18px;
      padding: 12px 24px;
    }

    .add-link {
      width: 121px;
      height: 48px;
      margin-top: 16px;
    }
  }
}
</style>
