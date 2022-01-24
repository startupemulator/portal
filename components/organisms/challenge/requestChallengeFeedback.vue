<template>
  <div class="request-feedback">
    <U-Back :is-button="true" @clikOnButton="$emit('clikOnButton')"></U-Back>
    <U-Title :text="'Request feedback'"></U-Title>
    <p>
      Add all the specialities that you need in your team. During reviewing
      candidates you will be able to accept as much candidates as you need for
      each speciality.
    </p>
    <div v-for="(source, i) in sourceComponent" :key="source.id">
      <Source
        :name="'Link ' + (i + 1)"
        :link-href="source.link"
        :link-name="source.title"
        @removeSource="removeSource({ sourcePosition: i })"
        @updateSource="updateSource($event, i)"
      ></Source>
    </div>
    <p v-show="$v.haveASolution.$error" class="errorInput link">
      Please add solution link
    </p>
    <U-Button
      :button-name="'Add Link'"
      :button-class="'u-button-blue add-link'"
      @clickOnButton="addSource"
    ></U-Button>
    <Technology-Picker
      :title="'Pick technologies you used'"
      :add-technology="true"
      :technologies="userTechnologies"
      @chosenTechnologi="chosenTechnologi"
      @removeTechnology="removeTechnology"
      @addTechnologies="addTechnologies"
    ></Technology-Picker>
    <p v-show="$v.technologyIsAdded.$error" class="errorInput">
      Please choose a technologies
    </p>
    <div class="request-feedback__comment">
      <p>Comment</p>
      <textarea
        v-model="commentToExpert"
        placeholder="Enter your comment to our experts"
        :class="$v.commentToExpert.$error ? 'error' : ''"
      ></textarea>
      <p v-show="$v.commentToExpert.$error" class="errorInput">
        Please enter a comment to expert of at least 8 characters
      </p>
    </div>
    <div class="request-feedback__finished-challenge">
      <input
        id="finished-challenge"
        type="checkbox"
        @click="finishChallenge($event.target)"
      />
      <label for="finished-challenge">I’ve finished this challenge</label>
    </div>
    <p v-show="$v.challengeFinished.$error" class="errorInput">
      Please check I’ve finished this challenge
    </p>
    <div class="request-feedback__button">
      <U-Button
        :button-name="'Submit'"
        :button-class="'u-button-blue'"
        @clickOnButton="submit"
      ></U-Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { sameAs, minLength, required } from "vuelidate/lib/validators";
import Spinner from "../../../store/modules/Spinner";
import { Profile } from "~/models/Profile";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import Source from "~/components/molecules/addExistingSource.vue";
import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import { Technology } from "~/models/Technology";
import Toast from "~/store/modules/Toast";

@Component({
  components: {
    UButton,
    UTitle,
    UBack,
    Source,
    TechnologyPicker,
  },
  validations: {
    technologyIsAdded: {
      sameAs: sameAs(() => true),
    },
    commentToExpert: {
      required,
      minLength: minLength(8),
    },
    haveASolution: {
      sameAs: sameAs(() => true),
    },
    challengeFinished: {
      sameAs: sameAs(() => true),
    },
  },
})
export default class extends Vue {
  @Prop() userTechnologies: Array<Technology>;

  @Prop() profile: Array<Profile>;
  @Prop() challengeId: string;
  sourceComponent = [{ id: 0, link: "https://", name: "" }];
  commentToExpert = "";
  addedTechnologies = [];

  technologyIsAdded = false;
  challengeFinished = false;
  haveASolution = false;

  addSource() {
    this.sourceComponent.push({
      id: this.sourceComponent.length + 1,
      link: "https://",
      name: "",
    });
  }

  updateSource({ title, link }, i) {
    this.sourceComponent[i].title = title;
    this.sourceComponent[i].link = link;
    this.checkSolution();
  }

  removeSource({ sourcePosition }) {
    this.sourceComponent.splice(sourcePosition, 1);
  }

  chosenTechnologi({ item, id }) {
    this.$emit("pickTechnology", { item, id });
    this.checkTechnologies();
  }

  addTechnologies(data) {
    this.addedTechnologies.push({
      name: data,
    });
    this.checkSolution();
  }

  removeTechnology(data) {
    this.addedTechnologies = JSON.parse(JSON.stringify(data));
    this.checkTechnologies();
  }

  finishChallenge(item) {
    this.challengeFinished = item.checked;
  }

  checkSolution() {
    if (this.sourceComponent.length !== null) {
      this.sourceComponent.forEach((el) => {
        if (el.link !== "https://" && el.title !== "") {
          this.haveASolution = true;
        } else {
          this.haveASolution = false;
        }
      });
    }
  }

  checkTechnologies() {
    if (
      this.userTechnologies.some((el) => el.checked) ||
      this.addedTechnologies.length !== 0
    ) {
      this.technologyIsAdded = true;
    } else {
      this.technologyIsAdded = false;
    }
  }

  async submit() {
    this.checkTechnologies();
    this.checkSolution();

    this.$v.$touch();
    if (!this.$v.$error) {
      try {
        await Spinner.show();
        const technologyForAskFeedback: [string] = [];
        if (this.addedTechnologies.length !== 0) {
          for (const technology of this.addedTechnologies) {
            const newTechnology = await this.$createTechnologies(
              this.profile.user.id,
              technology.name
            );
            if (newTechnology !== null) {
              technologyForAskFeedback.push(newTechnology.id);
            }
          }
        }
        if (this.userTechnologies.length !== 0) {
          this.userTechnologies.forEach((technology) => {
            if (technology.checked) {
              technologyForAskFeedback.push(technology.id);
            }
          });
        }

        const requestFeedback = await this.$createAskFeedbackForChallenge(
          this.profile.user.id.toString(),
          this.commentToExpert,
          technologyForAskFeedback,
          this.challengeId
        );
        if (requestFeedback !== null) {
          for (const source of this.sourceComponent) {
            await this.$createSolution(
              source.name,
              source.link,
              requestFeedback.id
            );
          }

          Spinner.hide();
          this.$emit("submit");
        } else {
          Toast.show({
            data: "Something wrong!",
            duration: 3000,
          });
          Spinner.hide();
        }
      } catch (e) {
        console.error(e);
        Toast.show({
          data: e.message,
          duration: 3000,
        });
        Spinner.hide();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.request-feedback {
  width: 343px;
  margin: 0 auto;
  margin-top: 40px;

  .errorInput {
    margin-bottom: 0;
    top: 0;

    &.link {
      margin-bottom: 16px;
    }
  }

  h2 {
    margin-bottom: 12px;
  }

  p {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    margin-top: 12px;
    margin-bottom: 32px;
  }

  .u-button-blue.add-link {
    width: 340px;
    height: 40px;
    margin-bottom: 36px;
  }

  .request-feedback__comment {
    margin-top: 32px;

    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 8px;
    }

    textarea {
      width: 343px;
      height: 136px;
      background: #2e384a;
      border-radius: 12px;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      border: 2px solid transparent;
      padding: 8px 16px;
      box-sizing: border-box;
      color: #fff;

      &::placeholder {
        color: #b5c1d8;
      }

      &:focus {
        border: 2px solid #b5c1d8;
      }
    }
  }

  .request-feedback__button {
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
  }

  .request-feedback__finished-challenge {
    position: relative;
    margin-top: 32px;

    input {
      display: none;
    }

    label {
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      padding-left: 36px;
      cursor: pointer;

      &::before {
        position: absolute;
        left: 0;
        content: "";
        width: 24px;
        height: 24px;
        border: 2px solid #59667e;
        box-sizing: border-box;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    input:checked ~ label {
      &::after {
        cursor: pointer;
        position: absolute;
        left: 0;
        content: "";
        width: 24px;
        height: 24px;
        box-sizing: border-box;
        border-radius: 4px;
        background-color: #5e56f0;
        background-image: url("../../../assets/img/checked.svg");
        background-repeat: no-repeat;
        background-position: 50%;
      }
    }
  }
}
@media (min-width: 768px) {
  .request-feedback {
    width: 660px;
    margin-top: 48px;

    p {
      font-weight: normal;
      font-size: 17px;
      line-height: 24px;
      margin-bottom: 48px;
    }

    .u-button-blue.add-link {
      width: 121px;
      height: 48px;
      margin-bottom: 32px;
    }

    .technology-picker__title {
      margin-bottom: 12px;
    }

    .request-feedback__comment {
      p {
        font-weight: 500;
        font-size: 17px;
        line-height: 32px;
      }

      textarea {
        padding: 12px 24px;
        font-weight: normal;
        font-size: 18px;
        line-height: 28px;
        width: 660px;
        height: 136px;
      }
    }

    .request-feedback__button {
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
    }
  }
}
</style>
