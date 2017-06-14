/* global device */

function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

var userData = {
	"seenNotification": false,
	"paymentAmount": null,
	"receiver": ""
};

function activateSmsPopup() {
	$("html, body").animate({scrollTop: 0}, 250);
	$(".popup").addClass("popup--active");
	$(".overlay").addClass("overlay--active");
	$(".input--sms").focus();
}


function updateData() {
	// $(".notification__sum").text(numberWithSpaces(data.seenNotification, 0));
}

function updateStorage() {
	localStorage.setItem("alboPayment", JSON.stringify(data));
	updateData();
}

// Если данных нет, загружаем
if (!localStorage.alboPayment) {
	localStorage.setItem("alboPayment", JSON.stringify(userData));
}

// Получаем данные
let data = JSON.parse(localStorage.getItem("alboPayment"));

// Вбиваем данные
updateData();

// Компании
$("." + device + " .button").click(function () {
	if (!$(this).hasClass("button--disabled")) {
		activateSmsPopup();
	}
});

$(".input-sum .input-text").on("keyup, keydown", function () {
	let paymentAmount = parseInt($(this).val());
	if (isNaN(paymentAmount)) return;
	data.paymentAmount = paymentAmount;
	updateStorage();
});

$(".input-receiver .input-text").on("keyup, keydown", function () {
	let receiver = $(this).val();
	data.receiver = receiver;
	updateStorage();
});

// Нотификации
let notificationTitleText = "";
let notificationDescText = "";
$(".input--sms").keyup(function () {
	var letters = $(this).val().length;
	if (letters == 4) {
		window.location.href = "notification.html";
	}
});

if (data.paymentAmount) {
	let payment = data.paymentAmount;
	let receiver = data.receiver;
	notificationTitleText += "Платёж на сумму&nbsp;"+ numberWithSpaces(payment) + " ₽ успешно отправлен в банк";
	notificationDescText += "После успешной обработки он будет отправлен получателю «" + receiver + "»";
	$(".notification__title").text(notificationTitleText.replace(/&nbsp;/g,"\u00A0"));
	$(".notification__desc").text(notificationDescText.replace(/&nbsp;/g,"\u00A0"));
}

if (!data.seenNotification) {
	$(".notification").addClass("notification--active");
	$(".button-submit").click(function () {
		$(".notification").removeClass("notification--active");
	});
	data.seenNotification = false;
	updateStorage();
}
