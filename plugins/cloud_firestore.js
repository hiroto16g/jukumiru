/*
  --------------------------------------- Firebase Cloud Firestore 共通化 ---------------------------------------
*/

import firebase from '@/plugins/firebase'
import common from '@/plugins/common'

const firestore = firebase.firestore()
const collection_juku_head = firestore.collection('juku_head')
const collection_juku_info = firestore.collection('juku_info')
const collection_juku_fee = firestore.collection('juku_fee')
const collection_juku_qa = firestore.collection('juku_qa')

export default (context, inject) => {    
    const $cloud_firestore = {
        // 塾ヘッダー情報
        insert_juku_head: insert_juku_head,
        update_juku_head: update_juku_head,
        fetch_juku_head: fetch_juku_head,

        // 塾基本情報
        insert_juku_info: insert_juku_info,
        update_juku_info: update_juku_info,
        select_juku_info: select_juku_info,

        // 塾料金情報
        insert_juku_fee: insert_juku_fee,
        update_juku_fee: update_juku_fee,
        select_juku_fee: select_juku_fee,

        // 塾Q&A情報
        insert_juku_qa: insert_juku_qa,
        update_juku_qa: update_juku_qa,
        select_juku_qa: select_juku_qa,
    }
    inject('cloud_firestore', $cloud_firestore)
    context.$cloud_firestore = $cloud_firestore
}

/* --------------------------------------------------
    塾ヘッダー情報
-------------------------------------------------- */
// 追加
async function insert_juku_head(input_params) {
    var juku_cd = input_params.juku_cd
    input_params.del_flg = false
    var juku_head = create_juku_head(input_params)
    await collection_juku_head.doc(juku_cd).set(juku_head)
}

// 更新
async function update_juku_head(input_params) {
    var juku_cd = input_params.juku_cd
    var juku_head = create_juku_head(input_params)
    await collection_juku_head.doc(juku_cd).update(juku_head)
}

// 取得
async function fetch_juku_head(juku_cd) {
    var response = await collection_juku_head.doc(juku_cd).get()
    return common.create_result_fetch(response)
}

// 塾ヘッダーオブジェクト生成
function create_juku_head(input_params) {
    var name = input_params.name
    var prefecture = input_params.prefecture
    var city = input_params.city
    var address_line = input_params.address_line
    var latitude = input_params.latitude
    var longitude = input_params.longitude
    var rate = input_params.rate
    var n_evals = input_params.n_evals
    var bio = input_params.bio
    var tel = input_params.tel
    var email = input_params.email
    var del_flg = input_params.del_flg
    
    var juku_head = {
        name: name,
        prefecture: prefecture,
        city: city,
        address_line: address_line,
        coordination: {
            latitude: latitude,
            longitude: longitude,  
        },
        star_rating: {
            rate: rate,
            n_evals: n_evals,  
        },
        bio: bio,
        tel: tel,
        email: email,
        del_flg: del_flg,
    }

    return juku_head
}

/* --------------------------------------------------
    塾基本情報
-------------------------------------------------- */
// 追加
async function insert_juku_info(input_params) {
    input_params.del_flg = false
    var juku_info = create_juku_standard_obj(input_params)
    await collection_juku_info.doc().set(juku_info)
}

// 更新
async function update_juku_info(input_params) {
    var id = input_params.id
    var juku_info = create_juku_standard_obj(input_params)
    await collection_juku_info.doc(id).update(juku_info)
}

// 取得
async function select_juku_info(juku_cd) {
    var response = await collection_juku_info.where('juku_cd', '==', juku_cd).get()
    return common.create_result_select(response)
}

/* --------------------------------------------------
    塾料金情報
-------------------------------------------------- */
// 追加
async function insert_juku_fee(input_params) {
    input_params.del_flg = false
    var juku_fee = create_juku_standard_obj(input_params)
    await collection_juku_fee.doc().set(juku_fee)
}

// 更新
async function update_juku_fee(input_params) {
    var id = input_params.id
    var juku_fee = create_juku_standard_obj(input_params)
    await collection_juku_fee.doc(id).update(juku_fee)
}

// 取得
async function select_juku_fee(juku_cd) {
    var response = await collection_juku_fee.where('juku_cd', '==', juku_cd).get()
    return common.create_result_select(response)
}

/* --------------------------------------------------
    塾Q&A情報
-------------------------------------------------- */
// 追加
async function insert_juku_qa(input_params) {
    input_params.del_flg = false
    var juku_qa = create_juku_standard_obj(input_params)
    await collection_juku_qa.doc().set(juku_qa)
}

// 更新
async function update_juku_qa(input_params) {
    var id = input_params.id
    var juku_qa = create_juku_standard_obj(input_params)
    await collection_juku_qa.doc(id).update(juku_qa)
}

// 取得
async function select_juku_qa(juku_cd) {
    var response = await collection_juku_qa.where('juku_cd', '==', juku_cd).get()
    return common.create_result_select(response)
}

/* --------------------------------------------------
    共通処理
-------------------------------------------------- */
// 塾情報標準オブジェクト生成
function create_juku_standard_obj(input_params) {
    var juku_cd = input_params.juku_cd
    var title = input_params.title
    var text = input_params.text
    var del_flg = input_params.del_flg
    
    var juku_standard_obj = {
        juku_cd: juku_cd,
        title: title,
        text: text,
        del_flg: del_flg,
    }

    return juku_standard_obj
}