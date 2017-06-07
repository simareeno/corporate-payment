/* global data:true, accounts:true, device */

function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

let notificationData;

function activateSmsPopup() {
	$("html, body").animate({scrollTop: 0}, 250);
	$(".popup").addClass("popup--active");
	$(".overlay").addClass("overlay--active");
	$(".input--sms").focus();
}

// Компании
$("." + device + " .button").click(function () {
	if (!$(this).hasClass("button--disabled")) {
		activateSmsPopup();
	}
});
