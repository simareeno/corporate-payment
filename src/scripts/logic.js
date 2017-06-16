// INPUTS

$( ".input-text" ).focus(function() {
	$( this ).next( ".input__desc" ).addClass( "input__desc--active" );
});

$( ".input-text" ).blur(function() {
	let inputText = $(this).val();
	if (inputText.length == 0) {
		$( this ).next( ".input__desc" ).removeClass( "input__desc--active" );
	}
});


// SMS

$(".overlay, .popup__close").click(function () {
	$(".popup").removeClass("popup--active");
	$(".overlay").removeClass("overlay--active");
});

$(".input--sms").keyup(function () {
	var letters = $(this).val().length;
	if (letters == 4) {
		window.location.href = "notification.html";
	}
});

// Suggest

let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
let suggestTop = document.querySelector(".mobile .suggest-top");
let suggestBottom = document.querySelector(".mobile .suggest-bottom");
if (suggestBottom) {
	suggestBottom.style.transform = "translateY(" + screenHeight + "px)";
}


function showSuggest(input) {
	let bottomFromTop = 120;
	let topFromTop = 0;
	let pxToTop = input.offset().top;
	let top = $(window).scrollTop();

	if (iOS) {
		bottomFromTop = -top + 300;
		topFromTop = -top + 200;
	} else {
		$("body").stop().animate({scrollTop:pxToTop - 70}, 200, "swing");
	}

	suggestTop.style.transform = "translateY(" + topFromTop + "px)";
	suggestTop.style.visibility = "visible";
	suggestTop.style.height = "44px";
	suggestTop.style.padding = "12px";

	suggestBottom.style.transform = "translateY(" + bottomFromTop + "px)";
	suggestBottom.style.visibility = "visible";
	suggestBottom.style.height = "100%";
	suggestBottom.style.padding = "12px";
}

function hideSuggest(input) {
	let pxToTop = input.offset().top;
	suggestTop.style.transform = "translateY(-" + pxToTop + "px)";
	suggestBottom.style.transform = "translateY(" + screenHeight + "px)";

	setTimeout(function () {
		suggestTop.style.visibility = "hidden";
		suggestTop.style.height = "0";
		suggestTop.style.padding = "0";

		suggestBottom.style.visibility = "hidden";
		suggestBottom.style.height = "0";
		suggestBottom.style.padding = "0";
	}
	, 200);
}

$(".input-receiver .input-text").focus(function () {
	showSuggest($(this));
});

$(".input-receiver .input-text").blur(function () {
	let thisInput = $(this);
	hideSuggest(thisInput);
});

$(".suggest-top__close").click(function () {
	hideSuggest($(this));
});

$(".suggest-single").mousedown(function () {
	let suggestTitle = $(this).find(".suggest-single__title").text();
	$(".input-receiver .input-text").val(suggestTitle);
	$(".input-receiver .input__desc").addClass( "input__desc--active" );
	hideSuggest($(this));
});


// Кнопки в форме

function checkIfItsFine() {
	let weCanCheck = true;

	let neededFields = [
		".input-receiver .input-text",
		".input-inn .input-text",
		".input-kpp .input-text",
		".input-bik .input-text",
		".input-sum .input-text",
		".input-towhom .input-text"
	];

	for (var i = 0; i < neededFields.length; i++) {
		let field = $(neededFields[i]);

		if (field.length == 0) {
			continue;
		}

		let val = field.val();

		if (val.length === 0) {
			weCanCheck = false;
		}
	}

	return weCanCheck;
}

$(".input-text").keyup(function() {
	let weAreRdy = checkIfItsFine();
	if (weAreRdy) {
		makeButtonsActive();
	} else {
		makeButtonsInactive();
	}
});

function makeButtonsActive() {
	$(".button").removeClass("button--disabled");
	showFastAction();
}

function makeButtonsInactive() {
	$(".button").addClass("button--disabled");
	hideFastAction();
}

let fastAction = $(".mobile .fast-action");

function showFastAction() {
	fastAction.addClass("fast-action--active");
}

function hideFastAction() {
	fastAction.removeClass("fast-action--active");
}

function getHeight() {
	return Math.max( document.body.scrollHeight, document.body.offsetHeight );
}

window.onscroll = function () {
	let scrollTop = window.pageYOffset;
	let documentHeight = getHeight();
	let weAreRdy = checkIfItsFine();
	if ((documentHeight - scrollTop) < screenHeight + 200) {
		hideFastAction();
	} else {
		if (weAreRdy) {
			showFastAction();
		}
	}
};
