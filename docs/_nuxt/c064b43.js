(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{277:function(t,e,n){t.exports=n.p+"img/logo_icon_white.ad65681.png"},284:function(t,e,n){var content=n(319);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(18).default)("4496348c",content,!0,{sourceMap:!1})},318:function(t,e,n){"use strict";n(284)},319:function(t,e,n){(e=n(17)(!1)).push([t.i,"#qr{border:thin solid #ddd;margin:10px}",""]),t.exports=e},346:function(t,e,n){"use strict";n.r(e);n(32);var o=n(5),r=n(84),c=(n(67),n(279)),l=n.n(c),d={data:function(){return{items:[{title:"",text:""}],item:{title:"",text:""},json:"",qr_url:null,canvas_size:{width:250,height:250},logo_size:{width:80,height:80}}},methods:{add_items:function(){this.items.push(this.item)},save_items:function(){var t=r.a.storage().ref().child("json_source/test_1/info.json"),e=new Blob([JSON.stringify(this.items)],{type:"application/json"});t.put(e).then((function(t){alert("uploaded")}))},generate_qrcord:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.toDataURL("192.168.0.23"+t.$route.path,{errorCorrectionLevel:"H"}).then((function(e){t.qr_url=e})).catch((function(t){console.error(t)}));case 2:t.draw_qrcord();case 3:case"end":return e.stop()}}),e)})))()},draw_qrcord:function(){var t=this,e=document.getElementById("qr").getContext("2d"),o=new Image;o.src=this.qr_url,o.onload=function(){e.drawImage(o,0,0,t.canvas_size.width,t.canvas_size.height)};var r=new Image;r.src=n(277),r.onload=function(){e.drawImage(r,(t.canvas_size.width-t.logo_size.width)/2,(t.canvas_size.height-t.logo_size.height)/2,t.logo_size.width,t.logo_size.height)}}},beforeMount:function(){}},v=(n(318),n(7)),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sign_in"},[n("div",{staticClass:"add_items",on:{click:t.add_items}},[n("button",[t._v("add")])]),t._v(" "),n("div",{staticClass:"inputs"},t._l(t.items,(function(i,e){return n("div",{key:e,staticClass:"item"},[n("input",{directives:[{name:"model",rawName:"v-model",value:i.title,expression:"i.title"}],attrs:{type:"text"},domProps:{value:i.title},on:{input:function(e){e.target.composing||t.$set(i,"title",e.target.value)}}}),n("br"),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:i.text,expression:"i.text"}],attrs:{name:"",id:"",cols:"30",rows:"10"},domProps:{value:i.text},on:{input:function(e){e.target.composing||t.$set(i,"text",e.target.value)}}})])})),0),t._v(" "),n("div",{staticClass:"save"},[n("button",{on:{click:t.save_items}},[t._v("save")])]),t._v("\n    "+t._s(t.json)+"\n    "),n("button",{on:{click:t.generate_qrcord}},[t._v("generate qrcord")]),n("br"),t._v(" "),n("canvas",{attrs:{id:"qr",width:t.canvas_size.width,height:t.canvas_size.height}})])}),[],!1,null,null,null);e.default=component.exports}}]);