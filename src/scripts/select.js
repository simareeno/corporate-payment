$(".select").selectize({
	persist: false,
    maxItems: 1,
    valueField: 'item',
    labelField: 'item',
    searchField: ['item'],
	onFocus: function () {
		let thisInput = $(this.$wrapper);
		thisInput.next( ".select-desc" ).addClass( "select-desc--active" );
	},
	onBlur: function () {
		let thisInput = $(this.$wrapper);
		if (this.caretPos === 0) {
			thisInput.next( ".select-desc" ).removeClass( "select-desc--active" );
		}
	}
});

$(".select-status").selectize({
	persist: false,
    maxItems: 1,
    valueField: 'item',
    labelField: 'item',
    searchField: ['item'],
	options: [
		{item: "1"},
		{item: "2"},
		{item: "3"},
		{item: "4"},
		{item: "5"},
		{item: "6"}
	],
	render: {
		option: function(item) {
			let newItem = "";
			newItem += '<div>';
			newItem += '<span class="number__val">' + item.item + '</span>';
			newItem += '</div>';

			return newItem;
		},

		item: function (item) {
			let newItem = "";
			newItem += '<div>';
			newItem += '<span class="number__val">' + item.item + '</span>';
			newItem += '</div>';

			return newItem;
		}
	},
	onFocus: function () {
		let thisInput = $(this.$wrapper);
		thisInput.next( ".select-desc" ).addClass( "select-desc--active" );
	},
	onBlur: function () {
		let thisInput = $(this.$wrapper);
		if (this.caretPos === 0) {
			thisInput.next( ".select-desc" ).removeClass( "select-desc--active" );
		}
	}
});
