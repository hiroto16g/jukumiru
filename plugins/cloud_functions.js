/*
  --------------------------------------- Firebase Cloud Functions 共通化 ---------------------------------------
*/

import firebase from '@/plugins/firebase'

const app = firebase.app()
const functions = app.functions("asia-northeast1")  //TODO:const.jsから呼び出せる?

export default (context, inject) => {    
    const $cloud_functions = {
        send_introduction_mail: send_introduction_mail,
        send_qa_mail: send_qa_mail,
    }
    inject('cloud_functions', $cloud_functions)
    context.$cloud_functions = $cloud_functions
}

/* --------------------------------------------------
    申し込みメール送信
-------------------------------------------------- */
async function send_introduction_mail(input_params) {
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
    var cf_send_introduction_mail = functions.httpsCallable("send_introduction_mail")
    return await cf_send_introduction_mail(call_params)
}

/* --------------------------------------------------
    問い合わせメール送信
-------------------------------------------------- */
async function send_qa_mail(input_params) {
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
    var cf_send_qa_mail = functions.httpsCallable("send_qa_mail")
    return await cf_send_qa_mail(call_params)
}