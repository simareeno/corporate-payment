$(".folder__top").click(function () {
	let folder = $(this).parent(".folder");
	folder.toggleClass("folder--active");
});

$('.info__content').hide();

$(".info").click(function () {
	let info = $(this);
	let content = $(this).find(".info__content");
	if (info.hasClass("info--active")) {
		info.removeClass("info--active");
		setTimeout(function () {
			content.hide();
		}, 200);
	} else {
		content.show();
		info.addClass("info--active");
	}
});
