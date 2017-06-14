/* global screenHeight:true selectize:true, inputMask:true, device:true, $:true */

$ = require("jquery");
selectize = require("selectize");
inputMask = require("jquery-mask-plugin");
Hammer = require("hammerjs");
let FastClick = require("fastclick");

FastClick.attach(document.body);

if (window.innerWidth > 1024) {
	device = "desktop";
} else {
	device = "mobile";
}

screenHeight = $(window).height();

$(document).ready(function() {
	require("./logic.js");
	// require("./input-masks.js");
	require("./realData.js");
	require("./select.js");
	require("./form.js");
	require("./content-initial.js");
});
