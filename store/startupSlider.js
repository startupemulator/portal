export const state = () => ({
  startupCard: [
    {
      id: 0,
      title: "Startup #1",
      started: false,
      text: "There is a description of this projects...",
      skills: ["Javascript", "Java", "HTML5", "Javascript"],
      start: "27 Sep 2020",
      duration: "3 months",
    },
    {
      id: 1,
      title: "Possible name in two lines",
      started: true,
      text:
        "There is a description of this projects, where a product owner should describe his ide...",
      skills: ["Javascript", "Java", "HTML5"],
      start: "27 Sep 2020",
      duration: "3 months",
    },
    {
      id: 2,
      title: "Possible name in two lines a",
      started: false,
      text:
        "There is a description of this projects, where a product owner should describe his ide...",
      skills: ["Javascript", "Java", "HTML5"],
      start: "27 Sep 2020",
      duration: "3 months",
    },
    {
      id: 3,
      title: "Possible name in two lines a",
      started: false,
      text:
        "There is a description of this projects, where a product owner should describe his ide...",
      skills: ["Javascript", "Java", "HTML5", "Javascript", "CSS3", "+3"],
      start: "27 Sep 2020",
      duration: "3 months",
    },
    {
      id: 4,
      title: "Possible name in two lines a",
      started: false,
      text:
        "There is a description of this projects, where a product owner should describe his ide...",
      skills: ["Javascript", "Java", "HTML5", "Javascript", "CSS3", "+3"],
      start: "27 Sep 2020",
      duration: "3 months",
    },
  ],
});
export const mutations = {
  slideLeft(state, card) {
    state.startupCard.push(state.startupCard.shift());
  },
  slideRigth(state, card) {
    state.startupCard.unshift(state.startupCard.pop());
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
