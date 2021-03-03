<template>
  <div class="invite-collegues-popup">
    <div class="invite-collegues__content">
      <button
        type="button"
        class="sign-up-link__close"
        @click="$emit('closePopupLinkEmail')"
      >
        <img src="@/assets/img/close.svg" alt="Close" />
      </button>
      <h2>Invite collegues</h2>
      <p>Invite someone you want to join your team as a developer.</p>

      <div class="invite-collegueses">
        <div class="specialityOne__list">
          <div
            class="specialityOne__item"
            :class="choosenCollegues ? '' : 'error'"
            @click="openSpeciality = !openSpeciality"
          >
            <span>{{ choosenSpeciality }}</span>
            <img
              src="@/assets/img/arrow.svg"
              alt="arrow"
              :style="
                openSpeciality
                  ? 'transform: rotate(-90deg); transition: 1s'
                  : ''
              "
            />
          </div>

          <ul v-show="openSpeciality" class="specialityOne__item-list">
            <li
              v-for="item in speciality"
              :key="item.id"
              class="specialityOne__item-item"
              @click="chosespeciality($event.target)"
            >
              {{ item.specialityPosition }}
            </li>
          </ul>
        </div>
      </div>
      <U-input
        :placeholder="'Enter your email'"
        :type="'email'"
        :account-class="
          !email ? 'create-account__email error' : 'create-account__email'
        "
        :img="require('~/assets/img/email.svg')"
        @textInput="checkEmail"
      ></U-input>
      <U-button
        :button-name="'invite'"
        :button-class="'u-button-blue btn-invite'"
        @clickOnButton="invite"
      ></U-button>
    </div>
  </div>
</template>
<script>
import UInput from "./UInput.vue";
import UButton from "./UButton.vue";
export default {
  components: { UInput, UButton },
  data() {
    return {
      openSpeciality: false,
      choosenSpeciality: "Select a speciality",
      email: " ",
      inputedEmail: "false",
      choosenCollegues: true,
      emailPattern: /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      speciality: [
        { id: 0, specialityPosition: "Front-end" },
        { id: 1, specialityPosition: "Back-end" },
        { id: 2, specialityPosition: "DevOps" },
        { id: 3, specialityPosition: "Seo" },
      ],
    };
  },
  methods: {
    chosespeciality(e) {
      this.choosenSpeciality = e.textContent;
      this.openSpeciality = !this.openSpeciality;
      this.choosenCollegues = true;
    },
    checkEmail(e) {
      if (this.emailPattern.test(e)) {
        this.email = true;
        this.inputedEmail = e;
      } else {
        this.email = false;
        this.inputedEmail = "";
      }
    },
    invite() {
      if (this.choosenSpeciality === "Select a speciality") {
        this.choosenCollegues = false;
      } else if (this.email === " ") {
        this.email = false;
      } else if (
        this.email &
        (this.choosenSpeciality !== "Select a speciality")
      ) {
        this.$emit("inviteCollegue", {
          email: this.inputedEmail,
          speciality: this.choosenSpeciality,
        });
      }
    },
  },
};
</script>
<style lang="scss">
.invite-collegues-popup {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(59, 70, 90, 0.6);
  backdrop-filter: blur(16px);
  display: flex;
  justify-content: center;

  .invite-collegues__content {
    position: relative;
    width: 343px;
    height: 362px;
    display: flex;
    flex-direction: column;
    background: #232b39;
    border-radius: 12px;
    padding: 0 24px;
    box-sizing: border-box;
    margin-top: 175px;
  }
  .sign-up-link__close {
    position: absolute;
    right: 10px;
    top: 16px;
    background-color: transparent;
  }
  h2 {
    width: 100%;
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    margin-top: 40px;
    margin-bottom: 0;
  }
  p {
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    color: #fff;
    width: 100%;
    margin-top: 16px;
  }
  .invite-collegueses {
    margin-top: 12px;
  }
  .specialityOne__item.error {
    border: 1px solid #e94646;
  }
  .specialityOne__item-list,
  .specialityOne__item {
    width: 295px;
  }
  .btn-invite {
    margin-top: 24px;
  }
  .standart-label {
    margin-top: 16px;
    img {
      top: 12px;
    }
  }
}
@media (min-width: 768px) {
  .invite-collegues-popup {
    .invite-collegues__content {
      position: relative;
      width: 564px;
      height: 408px;
      padding: 0 48px;
      margin-top: 175px;
    }
    h2 {
      font-weight: bold;
      font-size: 35px;
      line-height: 40px;
      margin-top: 48px;
    }
    p {
      font-weight: 300;
      font-size: 17px;
      line-height: 24px;
    }
    .specialityOne__item-list,
    .specialityOne__item {
      width: 468px;
    }
    .standart-label {
      img {
        top: 16px;
      }
    }
  }
}
</style>
