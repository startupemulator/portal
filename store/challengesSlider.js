export const state = () => ({
  challenges: [
    {
      id: 0,
      title: "Task name in two lines...",
      text:
        "The part of description that appears only in three lines maximum. Other part is hidde...",
      skills: ["Full Stack Developer", "Back-end Developer", "+1"],
    },
    {
      id: 1,
      title: "Task name",
      text:
        "The part of description that appears only in three lines maximum. Other part is hidde...",
      skills: ["Full Stack Developer"],
    },
    {
      id: 2,
      title: "Task name in two lines...",
      text:
        "The part of description that appears only in three lines maximum. Other part is hidde...",
      skills: ["UI/UX Designer", "Back-end Developer", "+1"],
    },
    {
      id: 3,
      title: "Task name in two lines...",
      text:
        "The part of description that appears only in three lines maximum. Other part is hidde...",
      skills: ["Full Stack Developer", "Back-end Developer"],
    },
    {
      id: 4,
      title: "Task name in two lines...",
      text:
        "The part of description that appears only in three lines maximum. Other part is hidde...",
      skills: ["Full Stack Developer", "Back-end Developer", "+1"],
    },
  ],
});
export const mutations = {
  slideLeft(state, card) {
    state.challenges.push(state.challenges.shift());
  },
  slideRigth(state, card) {
    state.challenges.unshift(state.challenges.pop());
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
