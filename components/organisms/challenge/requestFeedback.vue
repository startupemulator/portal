<template>
  <div class="request-feedback">
    <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
    <UTitle :text="'Request feedback'"></UTitle>
    <p>
      Add all the specialities that you need in your team. During reviewing
      candidates you will be able to accept as much candidates as you need for
      each speciality.
    </p>
    <div
      :is="item.type"
      v-for="(item, i) in existingSourseComponent"
      :key="item.id"
      :name="'Link ' + (i + 1)"
      :link="item.link"
      :title="item.title"
      @removeExistingSources="removeExistingSources(item.id)"
      @textInput="inputLink($event, i, item.id)"
    ></div>
    <p v-show="$v.haveASolution.$error" class="errorInput link">
      Please add solution link
    </p>
    <U-button
      :button-name="'Add Link'"
      :button-class="'u-button-blue add-link'"
      @clickOnButton="addExistingSourse"
    ></U-button>

    <TechnologyPicker
      :title="'Pick technologies you used'"
      :add-technology="true"
      :technologies="profile.technologies"
      @chosenTechnologi="chosenTechnologi"
      @addTechnologies="addTechnologies"
    ></TechnologyPicker>
    <p v-show="$v.addedTechnologies.$error" class="errorInput">
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
    <div class="request-feedback__finished-challenge" @click="finishChallenge">
      <input id="finished-challenge" ref="finishedChallenge" type="checkbox" />
      <label for="finished-challenge">I’ve finished this challenge</label>
    </div>
    <p v-show="$v.challengeFinished.$error" class="errorInput">
      Please check I’ve finished this challenge
    </p>
    <div class="request-feedback__button">
      <U-button
        :button-name="'Submit'"
        :button-class="'u-button-blue'"
        @clickOnButton="submit"
      ></U-button>
    </div>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { sameAs, minLength, required } from "vuelidate/lib/validators";
import { Profile } from "~/models/Profile";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import AddExistingSourse from "~/components/molecules/addExistingSource.vue";
import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import Spiner from "~/components/molecules/spiner.vue";
import Toast from "~/store/modules/Toast";

@Component({
  components: {
    UButton,
    UTitle,
    UBack,
    AddExistingSourse,
    TechnologyPicker,
    Spiner,
  },
  validations: {
    addedTechnologies: {
      required,
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
  existingSourseComponent = [{ id: 0, type: "add-existing-sourse" }];

  commentToExpert = "";
  addedTechnologies = [];
  addedNewTechnologies = [];
  challengeFinished = false;
  haveASolution = false;
  loading = false;
  @Prop() profile: Array<Profile>;
  @Prop() challengeId: string;

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
    this.haveASolution = true;
  }

  chosenTechnologi(name, id) {
    this.addedTechnologies = id;
  }

  addTechnologies(data) {
    this.addedNewTechnologies = data;
  }

  inputLink($event, i, id) {
    switch ($event[1]) {
      case "name":
        this.existingSourseComponent[i].title = $event[0];
        break;
      case "url":
        this.existingSourseComponent[i].url = $event[0];
        break;
      default:
    }
  }

  async createSolution(title, url, request) {
    try {
      await this.$createSolution(title, url, request);
    } catch (e) {
      console.error(e);
    }
  }

  finishChallenge() {
    this.challengeFinished = this.$refs.finishedChallenge.checked;
  }

  async submit() {
    this.finishChallenge();
    this.existingSourseComponent.forEach((el) => {
      if (el.url !== undefined && el.title !== undefined) {
        this.haveASolution = true;
      } else {
        this.haveASolution = false;
      }
    });
    this.$v.$touch();

    if (!this.$v.$error) {
      try {
        this.loading = true;
        const requestFeedback = await this.$createAskFeedbackForChallenge(
          this.profile.user.id.toString(),
          this.commentToExpert,
          this.addedTechnologies,
          this.challengeId
        );
        if (requestFeedback !== null) {
          this.existingSourseComponent.forEach((el) => {
            this.createSolution(el.title, el.url, requestFeedback.id);
          });

          this.loading = false;
          this.$emit("submit");
        } else {
          Toast.show({
            data: "Something wrong!",
            duration: 3000,
          });
          this.loading = false;
        }
      } catch (e) {
        console.error(e);
        Toast.show({
          data: e.message,
          duration: 3000,
        });
        this.loading = false;
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
