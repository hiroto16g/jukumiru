export default (context, inject) => {
    /* 関数版
    const TEST_FUNC = (msg) => {
        console.log(`Hello ${msg}!`)
    }
    inject('TEST_FUNC', TEST_FUNC)
    context.$TEST_FUNC = TEST_FUNC
    */

    const MESSAGES = {
        ERROR_SIGN_IN : "メールアドレスまたはパスワードが間違っています。",
    }
    inject('MESSAGES', MESSAGES)
    context.$MESSAGES = MESSAGES
}
