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
    /* --------------------------------------------------
        Cloud Functions
    -------------------------------------------------- */
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
    /* --------------------------------------------------
        Cloud Firestore
    -------------------------------------------------- */
    /*
        塾ヘッダー
    */
    // １件取得
    async fetch_juku_head({ commit }, input_params) {
        var juku_cd = input_params.juku_cd
        var response = await this.$cloud_firestore.fetch_juku_head(juku_cd)
        if (response.result == true) {
        } else {
            alert(response.message)// TODO:暫定処理
        }
    },
    // 追加
    async insert_juku_head({ commit }, input_params) {
        var response = await this.$cloud_firestore.insert_juku_head(input_params)
        console.log(response)
    },
    // 更新
    async update_juku_head({ commit }, input_params) {
        var response = await this.$cloud_firestore.update_juku_head(input_params)
    },

    /*
        塾基本情報
    */
    // 取得
    async select_juku_info({ commit }, input_params) {
        var juku_cd = input_params.juku_cd
        var response = await this.$cloud_firestore.select_juku_info(juku_cd)
        if (response.result == true) {
        } else {
            alert(response.message)// TODO:暫定処理
        }
    },
    // 追加
    async insert_juku_info({ commit }, input_params) {
        var response = await this.$cloud_firestore.insert_juku_info(input_params)
        console.log(response)
    },
    // 更新
    async update_juku_info({ commit }, input_params) {
        var response = await this.$cloud_firestore.update_juku_info(input_params)
    },

    /*
        塾料金情報
    */
    // 取得
    async select_juku_fee({ commit }, input_params) {
        var juku_cd = input_params.juku_cd
        var response = await this.$cloud_firestore.select_juku_fee(juku_cd)
        if (response.result == true) {
        } else {
            alert(response.message)// TODO:暫定処理
        }
    },
    // 追加
    async insert_juku_fee({ commit }, input_params) {
        var response = await this.$cloud_firestore.insert_juku_fee(input_params)
        console.log(response)
    },
    // 更新
    async update_juku_fee({ commit }, input_params) {
        var response = await this.$cloud_firestore.update_juku_fee(input_params)
    },

    /*
        塾Q&A情報
    */
    // 取得
    async select_juku_qa({ commit }, input_params) {
        var juku_cd = input_params.juku_cd
        var response = await this.$cloud_firestore.select_juku_qa(juku_cd)
        if (response.result == true) {
        } else {
            alert(response.message)// TODO:暫定処理
        }
    },
    // 追加
    async insert_juku_qa({ commit }, input_params) {
        var response = await this.$cloud_firestore.insert_juku_qa(input_params)
        console.log(response)
    },
    // 更新
    async update_juku_qa({ commit }, input_params) {
        var response = await this.$cloud_firestore.update_juku_qa(input_params)
    },
}