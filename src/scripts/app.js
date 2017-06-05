/* global selectize:true, inputMask:true, device:true, $:true */

$ = require("jquery");
selectize = require("selectize");
inputMask = require("jquery-mask-plugin");
var FastClick = require("fastclick");

FastClick.attach(document.body);

if (window.innerWidth > 1024) {
	device = "desktop";
} else {
	device = "mobile";
}

$(document).ready(function() {
	require("./logic.js");
	// require("./input-masks.js");
	// require("./realData.js");
	require('./select.js');
});
