// TABS

$(".tab-templates").click(function () {
	$(".payments-lists--templates").show();
	$(".payments-lists--repeat").hide();
	$(this).addClass("tab--active");
	$(".tab-repeat").removeClass("tab--active");
	$(".tabs__current").addClass("tabs__current--2");
});

$(".tab-repeat").click(function () {
	$(".payments-lists--repeat").show();
	$(".payments-lists--templates").hide();
	$(this).addClass("tab--active");
	$(".tab-templates").removeClass("tab--active");
	$(".tabs__current").removeClass("tabs__current--2");
});


// OVERLAP

let templates = document.querySelector(".mobile .templates");
let mobile = document.querySelector(".mobile");

function showTemplates() {
	templates.style.transform = "translateY(" + 60 + "px)";
	templates.style.visibility = "visible";
	templates.style.height = "100%";
	templates.style.padding = "12px";
	mobile.style.position = "fixed";
}

function hideTemplates() {
	templates.style.transform = "translateY(" + screenHeight + "px)";
	setTimeout(function () {
		templates.style.visibility = "hidden";
		templates.style.height = "0";
		templates.style.padding = "0";
		mobile.style.position = "relative";
	}
	, 650);
}

hideTemplates();

$(".row__favorites").click(function () {
	showTemplates();
});

$(".templates").click(function (e) {
	e.preventDefault();
	hideTemplates();
});
