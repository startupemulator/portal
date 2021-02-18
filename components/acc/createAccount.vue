<template>
  <div class="account">
    <transition name="slide-fade">
      <div class="sign-up-link-popup" v-if="togglePopup">
        <div class="sended-mail" v-if="sendEmail">
          <button type="button" class="sign-up-link__close">
            <img
              src="@/assets/img/Close.svg"
              alt="Close"
              @click="
                togglePopup = !togglePopup;
                sendEmail = !sendEmail;
              "
            />
          </button>
          <h2>Signing up link was sent</h2>
          <h3>
            Signing up link was sent to your email. Follow the link to create an
            account.
          </h3>
        </div>
        <div class="sign-up-link" v-if="!sendEmail">
          <button type="button" class="sign-up-link__close">
            <img
              src="@/assets/img/Close.svg"
              alt="Close"
              @click="togglePopup = !togglePopup"
            />
          </button>
          <h2>Sign up with the email link</h2>
          <p>
            Signing up link will be sent to your email. After signing up you can
            log in in the same way.
          </p>
          <form>
            <label for="account-email"></label>
            <input type="email" placeholder="Enter your email" />
            <button
              type="button "
              class="create-account-btn-sign"
              @click.prevent="sendEmail = !sendEmail"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </transition>
    <transition name="bounce" v-if="sendErr">
    <div class="danger-message">
      <div class="danger-message__shining"> </div>
      <h2>Something went wrong</h2>
      <p>
        A short description about the error that happened. Three lines
        are maximum for such messages. Time is 4 sec.
      </p>
    </div>
    </transition>
    <!-- __________________________________ -->
    <div class="create-account">
      <nuxt-link to="/">
        <button type="button" class="create-account-btn-back">
          <img src="@/assets/img/arrow.svg" alt="arrow" />
          <span>Back</span>
        </button></nuxt-link
      >
      <h2>Create an account</h2>
      <form>
        <label for="account-text"></label>
        <input type="text" placeholder="Enter your full name" />
        <label for="account-email"></label>
        <input type="email" placeholder="Enter your email" />
        <label for="account-password">
          <button type="button " class="create-account-eye" @click.prevent="">
            <img src="@/assets/img/Eye.svg" alt="eye" />
          </button>
        </label>
        <input type="password" placeholder="Set a password" />

        <button
          type="button "
          class="create-account-btn-sign"
          @click.prevent="sendError"
        >
          Sign Up
        </button>

        <hr />
        <div class="create-account-btn-continue">
          <button type="button">Continue with GitHub</button>
          <button type="button" @click="togglePopup = !togglePopup">
            Continue with the email link
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    togglePopup: false,
    sendEmail: false,
    sendErr:false
  }),
  computed: {
  sendErr: function (){
    return this.sendErr = this.sendErr 
  }
  },
  methods: {
    sendError(){
      this.sendErr = !this.sendErr
      setTimeout(() => this.sendErr = !this.sendErr, 4000)
    }
  }
};
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
 {
  transform: translateX(10px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 1.5s;
}
.bounce-leave-active {
  animation: bounce-in 1.5s reverse;
}
@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@import "@/assets/css/variables.scss";
.sign-up-link-popup {
  position: absolute;
  top: 0%;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: rgba(59, 70, 90, 0.6);
  backdrop-filter: blur(16px);
  z-index: 11;
  display: flex;
  flex-direction: column;
  padding-top: 175px;
  align-items: center;
  .sign-up-link {
    display: flex;
    flex-direction: column;
    width: 343px;
    height: 362px;
    background: #232b39;
    border-radius: 12px;
  }
  .sign-up-link__close {
    background-color: transparent;
    margin-left: auto;
    margin-top: 15px;
    margin-right: 10px;
  }
  h2 {
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    color: #ffffff;
    width: 295px;
    margin: 0;
    margin-left: 24px;
    margin-top: 5px;
  }
  p {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
    margin-left: 24px;
    margin-top: 16px;
    width: 295px;
  }
  input {
    position: relative;
    background: #2e384a;
    border: none;
    border-radius: 12px;
    height: 48px;
    color: #b5c1d8;
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    margin-top: 10px;
    margin-left: 24px;
    width: 295px;
    padding-left: 56px;
    box-sizing: border-box;
    &::placeholder {
      color: #b5c1d8;
      font-weight: normal;
      font-size: 16px;
      line-height: 32px;
      color: #b5c1d8;
    }
  }
  form {
    position: relative;
    label {
      width: 100%;
      position: relative;
    }
    label:before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      left: 40px;
      top: -2px;
      z-index: 2;
      background-image: url("../../assets/img/Email.svg");
      background-repeat: no-repeat;
    }
  }
  .create-account-btn-sign {
    height: 48px;
    background-color: $button-color-blue;
    margin-top: 20px;
    margin-left: 24px;
    width: 295px;
    &:hover {
      background-color: $button-color-blue-hover;
    }
    &:focus {
      background-color: $button-color-blue-focus;
    }
    &:active {
      background-color: $button-color-blue-active;
    }
  }
}
.sended-mail {
  position: relative;
  width: 343px;
  height: 196px;
  background: #232b39;
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 87px;
  h2 {
    max-width: 295px;
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    color: #ffffff;
    margin: 0 auto;
    margin-top: 40px;
  }
  h3 {
    max-width: 295px;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
    margin: 0 auto;
    margin-top: 16px;
  }
  .sign-up-link__close {
    position: absolute;
    right: 0;
  }
}
.danger-message{
position: absolute;
width: 343px;
height: 148px;
background: #2E384A;
box-shadow: 0px 8px 24px rgba(28, 35, 48, 0.2);
border-radius: 12px;
z-index: 10;
right: 16px;
top: 16px;
.danger-message__shining{
  position: absolute;
  z-index: 10;
  width: 16px;
height: 148px;
background: #E94646;
box-shadow: -4px 0px 6px 1px rgba(233, 70, 70, 0.25), 4px 0px 6px 1px rgba(233, 70, 70, 0.25);
border-radius: 12px 0px 0px 12px;

}
h2{
  font-weight: bold;
font-size: 17px;
line-height: 24px;
color: #FFFFFF;
margin-left: 64px;
}
p{
  font-weight: normal;
font-size: 14px;
line-height: 20px;
color: #B5C1D8;
margin-left: 64px;
width: 251px;

}
}
.create-account {
  width: 343px;
  min-height: 558px;
  margin: 0 auto;
  margin-top: 32px;
  hr {
    background: #4e5a71;
    height: 1px;
    border: none;
    margin-top: 30px;
  }
  .create-account-btn-back {
    background-color: transparent;
    color: #8c97ac;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    img {
      transform: rotate(180deg);
      margin-right: 15px;
    }
    span:hover {
      border-bottom: 1px solid #8c97ac;
    }
  }
  h2 {
    font-weight: bold;
    font-size: 36px;
    line-height: 40px;
    color: $main-text-color;
    margin-top: 22px;
    margin-bottom: 33px;
  }
  form {
    position: relative;
    label {
      width: 100%;
      position: relative;
    }
    label:nth-child(1):before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      left: 16px;
      bottom: 0px;
      z-index: 2;
      background-image: url("../../assets/img/Profile.svg");
      background-repeat: no-repeat;
    }
    label:nth-child(3):before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      left: 16px;
      bottom: 0px;
      z-index: 2;
      background-image: url("../../assets/img/Email.svg");
      background-repeat: no-repeat;
    }
    label:nth-child(5):before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      left: 16px;
      bottom: 0px;
      z-index: 2;
      background-image: url("../../assets/img/Password.svg");
      background-repeat: no-repeat;
    }
    .create-account-eye {
      background-color: transparent;
      position: absolute;
      z-index: 10;
      left: 297px;
      top: -2px;
    }

    .create-account-btn-sign {
      width: 343px;
      height: 48px;
      background-color: $button-color-blue;
      margin-top: 16px;
      &:hover {
        background-color: $button-color-blue-hover;
      }
      &:focus {
        background-color: $button-color-blue-focus;
      }
      &:active {
        background-color: $button-color-blue-active;
      }
    }
  }

  input {
    position: relative;
    background: #2e384a;
    border: none;
    border-radius: 12px;
    height: 48px;
    color: #b5c1d8;
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    margin-bottom: 14px;
    width: 100%;
    padding-left: 56px;
    box-sizing: border-box;
    &::placeholder {
      color: #b5c1d8;
      font-weight: normal;
      font-size: 16px;
      line-height: 32px;
      color: #b5c1d8;
    }
  }
  .create-account-btn-continue {
    margin-top: 16px;
    button {
      width: 343px;
      height: 48px;
      background-color: $button-color-gray;
      margin-top: 16px;
      &:hover {
        background-color: $button-color-gray-hover;
      }
      &:focus {
        background-color: $button-color-gray-focus;
      }
      &:active {
        background-color: $button-color-gray-active;
      }
    }
  }
}
@media (min-width: 768px) {
  .create-account {
    width: 660px;
    min-height: 300px;
    margin-top: 45px;

    h2 {
      font-weight: bold;
      font-size: 56px;
      line-height: 64px;
      margin-top: 55px;
      margin-bottom: 40px;
    }
    input {
      height: 56px;
      margin-top: 0;
      padding-left: 65px;
      &::placeholder {
        font-weight: normal;
        font-size: 18px;
        line-height: 32px;
      }
    }
    form {
      position: relative;
      label {
        width: 100%;
        position: relative;
      }
      label:nth-child(n + 1):before {
        left: 24px;
      }
      .create-account-eye {
        left: 605px;
      }
      .create-account-btn-sign {
        width: 660px;
        height: 56px;
      }
    }
    .create-account-btn-continue {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      button {
        font-weight: bold;
        font-size: 18px;
        line-height: 32px;
        width: 318px;
        height: 56px;
      }
    }
  }
  .sended-mail {
    width: 560px;
    height: 200px;

    margin-top: -60px;
    h2 {
      font-weight: bold;
      font-size: 35px;
      line-height: 40px;
      max-width: 468px;
      margin-top: 50px;
    }
    h3 {
      max-width: 468px;
      font-weight: normal;
      font-size: 17px;
      line-height: 24px;
    }
  }
  .sign-up-link-popup {
    padding-top: 70px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -15px;
    .sign-up-link {
      width: 564px;
      height: 360px;
    }
    .sign-up-link__close {
      margin-top: 25px;
      margin-right: 20px;
    }
    h2 {
      font-weight: bold;
      font-size: 35px;
      line-height: 40px;
      width: 468px;
      margin-left: 48px;
    }
    p {
      width: 468px;
      margin-left: 48px;
      font-size: 17px;
      line-height: 24px;
    }
    .create-account-btn-sign {
      width: 468px;
      height: 60px;
      margin-left: 48px;
    }
    input {
      margin-left: 48px;
      width: 468px;
      height: 56px;
      margin-top: 5px;
      padding-left: 64px;
      &::placeholder {
        font-weight: normal;
        font-size: 18px;
        line-height: 32px;
      }
    }
    button {
      margin-left: 48px;
    }
  }
  .sign-up-link-popup form label:before {
    left: 72px;
  }
}
@media (min-width: 1919px) {
  .create-account {
    margin-top: 40px;
    justify-self: flex-start;
  }
}
</style>