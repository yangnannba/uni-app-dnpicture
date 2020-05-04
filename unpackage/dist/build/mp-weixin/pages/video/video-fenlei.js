(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/video/video-fenlei"],{"0d0a":function(t,e,n){},"4e40":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"videocategory",data:function(){return{category:[]}},methods:{getcategory:function(){var e=this;t.request({url:"http://157.122.54.189:9088/videoimg/v1/videowp/category",success:function(t){e.category=t.data.res.category}})},tocategory:function(e){t.navigateTo({url:"./videoCategory/videoCategory?id="+e})}},mounted:function(){this.getcategory()}};e.default=n}).call(this,n("543d")["default"])},9563:function(t,e,n){"use strict";var a=n("0d0a"),o=n.n(a);o.a},abdb:function(t,e,n){"use strict";n.r(e);var a=n("e6ef"),o=n("c6d2");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("9563");var r,c=n("f0c5"),i=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=i.exports},c6d2:function(t,e,n){"use strict";n.r(e);var a=n("4e40"),o=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=o.a},e6ef:function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return u}),n.d(e,"a",function(){return a})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/video/video-fenlei-create-component',
    {
        'pages/video/video-fenlei-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("abdb"))
        })
    },
    [['pages/video/video-fenlei-create-component']]
]);
