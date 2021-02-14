import firebase from '@/plugins/firebase'

export const state = () => ({
    uid: '',
    email: '',
    message: '',
})

export const mutations = {
    sign_in_success(state, user) {
        state.uid = user.uid
        state.email = user.email
        state.message = ''
    },
    sign_in_error(state) {
        state.uid = ''
        state.email = ''
        console.log(this.$const)
        state.message = this.$const.MESSAGES.ERROR_SIGN_IN
    },
}

export const actions = {
    /* --------------------------------------------------
        サインイン
    -------------------------------------------------- */
    async sign_in({ commit }, input_params) {
        var email = input_params.email
        var password = input_params.password
        var router = input_params.router

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((data) => {
                commit("sign_in_success", data.user);
                router.push('/account')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                commit("sign_in_error");
            });
    }
}