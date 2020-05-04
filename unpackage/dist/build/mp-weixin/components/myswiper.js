(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/myswiper"],{"06ae":function(t,e,n){"use strict";var a,r=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",function(){return r}),n.d(e,"c",function(){return c}),n.d(e,"a",function(){return a})},"13ac":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"mywiper",data:function(){return{startTime:0,startX:0,startY:0}},methods:{touchstart:function(t){this.startX=t.changedTouches[0].clientX,this.startY=t.changedTouches[0].clientY,this.startTime=Date.now()},touchend:function(t){var e,n=t.changedTouches[0].clientX,a=t.changedTouches[0].clientY,r=Date.now();r-this.startTime>2e3||Math.abs(n-this.startX)>10&&Math.abs(a-this.startY)<10&&(e=n>this.startX?"right":"left",this.$emit("swierAction",{direction:e}))}}};e.default=a},b589:function(t,e,n){"use strict";n.r(e);var a=n("13ac"),r=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);e["default"]=r.a},e3f9:function(t,e,n){"use strict";n.r(e);var a=n("06ae"),r=n("b589");for(var c in r)"default"!==c&&function(t){n.d(e,t,function(){return r[t]})}(c);var i,s=n("f0c5"),u=Object(s["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);e["default"]=u.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/myswiper-create-component',
    {
        'components/myswiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e3f9"))
        })
    },
    [['components/myswiper-create-component']]
]);
