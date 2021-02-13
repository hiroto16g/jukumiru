/*
  --------------------------------------- Firebase Cloud Firestore 共通化 ---------------------------------------
*/

import firebase from '@/plugins/firebase'

const firestore = firebase.firestore()
const collection_jukus = firestore.collection('jukus')

export default (context, inject) => {    
    const $cloud_firestore = {
        insert_juku: insert_juku,
        update_juku: update_juku,
        get_juku: get_juku,
    }
    inject('cloud_firestore', $cloud_firestore)
    context.$cloud_firestore = $cloud_firestore
}

/* --------------------------------------------------
    塾基本情報
-------------------------------------------------- */
// 追加
async function insert_juku(input_params) {
    var juku_cd = input_params.juku_cd
    var name = input_params.name

    await collection_jukus.doc(juku_cd).set(
        {
            name: name,
        }
    )
}
// 更新
async function update_juku(input_params) {
    var juku_cd = input_params.juku_cd
    var name = input_params.name

    await collection_jukus.doc(juku_cd).update(
        {
            name: name,
        }
    )
}
// 取得
async function get_juku(juku_cd) {
    return await collection_jukus.doc(juku_cd).get()
}

