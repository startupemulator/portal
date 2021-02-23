export const state = () => ({
    device: '',
    login: false,
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
    createprodjectSteps: { stepOne: true, stepTwo: false, stepThree: false, stepFour: false, technologi: false },
    speciality: [
        { id: '01', title: 'front-end' },
        { id: '02', title: 'back-end' }, { id: '03', title: 'devOps' }, { id: '04', title: 'full-stack' }, { id: '05', title: 'seo' }
    ],
    technology: [],


    pickedTechnology: []


})

export const mutations = {
    changeStepOnApplyToTeam(state) { state.applyToTeam.stepOne = !state.applyToTeam.stepOne },
    applyStartUp(state) { state.applyToTeam.applied = !state.applyToTeam.applied },
    addTechnology(state, name) { state.technology.push({ id: state.technology.length + 1, name: name }) },
    removeTechnology(state, id) { console.log(id), state.technology.splice(id, 1) },
    identifyDevice(state, device) { state.device = device },
    nextStepOnCreateProdject(state) {
        if (state.createprodjectSteps.stepOne) {
            state.createprodjectSteps.stepOne = false
            state.createprodjectSteps.stepTwo = true
        } else {
            state.createprodjectSteps.technologi = true
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

    nextStepOnCreateProdject({ commit }) {
        commit('nextStepOnCreateProdject')
    },
    saveDraftOnCreateProdject() {
        console.log('saveDraft')
    }

}