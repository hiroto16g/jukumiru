/*
  --------------------------------------- plugins共通関数 ---------------------------------------
*/

export default {
    create_result_obj: create_result_obj
}

/*
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