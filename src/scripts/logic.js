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
