!function i(t,o,c){function u(n,r){if(!o[n]){if(!t[n]){var e="function"==typeof require&&require;if(!r&&e)return e(n,!0);if(f)return f(n,!0);throw(r=new Error("Cannot find module '"+n+"'")).code="MODULE_NOT_FOUND",r}e=o[n]={exports:{}},t[n][0].call(e.exports,function(r){return u(t[n][1][r]||r)},e,e.exports,i,t,o,c)}return o[n].exports}for(var f="function"==typeof require&&require,r=0;r<c.length;r++)u(c[r]);return u}({1:[function(r,n,e){$(function(){var r=$(".sideBar"),n=$(".sideBar-content");function e(){r.toggleClass("sideBar_visible")}$(".js-sideBarCtrl").click(e),n.click(function(r){r.stopPropagation()}),r.click(e)})},{}],2:[function(r,n,e){r("./block/sideBar")},{"./block/sideBar":1}]},{},[2]);
//# sourceMappingURL=main.js.map