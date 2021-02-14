/*
  --------------------------------------- Firebase Cloud Functions 共通化 ---------------------------------------
*/

import firebase from '@/plugins/firebase'
import const_inner from '@/plugins/const_inner'
import common from '@/plugins/common'

const app = firebase.app()
const functions = app.functions(const_inner.REGION)

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
    var result
    var data
    var message

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
    var response = await cf_send_introduction_mail(call_params)

    result = is_completed_send_mail(response)
    data = null
    if (result == true) {
        message = const_inner.MESSAGES.SUCCESS_SEND_MAIL
    }else{
        message = const_inner.MESSAGES.ERROR_SEND_MAIL
    }
    return common.create_result_obj(result, data, message)
}

/* --------------------------------------------------
    問い合わせメール送信
-------------------------------------------------- */
async function send_qa_mail(input_params) {
    var result
    var data
    var message

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
    var response = await cf_send_qa_mail(call_params)

    result = is_completed_send_mail(response)
    data = null
    if (result == true) {
        message = const_inner.MESSAGES.SUCCESS_SEND_MAIL
    }else{
        message = const_inner.MESSAGES.ERROR_SEND_MAIL
    }
    return common.create_result_obj(result, data, message)
}

// 送信結果確認
function is_completed_send_mail(response) {
    var request = response.data.request
    var juku = response.data.juku
    var success_code = "250 2.0.0 Ok:"
    if (request.response &&
        juku.response &&
        request.response.indexOf(success_code) != -1 &&
        juku.response.indexOf(success_code) != -1) {
        // 送信成功
        return true
    } else {
        // 送信失敗
        return false
    }
}