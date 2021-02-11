/* ----------------------------------------------------
    共通定数
---------------------------------------------------- */

export default (context, inject) => {    
    const $const = {
        MESSAGES : {
            ERROR_SIGN_IN : "メールアドレスまたはパスワードが間違っています。",
        },
        REGION: "asia-northeast1",
    }
    inject('const', $const)
    context.$const = $const
}
