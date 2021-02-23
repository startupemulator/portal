export const state = () => ({
    takePart: [{
            id: "0",
            status: false,
            title: "Use new technologies",
            text: "Description probably in two lines. Description probably in two or three lines. Description probably in two or three lines.",
            img: require('@/assets/img/benefits.svg'),
        },
        {
            id: "1",
            status: true,
            title: "Collaborate with others",
            text: "Description probably in two lines. Description probably in two or three lines. Description probably in two or three lines.",
            img: require('@/assets/img/benefits2.svg'),
        },
        {
            id: "2",
            status: true,
            title: "Receive feedback from our experts",
            text: "Description probably in two lines. Description probably in two or three lines. Description probably in two or three lines.",
            img: require('@/assets/img/benefits3.svg'),
        },

    ]

})
export const mutations = {
    switchingtakePart(state, i) {
        state.takePart.forEach((item) => {
            item.status = item.id == i ? false : true;
        });
    }
}
export const actions = {
    switchingtakePart({ commit }, i) {
        commit('switchingtakePart', i)
    },

}