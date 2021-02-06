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
    /* --------------------------------------------------
        申し込みメール送信
    -------------------------------------------------- */
    async send_introduction_mail({commit}, input_params) {

        var call_params = {
            request : {
                to : input_params.parent_email,
                juku_nm : input_params.juku_nm,
                user_nm : input_params.user_nm,
            },
            juku : {
                to : input_params.juku_email,
                juku_nm : input_params.juku_nm,
                course : input_params.course,
                user_nm : input_params.user_nm,
                school_grade : input_params.school_grade,
                parent_nm : input_params.parent_nm,
                parent_email : input_params.parent_email,
            },
        }

        // Function起動
        var cf_send_introduction_mail = firebase.functions().httpsCallable('send_introduction_mail')
        var response = await cf_send_introduction_mail(call_params)
        console.log(response)
    },
    /* --------------------------------------------------
        問い合わせメール送信
    -------------------------------------------------- */
    async send_qa_mail({commit}, input_params) {


        var call_params = {
            request : {
                to : input_params.user_email,
                juku_nm : input_params.juku_nm,
                user_nm : input_params.user_nm,
                note : input_params.note,
            },
            juku : {
                to : input_params.juku_email,
                juku_nm : input_params.juku_nm,
                user_nm : input_params.user_nm,
                user_email : input_params.user_email,
                note : input_params.note,
            },
        }

        // Function起動
        var cf_send_qa_mail = firebase.functions().httpsCallable('send_qa_mail')
        var response = await cf_send_qa_mail(call_params)
        console.log(response)
    },
}