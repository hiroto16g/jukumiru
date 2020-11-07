export const state = () => ({
    bg_img: '',
    movie: '',
    text: '',
    storage: null
})

export const mutations = {
    set_bg_img(state, bg_img) {
        state.bg_img = bg_img
    },
    set_movie(state, movie) {
        state.movie = movie
    },
    set_text(state, text) {
        state.text = text
    },
    set_storage(state, storage) {
        state.storage = storage
    }
}

export const actions = {
    async get_text({commit}, url) {
        const text = await this.$axios.$get(url)
        commit('set_text', text)
    }
}