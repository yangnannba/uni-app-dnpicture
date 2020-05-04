(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index-fenlei"],{"1a50":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"fenlei",data:function(){return{category:[]}},methods:{getcategory:function(){var e=this;t.request({url:"http://157.122.54.189:9088/image/v1/vertical/category",success:function(t){e.category=t.data.res.category}})},tocategory:function(e){t.navigateTo({url:"./prctureCategory/prctureCategory?id="+e})}},mounted:function(){t.setNavigationBarTitle({title:"分类"}),this.getcategory()}};e.default=n}).call(this,n("543d")["default"])},"29bb":function(t,e,n){"use strict";n.r(e);var a=n("a56b"),r=n("c95f");for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);n("956e");var c,i=n("f0c5"),o=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);e["default"]=o.exports},"956e":function(t,e,n){"use strict";var a=n("e9fe"),r=n.n(a);r.a},a56b:function(t,e,n){"use strict";var a,r=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",function(){return r}),n.d(e,"c",function(){return u}),n.d(e,"a",function(){return a})},c95f:function(t,e,n){"use strict";n.r(e);var a=n("1a50"),r=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=r.a},e9fe:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/index/index-fenlei-create-component',
    {
        'pages/index/index-fenlei-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("29bb"))
        })
    },
    [['pages/index/index-fenlei-create-component']]
]);
