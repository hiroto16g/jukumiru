export const state = () => ({
    img: '',
    id: '',
    thumbs:[],
    juku: {}
})

export const mutations = {
    init(state, payload) {
        state.juku = payload.juku
        state.img = payload.avatar_img
        state.thumbs = payload.thumbs,
        state.id = payload.id
    },
    set_img(state, img) {
        state.img = img
    },
    set_thumbs(state, thumb) {
        state.thumbs.push(thumb)
    },
    set_juku(state, juku) {
        state.juku = juku
    },
    set_id(state, id) {
        state.id = id
    }
}

export const actions = {
    // 申し込みメール送信
    async send_introduction_mail({commit}, input_params) {
        var response = await this.$cloud_functions.send_introduction_mail(input_params)
        if (response.result == true) {
            alert(response.message)// TODO:暫定処理
        } else {
            alert(response.message)// TODO:暫定処理
        }
        
    },
    // 問い合わせメール送信
    async send_qa_mail({commit}, input_params) {
        var response = await this.$cloud_functions.send_qa_mail(input_params)
        if (response.result == true) {
            alert(response.message)// TODO:暫定処理
        } else {
            alert(response.message)// TODO:暫定処理
        }
    },
    // 塾情報取得
    async fetch_juku({ commit }, input_params) {
        var juku_cd = input_params.juku_cd
        var response = await this.$cloud_firestore.fetch_juku(juku_cd)
        if (response.result == true) {
        } else {
            alert(response.message)// TODO:暫定処理
        }
    },
    // 塾情報追加（運用準備用）
    async insert_juku({ commit }, input_params) {
        var response = await this.$cloud_firestore.insert_juku(input_params)
        console.log(response)
    },
    // 塾情報更新
    async update_juku({ commit }, input_params) {
        var response = await this.$cloud_firestore.update_juku(input_params)
    },
}