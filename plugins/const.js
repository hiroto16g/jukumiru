/*
  --------------------------------------- 共通定数 ---------------------------------------
*/

import const_json from '@/plugins/const.json'

export default (context, inject) => {    
    const $const = const_json
    inject('const', $const)
    context.$const = $const
}