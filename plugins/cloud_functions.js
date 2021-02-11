/* ----------------------------------------------------
    Firebase Cloud Functions 共通化
---------------------------------------------------- */

import firebase from '@/plugins/firebase'

const app = firebase.app()
const functions = app.functions("asia-northeast1")  //TODO:const.jsから呼び出せる?

export default (context, inject) => {    
    const $cloud_functions = {
        send_introduction_mail: functions.httpsCallable("send_introduction_mail"),
        send_qa_mail: functions.httpsCallable("send_qa_mail"),
    }
    inject('cloud_functions', $cloud_functions)
    context.$cloud_functions = $cloud_functions
}