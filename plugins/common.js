/*
  --------------------------------------- plugins共通関数 ---------------------------------------
*/
import const_inner from '@/plugins/const_inner'

export default {
    create_result_obj: create_result_obj,
    create_result_select: create_result_select,
    crete_result_fetch: crete_result_fetch,
}

/*
    共通のレスポンスオブジェクトを生成
    result: ブール値
    data: メインオブジェクト
    messages: メッセージ文字列
*/
function create_result_obj(result, data, message) {
    var result_obj = {
        result: result,
        data: data,
        message: message,
    }
    return result_obj
}

/*
    Firestoreでfetch時のレスポンスオブジェクトを生成
    response: Firestoreからのレスポンス
*/
function crete_result_fetch(response) {
    var result
    var data
    var message

    if (response.exists == true) {
        // 取得成功
        var id = response.id
        var fetch_detail = response.data()
        fetch_detail.id = id
        if (fetch_detail.del_flg == false) {
            // 通常データ
            result = true
            data = fetch_detail
            message = ""
        } else {
            // 削除済みデータ
            result = false
            data = null
            message = const_inner.MESSAGES.ERROR_DB_SELECT
        }
    } else {
        // 取得失敗
        result = false
        data = null
        message = const_inner.MESSAGES.ERROR_DB_SELECT
    }

    return create_result_obj(result, data, message)
}

/*
    Firestoreでselect時のレスポンスオブジェクトを生成
    response: Firestoreからのレスポンス
*/
function create_result_select(response) {
    var result
    var data
    var message

    if (response.empty == false) {
        var select_detail_list = [];
        response.forEach(function (select_data) {
            var id = select_data.id
            var select_detail = select_data.data()
            select_detail.id = id
            if (select_detail.del_flg == false) {
                // 通常データ
                select_detail_list.push(select_detail)
            } else {
                // 削除済みデータ
            }
        })
        result = true
        data = select_detail_list
        message = ""
    } else {
        // 取得失敗
        result = false
        data = null
        message = const_inner.MESSAGES.ERROR_DB_SELECT
    }

    return create_result_obj(result, data, message)
}