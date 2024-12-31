$(() => {
	let obj = $('.sideBar');
	let content = $('.sideBar-content');

	function toggle() {
		obj.toggleClass('sideBar_visible');
	}

	$('.js-sideBarCtrl').click(toggle);
	content.click((e) => {
		e.stopPropagation();
	});
	obj.click(toggle);


});

