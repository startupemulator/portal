export const state = () => ({
  togglePopup: false,
  sendEmail: false,
  email: " ",
  popupEmail: " ",
  popupEmailInvalid: false,
  enterErrEmail: "Please enter an email address",
  inputedPassword: "",
  password: false,
  showPassword: true,
  emailInvalid: false,
  validaterugular: {
    email: /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/,
    // email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
});
export const mutations = {
  checkForm(state) {
    state.emailInvalid = true;
    state.email.length > 7
      ? (state.enterErrEmail = "Please enter a valid email address")
      : (state.enterErrEmail = "Please enter an email address");
    state.validaterugular.email.test(state.email)
      ? (state.emailInvalid = false)
      : (state.emailInvalid = true);
    state.inputedPassword.length > 5
      ? (state.password = false)
      : (state.password = true);
  },
  checkPopupForm(state) {
    state.popupEmailInvalid = true;
    state.validaterugular.email.test(this.popupEmail)
      ? (state.popupEmailInvalid = false)
      : (state.popupEmailInvalid = true);
    if (state.popupEmailInvalid) {
      state.sendEmail = !state.sendEmail;
    }
  },
};
export const actions = {
  checkForm({ commit }) {
    commit("checkForm");
  },
  checkPopupForm({ commit }) {
    commit("checkPopupForm");
  },
};
