(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{290:function(e,t,r){var content=r(340);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(18).default)("4673f3e1",content,!0,{sourceMap:!1})},336:function(e,t,r){var map={"./test_1/review.json":337,"./test_2/review.json":338};function n(e){var t=o(e);return r(t)}function o(e){if(!r.o(map,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return map[e]}n.keys=function(){return Object.keys(map)},n.resolve=o,e.exports=n,n.id=336},337:function(e){e.exports=JSON.parse('[{"title":"とても面白い先生でした！","star_rating":5,"status":"中学3年生","text":"高校受験のために夏休みから通い始めました。学校よりも先生と近くて話しやすくてよかったです！苦手な社会を教えてもらっていたのですが、先生の教え方がうまくて面白くて、今では一番好きな教科です！ありがとうございました！"},{"title":"動画で見た通りでよかった","star_rating":5,"status":"保護者","text":"塾紹介の動画を拝見して、息子に合ってそうだと思い、入塾させました。申し込みの時にしか塾へ伺っていないので、塾の雰囲気や先生方の教え方が動画の通りなのか少し不安がありましたが、息子の話を聞く限り大丈夫だったようです。まだ入塾してから一か月しかたっていなく、成績の上昇は感じられませんが、期待を込めて星４とさせていただきます"}]')},338:function(e){e.exports=JSON.parse('[{"title":"とても面白い先生でした！","star_rating":5,"status":"中学3年生","text":"高校受験のために夏休みから通い始めました。学校よりも先生と近くて話しやすくてよかったです！苦手な社会を教えてもらっていたのですが、先生の教え方がうまくて面白くて、今では一番好きな教科です！ありがとうございました！"},{"title":"動画で見た通りでよかった","star_rating":5,"status":"保護者","text":"塾紹介の動画を拝見して、息子に合ってそうだと思い、入塾させました。申し込みの時にしか塾へ伺っていないので、塾の雰囲気や先生方の教え方が動画の通りなのか少し不安がありましたが、息子の話を聞く限り大丈夫だったようです。まだ入塾してから一か月しかたっていなく、成績の上昇は感じられませんが、期待を込めて星４とさせていただきます"}]')},339:function(e,t,r){"use strict";r(290)},340:function(e,t,r){(t=r(17)(!1)).push([e.i,"body{color:#333;font-size:3.6vw}textarea{resize:none}input,textarea{-webkit-appearance:none}@media screen and (max-width:767px){body{font-size:3.6vw}.pc{display:none}}@media screen and (min-width:calc(767px + 1px)){body{font-size:16px}.sp{display:none}}@media screen and (max-width:767px){.jp__review{margin:0 4vw 10vh}.jp__review .n_reviews{color:#888;font-size:3.2vw;margin-bottom:8vw}.jp__review .reviews{color:#333}.jp__review .reviews .review{margin-bottom:8vw}.jp__review .reviews .review .title{font-size:4.2vw;margin-bottom:.3vw}.jp__review .reviews .review .status{color:#888;margin-top:.8vw}.jp__review .reviews .review .text{font-size:3.6vw;margin:2vw 4vw 0;line-height:1.5;letter-spacing:.06em}}@media screen and (min-width:calc(767px + 1px)){.jp__review{margin:auto;width:600px}.jp__review .n_reviews{color:#888;font-size:12px;margin-bottom:50px}.jp__review .reviews{color:#333}.jp__review .reviews .review{margin-bottom:30px}.jp__review .reviews .review .title{font-size:22px;margin-bottom:3px}.jp__review .reviews .review .status{color:#888;margin-top:5px}.jp__review .reviews .review .text{font-size:16px;margin:10px 20px 0;line-height:1.5;letter-spacing:.06em}}",""]),e.exports=t},352:function(e,t,r){"use strict";r.r(t);var n={layout:"jukuPage",components:{StarRating:r(88).default},data:function(){return{reviews:null}},methods:{},mounted:function(){this.reviews=r(336)("./"+this.$store.state.juku.id+"/review.json")}},o=(r(339),r(7)),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"jp__review"},[r("div",{staticClass:"reviews"},e._l(e.reviews,(function(t,i){return r("div",{key:i,staticClass:"review"},[r("div",{staticClass:"title"},[e._v("\n                "+e._s(t.title)+"\n            ")]),e._v(" "),r("StarRating",{attrs:{rate:t.star_rating,n_evals:"1",display:"rate"}}),e._v(" "),r("div",{staticClass:"status"},[e._v("\n                入塾時の学年："+e._s(t.status)+"\n            ")]),e._v(" "),r("div",{staticClass:"text"},[e._v("\n                "+e._s(t.text)+"\n            ")])],1)})),0)])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{StarRating:r(88).default})}}]);