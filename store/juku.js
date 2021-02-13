import firebase from '@/plugins/firebase'

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
        message_result_send_mail(response)
    },
    // 問い合わせメール送信
    async send_qa_mail({commit}, input_params) {
        var response = await this.$cloud_functions.send_qa_mail(input_params)
        message_result_send_mail(response)
    },
    // 塾情報取得
    async get_juku({ commit }, input_params) {
        var juku_cd = input_params.juku_cd
        
        var response = await this.$cloud_firestore.get_juku(juku_cd)
        if (response.exists == true) {
            var juku_cd = response.id
            var juku = response.data()
            console.log(juku)
        } else {
            
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
        console.log(response)
    },
}

// メール送信後メッセージ表示
function message_result_send_mail(response) {
    var request = response.data.request
    var juku = response.data.juku
    var success_code = "250 2.0.0 Ok:"
    if (request.response &&
        juku.response &&
        request.response.indexOf(success_code) != -1 &&
        juku.response.indexOf(success_code) != -1) {
        // 送信成功
        alert("メールの送信に成功しました。")   // 暫定処理
    } else {
        // 送信失敗
        alert("メールの送信に失敗しました。")   // 暫定処理
    }
}