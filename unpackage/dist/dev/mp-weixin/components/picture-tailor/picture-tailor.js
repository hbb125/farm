(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/picture-tailor/picture-tailor"],{262:
/*!**********************************************************************!*\
  !*** E:/桌面/菜商宝小程序/farm/components/picture-tailor/picture-tailor.vue ***!
  \**********************************************************************/
/*! no static exports found */function(t,i,e){"use strict";e.r(i);var n=e(/*! ./picture-tailor.vue?vue&type=template&id=4f92b704& */263),c=e(/*! ./picture-tailor.vue?vue&type=script&lang=js& */265);for(var r in c)"default"!==r&&function(t){e.d(i,t,(function(){return c[t]}))}(r);e(/*! ./picture-tailor.vue?vue&type=style&index=0&lang=css& */267);var a,s=e(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */14),o=Object(s["default"])(c["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],a);o.options.__file="components/picture-tailor/picture-tailor.vue",i["default"]=o.exports},263:
/*!*****************************************************************************************************!*\
  !*** E:/桌面/菜商宝小程序/farm/components/picture-tailor/picture-tailor.vue?vue&type=template&id=4f92b704& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,i,e){"use strict";e.r(i);var n=e(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./picture-tailor.vue?vue&type=template&id=4f92b704& */264);e.d(i,"render",(function(){return n["render"]})),e.d(i,"staticRenderFns",(function(){return n["staticRenderFns"]})),e.d(i,"recyclableRender",(function(){return n["recyclableRender"]})),e.d(i,"components",(function(){return n["components"]}))},264:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/桌面/菜商宝小程序/farm/components/picture-tailor/picture-tailor.vue?vue&type=template&id=4f92b704& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,i,e){"use strict";var n;e.r(i),e.d(i,"render",(function(){return c})),e.d(i,"staticRenderFns",(function(){return a})),e.d(i,"recyclableRender",(function(){return r})),e.d(i,"components",(function(){return n}));var c=function(){var t=this,i=t.$createElement;t._self._c},r=!1,a=[];c._withStripped=!0},265:
/*!***********************************************************************************************!*\
  !*** E:/桌面/菜商宝小程序/farm/components/picture-tailor/picture-tailor.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! no static exports found */function(t,i,e){"use strict";e.r(i);var n=e(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./picture-tailor.vue?vue&type=script&lang=js& */266),c=e.n(n);for(var r in n)"default"!==r&&function(t){e.d(i,t,(function(){return n[t]}))}(r);i["default"]=c.a},266:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/桌面/菜商宝小程序/farm/components/picture-tailor/picture-tailor.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=240,n=0,c=0,r={name:"picture-tailor",props:{pictureSrc:{type:String,required:!0}},data:function(){return{offsetX:0,offsetY:0,img_width:0,img_height:0,img_scaling:1,scale:1,scaleMin:.5,isShow:!1,flag_bright:!1}},watch:{pictureSrc:function(){this.getImgInfo()}},methods:{show:function(){this.isShow=!0},hide:function(){this.isShow=!1},getImgInfo:function(){var i=this;t.showLoading({title:"加载中"}),t.getImageInfo({src:this.pictureSrc,success:function(r){i.img_width=r.width,i.img_height=r.height;var a=t.getSystemInfoSync(),s=a.windowWidth;a.windowHeight;if(i.img_width<e||i.img_height<e){var o=i.img_width<=i.img_height?i.img_width:i.img_height;i.img_scaling=o/e,i.scaleMin=1}else if(i.img_width>s&&i.img_width<=i.img_height)i.img_scaling=i.img_width/s,i.scaleMin=e/s;else{var u=i.img_width<=i.img_height?i.img_width:i.img_height;i.scaleMin=e/u}i.offsetX=-(i.img_width/i.img_scaling/2-e/2),i.offsetY=-(i.img_height/i.img_scaling/2-e/2),n=i.offsetX,c=i.offsetY,t.hideLoading()}})},movableChange:function(t){n=t.detail.x,c=t.detail.y},movableScale:function(t){n=t.detail.x,c=t.detail.y,this.scale=t.detail.scale},moveHandle:function(){clearTimeout("timer"),this.flag_bright=!0},moveEndHandle:function(){var t=this;setTimeout((function(){t.flag_bright=!1}),1500)},createImg:function(){var i=this,r=t.createCanvasContext("picture-canvas",this);r.drawImage(this.pictureSrc,n,c,this.img_width/this.img_scaling*this.scale,this.img_height/this.img_scaling*this.scale),r.draw(!1,(function(){t.canvasToTempFilePath({destWidth:e/2,destHeight:e/2,canvasId:"picture-canvas",success:function(t){i.hide(),i.$emit("createImg",t.tempFilePath),r.draw()}},i)}))},cancel:function(){this.isShow=!1,t.hideLoading()}}};i.default=r}).call(this,e(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},267:
/*!*******************************************************************************************************!*\
  !*** E:/桌面/菜商宝小程序/farm/components/picture-tailor/picture-tailor.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************/
/*! no static exports found */function(t,i,e){"use strict";e.r(i);var n=e(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./picture-tailor.vue?vue&type=style&index=0&lang=css& */268),c=e.n(n);for(var r in n)"default"!==r&&function(t){e.d(i,t,(function(){return n[t]}))}(r);i["default"]=c.a},268:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/桌面/菜商宝小程序/farm/components/picture-tailor/picture-tailor.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,i,e){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/picture-tailor/picture-tailor.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/picture-tailor/picture-tailor-create-component',
    {
        'components/picture-tailor/picture-tailor-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(262))
        })
    },
    [['components/picture-tailor/picture-tailor-create-component']]
]);
