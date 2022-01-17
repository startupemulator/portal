<template>
  <div class="request-feedback">
    <U-Back :is-button="true" @clikOnButton="$emit('clikOnButton')"></U-Back>
    <U-Title :text="'Request feedback'"></U-Title>
    <Technology-Picker
      :title="'Pick technologies you need feedback in'"
      :technologies="technologies"
      :add-technology="false"
      @chosenTechnologi="chosenTechnologi"
    ></Technology-Picker>
    <p v-show="$v.pickedTechnology.$error" class="errorInput">
      Please pick technologies
    </p>
    <div class="request-feedback__comment">
      <h4>Comment</h4>
      <textarea
        v-model="comment"
        placeholder="Enter your comment to our experts"
        :class="$v.comment.$error ? ' error' : ''"
      ></textarea>
      <p v-show="$v.comment.$error" class="errorInput">
        Please enter a comment of at least 8 characters
      </p>
    </div>
    <div class="request-feedback--button">
      <U-Button
        :button-name="'Request'"
        :button-class="'u-button-blue'"
        @clickOnButton="toggleUPopup"
      ></U-Button>
    </div>
    <U-Popup
      v-show="UPopup"
      :title="'You successfully requested feedback from our experts'"
      :text-content="'Experts will receive your request and give feedback about your startup.'"
      @closePopupLinkSent="closeUPopup"
    ></U-Popup>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import { required, minLength } from "vuelidate/lib/validators";
import Spinner from "../../../store/modules/Spinner";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import TechnologyPicker from "~/components/molecules/technologyPicker.vue";
import UPopup from "~/components/molecules/popupChallengeStarted.vue";
import Toast from "~/store/modules/Toast";
import { Startup } from "~/store";

@Component({
  components: { UBack, UTitle, TechnologyPicker, UButton, UPopup },
  validations: {
    comment: {
      required,
      minLength: minLength(8),
    },
    pickedTechnology: {
      required,
    },
  },
})
export default class extends Vue {
  Startup;
  constructor() {
    super();
    this.Startup = Startup;
  }

  @Prop() userId: string;
  pickedTechnology = [];
  technologies = [];
  comment = "";
  UPopup = false;
  async toggleUPopup() {
    this.technologies.forEach((technology) => {
      if (technology.checked) {
        this.pickedTechnology.push(technology.id);
      }
    });
    this.$v.$touch();
    if (!this.$v.$error) {
      Spinner.show();
      try {
        const askFeedback = await this.$createAskFeedbackForStartup(
          this.userId,
          this.comment,
          this.pickedTechnology,
          Startup.startup.id
        );

        if (askFeedback !== null) {
          Spinner.hide();
          this.UPopup = !this.UPopup;
          this.$emit("createFedbackNotification");
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

  closeUPopup() {
    this.comment = "";
    this.pickedTechnology = [];
    this.UPopup = !this.UPopup;
  }

  chosenTechnologi({ id, item }) {
    this.technologies.forEach((technology) => {
      if (technology.id === id && item.checked) {
        technology.checked = true;
      } else if (technology.id === id && !item.checked) {
        technology.checked = false;
      }
    });
    this.technologies = JSON.parse(JSON.stringify(this.technologies));
  }

  mounted() {
    this.technologies = JSON.parse(JSON.stringify(Startup.technologies));
    this.technologies.forEach((technology) => (technology.checked = false));
  }
}
</script>

<style lang="scss" scoped>
.request-feedback {
  width: 343px;
  margin: 0 auto;
  margin-top: 40px;
  color: #fff;

  .errorInput {
    top: 0;
  }

  .request-feedback__comment {
    h4 {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 8px;
    }

    textarea {
      background: #2e384a;
      border-radius: 12px;
      width: 343px;
      height: 112px;
      padding: 8px 16px;
      color: #fff;
      box-sizing: border-box;
      border: none;

      &::placeholder {
        color: #b5c1d8;
      }
    }
  }

  .request-feedback--button {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 16px 16px 28px 16px;
    background: #232b39;
    border: 1px solid #3b465a;
    box-shadow: inset 0 0 10px 2px #262f3f;
    border-radius: 16px 16px 0 0;
  }
}
@media (min-width: 768px) {
  .request-feedback {
    width: 660px;
    margin-top: 48px;

    .request-feedback__comment {
      h4 {
        font-size: 17px;
        line-height: 32px;
      }

      textarea {
        width: 660px;
        height: 136px;
        padding: 12px 24px;
        font-size: 18px;
        line-height: 28px;

        &::placeholder {
          color: #b5c1d8;
        }
      }
    }

    .request-feedback--button {
      position: static;
      padding: 32px 0 28px 0;
      background: transparent;
      border: none;
      border-top: 1px solid #3b465a;
      box-shadow: none;
      border-radius: 0;
      margin-top: 24px;
    }
  }
}
</style>
