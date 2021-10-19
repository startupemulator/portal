<template>
  <div class="create-project__super-admin">
    <UBack :link="'/profile/projects'"></UBack>
    <UTitle
      :text="challenge === null ? 'Create a challenge' : 'Edit a challenge'"
    ></UTitle>
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
    <DifficultyLevelPicker
      :key="updateKey + 'difficultyLevel'"
      :checked-difficalty-level="difficultyLevel"
      @difficultyLevelId="difficultyLevelId"
    ></DifficultyLevelPicker>
    <p v-show="$v.difficultyLevel.$error" class="errorInput">
      Please choose difficulty level
    </p>
    <p>Pick specialization this task is for</p>

    <SpecializationPicker
      :specialisations="specialisations"
      :choosen-specialisation="
        challenge !== null ? challenge.specialisations : null
      "
      @pickSpecialisation="pickedSpecialisation"
    ></SpecializationPicker>
    <p v-show="$v.specialisation.$error" class="errorInput">
      Please choose specialisations
    </p>
    <div
      :is="item.type"
      v-for="(item, i) in existingSourseComponent"
      :key="item.id"
      :name="'Source Link ' + (i + 1)"
      :link-name="item.title"
      :link-href="item.link"
      @removeExistingSources="removeExistingSources(item.id)"
      @textInput="textInput($event, i, item.id)"
    ></div>

    <U-button
      :button-name="'Add Link'"
      :button-class="'u-button-blue add-link'"
      @clickOnButton="addExistingSourse"
    ></U-button>
    <p v-show="$v.existingSourseComponent.$error" class="errorInput mt">
      Please add source link
    </p>
    <div class="create-project__super-admin_button">
      <U-button
        :button-name="'Publish'"
        :button-class="'u-button-blue'"
        @clickOnButton="publishChallenge"
      ></U-button>
      <U-button
        :button-name="'Save Draft'"
        :button-class="'u-button-gray'"
        @clickOnButton="saveDraft"
      ></U-button>
    </div>
    <Spiner></Spiner>
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
import Spiner from "~/components/molecules/spiner.vue";
import DifficultyLevelPicker from "~/components/atoms/difficultyLevelPicker.vue";
import AddExistingSourse from "~/components/molecules/addExistingSource.vue";
import { Specialisation } from "~/models/Specialisation";
import { Challenge } from "~/models/Challenge";
import SpecializationPicker from "~/components/molecules/specializationPicker.vue";

@Component({
  components: {
    UButton,
    UTitle,
    UBack,
    UInput,
    Spiner,
    AddExistingSourse,
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
    existingSourseComponent: {
      required,
    },
  },
})
export default class extends Vue {
  @Prop() specialisations: Array<Specialisation>;
  @Prop({ default: null }) challenge: Array<Challenge>;
  loading = false;

  existingSourseComponent = [{ id: `1`, type: "add-existing-sourse" }];

  createdSources = [];
  updateKey = 1;
  challengeName = "";
  challengeDescription = "";
  difficultyLevel = " ";
  specialisation = [];
  addExistingSourse() {
    this.existingSourseComponent.push({
      id: this.existingSourseComponent.length + 1,
      type: "add-existing-sourse",
    });
  }

  removeExistingSources(i) {
    this.existingSourseComponent = this.existingSourseComponent.filter(
      (item) => item.id !== i
    );
  }

  inputedChallengeName(data) {
    this.challengeName = data;
  }

  difficultyLevelId(data) {
    this.difficultyLevel = data.toString();
  }

  pickedSpecialisation(data) {
    const specialisation = this.specialisation.includes(data.id);
    if (specialisation) {
      this.specialisation.splice(
        this.specialisation.findIndex((el) => el === data.id),
        1
      );
    } else {
      this.specialisation.push(data.id);
    }
  }

  textInput($event, i, id) {
    switch ($event[1]) {
      case "name":
        this.existingSourseComponent[i].title = $event[0];
        break;
      case "url":
        this.existingSourseComponent[i].link = $event[0];
        break;
      default:
    }
  }

  async createSources() {
    for (const item of this.existingSourseComponent) {
      if (item.title !== undefined && item.link !== undefined) {
        try {
          const createdSource = await this.$createSourceForChallenge(
            item.title,
            item.link
          );
          if (createdSource !== null) {
            this.createdSources.push(createdSource.id);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    this.createNewChallenge();
  }

  async createNewChallenge() {
    this.$v.$touch();
    if (!this.$v.$error) {
      if (this.challenge !== null) {
        try {
          const updateChallenge = await this.$updateChallenge(
            this.challenge.id,
            this.challengeName,
            this.challengeDescription,
            this.difficultyLevel,
            this.specialisation,
            this.createdSources
          );
          if (updateChallenge !== null) {
            this.$router.push("/challenge/" + updateChallenge.slug);
          }
        } catch (e) {
          console.error(e);
          Toast.show({
            data: "Something wrong.",
            duration: 3000,
          });
        }
      } else {
        try {
          const newChallenge = await this.$createChallenge(
            this.challengeName,
            this.challengeDescription,
            this.difficultyLevel,
            this.specialisation,
            this.createdSources
          );
          if (newChallenge !== null) {
            this.$router.push("/challenge/" + newChallenge.slug);
          }
        } catch (e) {
          console.error(e);
          Toast.show({
            data: "Something wrong.",
            duration: 3000,
          });
        }
      }
    }
  }

  async publishChallenge() {
    this.$v.$touch();
    if (!this.$v.$error) {
      this.loading = true;
      try {
        await this.createSources();
        this.loading = false;
      } catch (e) {
        console.error(e);
        this.loading = false;
        Toast.show({
          data: "Something wrong.",
          duration: 3000,
        });
      }
    }
  }

  saveDraft() {
    console.log("do somthing");
  }

  mounted() {
    if (this.challenge) {
      this.difficultyLevel = this.challenge.difficulty.toString();
      this.updateKey += 1;
      this.challengeName = this.challenge.title;
      this.challengeDescription = this.challenge.description;

      this.existingSourseComponent = [];
      this.challenge.sources.forEach((el) => {
        this.existingSourseComponent.push({
          id: el.id,
          type: "add-existing-sourse",
          link: el.link.trim(),
          title: el.title,
        });
      });
    }
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
