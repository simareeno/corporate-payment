$(".folder__top").click(function () {
	let folder = $(this).parent(".folder");
	folder.toggleClass("folder--active");
});

let fastAction = $(".mobile .fast-action");

function showFastAction() {
	fastAction.addClass("fast-action--active");
}

function hideFastAction() {
	fastAction.removeClass("fast-action--active");
}

showFastAction();
