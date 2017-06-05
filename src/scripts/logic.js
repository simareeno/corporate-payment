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
