export const state = () => ({
  practicant: [
    {
      id: 0,
      fullName: "Full Name",
      text:
        "Some comment and feedback from an expert that belongs to some exact action in this list. Some comment and feedback from an expert that belongs to some exact action in this list.",
      position: "Front-end Developer",
      img: require("~/assets/img/practicant1.svg"),
    },
    {
      id: 1,
      fullName: "Full Name",
      text:
        "Some comment and feedback from an expert that belongs to some exact action in this list. ",
      position: "Front-end Developer",
      img: require("~/assets/img/practicant2.svg"),
    },
    {
      id: 2,
      fullName: "Full Name",
      text:
        "Some comment and feedback from an expert that belongs to some exact action in this list. Some comment and feedback from an expert that belongs to some exact action in this list.",
      position: "Front-end Developer",
      img: require("~/assets/img/practicant2.svg"),
    },
    {
      id: 3,
      fullName: "Full Name",
      text:
        "Some comment and feedback from an expert that belongs to some exact action in this list. ",
      position: "Front-end Developer",
      img: require("~/assets/img/practicant3.svg"),
    },
  ],
});
export const mutations = {
  slideLeft(state, card) {
    state.practicant.push(state.practicant.shift());
  },
  slideRigth(state, card) {
    state.practicant.unshift(state.practicant.pop());
  },
};
export const actions = {
  slideRigth({ commit }, card) {
    commit("slideRigth", card);
  },
  slideLeft({ commit }, card) {
    commit("slideLeft", card);
  },
};
