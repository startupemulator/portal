export const state = () => ({
    device: '',
    experienceYears: [
        { id: 1, title: "Less than 6 months" },
        { id: 2, title: "6 months – 1 year" },
        { id: 3, title: "1–2 years" },
        { id: 4, title: "2–3 years" },
        { id: 5, title: "3–4 years" },
        { id: 6, title: "4–5 years" },
        { id: 7, title: "More than 5 years" },
    ],
    technologies: [
        { id: 1, title: "Javascript" },
        { id: 2, title: "Java" },
        { id: 3, title: "Python" },
        { id: 4, title: "HTML5" },
        { id: 5, title: "CSS3" },
        { id: 6, title: "Javascript" },
        { id: 7, title: "Javascript" },
        { id: 8, title: "Java" },
        { id: 9, title: "Javascript" },
        { id: 10, title: "Java" },

        { id: 11, title: "Python" },
        { id: 12, title: "HTML5" },
        { id: 13, title: "CSS3" },
        { id: 14, title: "Java" },
        { id: 15, title: "Python" },
        { id: 16, title: "Javascript" },
        { id: 17, title: "Java" },
        { id: 18, title: "Python" },
        { id: 19, title: "HTML5" },
        { id: 20, title: "CSS3" }
    ],
    applyToTeam: { stepOne: true, applied: false },
    speciality: [
        { id: '01', title: 'front-end' },
        { id: '02', title: 'back-end' }, { id: '03', title: 'devOps' }, { id: '04', title: 'full-stack' }, { id: '05', title: 'seo' }
    ],
    technology: [],
    startupCard: [
        { id: 0, title: "Startup #1", started: false, text: "There is a description of this projects...", skills: ["Javascript", "Java", "HTML5", "Javascript"], start: '27 Sep 2020', duration: '3 months' },
        { id: 1, title: "Possible name in two lines", started: true, text: "There is a description of this projects, where a product owner should describe his ide...", skills: ["Javascript", "Java", "HTML5"], start: '27 Sep 2020', duration: '3 months' },
        { id: 2, title: "Possible name in two lines a", started: false, text: "There is a description of this projects, where a product owner should describe his ide...", skills: ["Javascript", "Java", "HTML5"], start: '27 Sep 2020', duration: '3 months' },
        { id: 3, title: "Possible name in two lines a", started: false, text: "There is a description of this projects, where a product owner should describe his ide...", skills: ["Javascript", "Java", "HTML5", "Javascript", "CSS3", "+3"], start: '27 Sep 2020', duration: '3 months' },
        { id: 4, title: "Possible name in two lines a", started: false, text: "There is a description of this projects, where a product owner should describe his ide...", skills: ["Javascript", "Java", "HTML5", "Javascript", "CSS3", "+3"], start: '27 Sep 2020', duration: '3 months' }
    ],
    challenges: [
        { id: 0, title: "Task name in two lines...", text: "The part of description that appears only in three lines maximum. Other part is hidde...", skills: ["Full Stack Developer", "Back-end Developer", "+1"] },
        { id: 1, title: "Task name", text: "The part of description that appears only in three lines maximum. Other part is hidde...", skills: ["Full Stack Developer"] },
        { id: 2, title: "Task name in two lines...", text: "The part of description that appears only in three lines maximum. Other part is hidde...", skills: ["UI/UX Designer", "Back-end Developer", "+1"] },
        { id: 3, title: "Task name in two lines...", text: "The part of description that appears only in three lines maximum. Other part is hidde...", skills: ["Full Stack Developer", "Back-end Developer"] },
        { id: 4, title: "Task name in two lines...", text: "The part of description that appears only in three lines maximum. Other part is hidde...", skills: ["Full Stack Developer", "Back-end Developer", "+1"] },
    ],
    practicant: [
        { id: 0, fullName: "Full Name", text: "Some comment and feedback from an expert that belongs to some exact action in this list. Some comment and feedback from an expert that belongs to some exact action in this list.", position: "Front-end Developer", img: require('~/assets/img/practicant1.svg') },
        { id: 1, fullName: "Full Name", text: "Some comment and feedback from an expert that belongs to some exact action in this list. ", position: "Front-end Developer", img: require('~/assets/img/practicant2.svg') },
        { id: 2, fullName: "Full Name", text: "Some comment and feedback from an expert that belongs to some exact action in this list. Some comment and feedback from an expert that belongs to some exact action in this list.", position: "Front-end Developer", img: require('~/assets/img/practicant2.svg') },
        { id: 3, fullName: "Full Name", text: "Some comment and feedback from an expert that belongs to some exact action in this list. ", position: "Front-end Developer", img: require('~/assets/img/practicant3.svg') },
    ]


})

export const mutations = {
    changeStepOnApplyToTeam(state) { state.applyToTeam.stepOne = !state.applyToTeam.stepOne },
    applyStartUp(state) { state.applyToTeam.applied = !state.applyToTeam.applied },
    addTechnology(state, name) { state.technology.push({ id: state.technology.length + 1, name: name }) },
    removeTechnology(state, id) { console.log(id), state.technology.splice(id, 1) },
    identifyDevice(state, device) { state.device = device },
    slideLeft(state, card) {
        if (card == 'startupCard') {
            state.startupCard.push(state.startupCard.shift())
        } else if (card == 'challenges') {
            state.challenges.push(state.challenges.shift())
        } else if (card == 'practicant') {
            state.practicant.push(state.practicant.shift())
        }
    },
    slideRigth(state, card) {
        if (card == 'startupCard') {
            state.startupCard.unshift(state.startupCard.pop())
        } else if (card == 'challenges') {
            state.challenges.unshift(state.challenges.pop())
        } else if (card == 'practicant') {
            state.practicant.unshift(state.practicant.pop())
        }
    }



}
export const actions = {
    changeStepOnApplyToTeam({ commit }) {
        commit('changeStepOnApplyToTeam')
    },
    applyStartUp({ commit }) {
        commit('applyStartUp')
    },
    addTechnology({ commit }, e) {
        const srt = e.target.value.trim()
        if ((srt.length > 1) & (e.keyCode === 13 || e.keyCode === 32)) {
            commit('addTechnology', e.target.value)

        }

    },
    removeTechnology({ commit }, id) {
        console.log(id)
        commit('removeTechnology', id)
    },
    isMobile({ commit }, device) {
        commit('identifyDevice', device)
    },
    slideRigth({ commit }, card) {

        commit('slideRigth', card)
    },
    slideLeft({ commit }, card) {

        commit('slideLeft', card)
    },

}