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
