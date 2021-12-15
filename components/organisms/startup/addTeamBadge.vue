<template>
  <div class="add-team-badge">
    <div class="add-team-badge__header">
      <U-Back :is-button="true" @clikOnButton="$emit('clikOnButton')"></U-Back>
      <U-Title :text="title"></U-Title>
    </div>
    <div class="add-team-badge__content">
      <Pick-Badeg :badges="badges" @addBadge="addBadge"></Pick-Badeg>
      <div class="add-team-badge__comment">
        <p>Comment (Optional)</p>
        <textarea v-model="comment" placeholder="Enter your comment"></textarea>
      </div>
    </div>
    <div class="add-team-badge__buttons">
      <U-Button
        :button-name="'Submit'"
        :button-class="'u-button-blue'"
        @clickOnButton="submitAddBadge"
      ></U-Button>
      <U-Button
        :button-name="'Cancel'"
        :button-class="'u-button-gray'"
        @clickOnButton="$emit('clikOnButton')"
      ></U-Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

import Spinner from "../../../store/modules/Spinner";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import Criterios from "~/components/molecules/criterios.vue";
import PickBadeg from "~/components/molecules/pickBadge.vue";
import { Badges } from "~/models/Badges";
@Component({
  components: { UButton, UTitle, UBack, Criterios, PickBadeg },
})
export default class extends Vue {
  @Prop({ default: "Add badge" }) title: string;
  @Prop() badges: Array<Badges>;
  @Prop() feedbackId: string;
  comment = "";
  chhosenbadge: Array<Badges>;

  badgesOnFeedback = [];
  addBadge(data) {
    this.chhosenbadge = data;
  }

  async submitAddBadge() {
    Spinner.show();
    try {
      if (this.feedbackId !== undefined) {
        const feedback = await this.$feedbackById(this.feedbackId);
        this.badgesOnFeedback.push(this.chhosenbadge.id);
        if (feedback !== null) {
          feedback.badges.forEach((el) => this.badgesOnFeedback.push(el.id));
          await this.$updateFeedback(this.feedbackId, this.badgesOnFeedback);
        }
      }
      Spinner.hide();
      this.$emit("addedBadge");
    } catch (e) {
      console.error(e);
      Spinner.hide();
    }
  }
}
</script>

<style lang="scss">
.add-team-badge {
  width: 343px;
  margin: 0 auto;
  margin-top: 36px;

  .add-team-badge__comment {
    margin-top: 8px;

    p {
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin-top: 0;
      margin-bottom: 8px;
    }

    textarea {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      padding: 8px 16px;
      background: #2e384a;
      border-radius: 12px;
      color: #fff;
      width: 343px;
      height: 136px;
      border: 2px solid transparent;
      box-sizing: border-box;

      &::placeholder {
        color: #b5c1d8;
      }

      &:focus {
        border: 2px solid #b5c1d8;
      }
    }
  }

  .add-team-badge__buttons {
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
  .add-team-badge {
    width: 660px;
    margin-top: 48px;

    .add-team-badge__comment {
      margin-top: 22px;

      p {
        margin-bottom: 10px;
      }

      textarea {
        font-size: 18px;
        line-height: 28px;
        padding: 12px 24px;
        width: 660px;
        height: 136px;

        &::placeholder {
          color: #b5c1d8;
        }

        &:focus {
          border: 2px solid #b5c1d8;
        }
      }
    }

    .add-team-badge__buttons {
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
      margin-top: 24px;

      .u-button-gray {
        margin-left: 24px;
      }
    }
  }
}
</style>
