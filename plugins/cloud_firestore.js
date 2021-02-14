/*
  --------------------------------------- Firebase Cloud Firestore 共通化 ---------------------------------------
*/

import firebase from '@/plugins/firebase'
import const_inner from '@/plugins/const_inner'
import common from '@/plugins/common'

const firestore = firebase.firestore()
const collection_jukus = firestore.collection('jukus')

export default (context, inject) => {    
    const $cloud_firestore = {
        insert_juku: insert_juku,
        update_juku: update_juku,
        fetch_juku: fetch_juku,
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
    input_params.del_flg = false
    var juku_obj = create_juku_obj(input_params)
    await collection_jukus.doc(juku_cd).set(juku_obj)
}

// 更新
async function update_juku(input_params) {
    var juku_cd = input_params.juku_cd
    var juku_obj = create_juku_obj(input_params)
    await collection_jukus.doc(juku_cd).update(juku_obj)
}

// 取得
async function fetch_juku(juku_cd) {
    var result
    var data
    var message

    var response = await collection_jukus.doc(juku_cd).get()
    if (response.exists == true) {
        // 取得成功
        var juku = response.data()
        if (juku.del_flg == false) {
            // 通常データ
            result = true
            data = juku
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

// 塾オブジェクト生成
function create_juku_obj(input_params) {
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
    
    var juku = {
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

    return juku
}

