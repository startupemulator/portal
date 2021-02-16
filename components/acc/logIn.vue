<template>
  <div class="create-account">
    <button type="button" class="create-account-btn-back">
      <img src="@/assets/img/arrow.svg" alt="arrow" />
      <nuxt-link to="/"><span>Back</span></nuxt-link>
      
    </button>
    
    <h2>Log in</h2>
    <form>
      <!-- <label for="account-text"></label>
      <input type="text" placeholder="Enter your full name" /> -->
      <label for="account-email"></label>
      <input type="email" placeholder="Enter your email" />
      <label for="account-password">
        <button type="button " class="create-account-eye" @click.prevent="">
          <img src="@/assets/img/Eye.svg" alt="eye" />
        </button>
      </label>
      <input type="password" placeholder="Enter your password" />
      
      <button type="button " class="create-account-btn-sign" @click.prevent="">
        Log In
      </button>

      <hr />
      <div class="create-account-btn-continue">
        <button type="button">Continue with GitHub</button>
        <button type="button">Continue with the email link</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
    data: ()=> ({
       
    }),
   
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.create-account {
  width: 343px;
  min-height: 415px;
  // local height
 
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
      top: 0px;
      z-index: 2;
      background-image: url("../../assets/img/Email.svg");
      background-repeat: no-repeat;
    }
    label:nth-child(3):before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      left: 16px;
      top: 0px;
      z-index: 2;
      background-image: url("../../assets/img/Password.svg");
      background-repeat: no-repeat;
    }
    label:nth-child(5):before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      left: 16px;
      top: 0px;
      z-index: 2;
      background-image: url("../../assets/img/Password.svg");
      background-repeat: no-repeat;
    }
    .create-account-eye {
      background-color: transparent;
      position: absolute;
      z-index: 10;
      left: 297px;
      top: 2px;
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
    min-height: 510px;
    // local height
    margin-top: -20px;
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
    }}
    
  }
}
</style>