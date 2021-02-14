/*
  --------------------------------------- Firebase Cloud Firestore 共通化 ---------------------------------------
*/

import firebase from '@/plugins/firebase'
import const_inner from '@/plugins/const_inner'
import common from '@/plugins/common'

const firestore = firebase.firestore()
const collection_juku_head = firestore.collection('juku_head')

export default (context, inject) => {    
    const $cloud_firestore = {
        insert_juku_head: insert_juku_head,
        update_juku_head: update_juku_head,
        fetch_juku_head: fetch_juku_head,
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
    var result
    var data
    var message

    var response = await collection_juku_head.doc(juku_cd).get()
    if (response.exists == true) {
        // 取得成功
        var juku_head = response.data()
        if (juku_head.del_flg == false) {
            // 通常データ
            result = true
            data = juku_head
            message = ""
        } else {
            // 削除済みデータ
            result = false
            data = null
            message = "塾情報：" + const_inner.MESSAGES.ERROR_DB_SELECT
        }
    } else {
        // 取得失敗
        result = false
        data = null
        message = "塾情報：" + const_inner.MESSAGES.ERROR_DB_SELECT
    }

    return common.create_result_obj(result, data, message)
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