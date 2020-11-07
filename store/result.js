import Vue from 'vue'

export const state = () => ({
    jukus: [],
    ids: [],
    avatar_imgs: {},
    thumbs: {}
})

export const mutations = {
    get_basic_jukus_info(state) {
        state.jukus = require("@/assets/test.json")
        state.ids = Object.keys(state.jukus)
    },
    set_avatar_imgs(state, payload) {
        Vue.set(state.avatar_imgs, payload.id, payload.img)
    },
    set_thumbs(state, payload) {
        Vue.set(state.thumbs, payload.id, payload.thumbs)
    }
}