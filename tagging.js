prePopulated = ["Mike", "Sean", "Andrew", "Jackie", "Nick"];
data = [
	{ name: 'Sean', x: '294', y: '391' },
	{ name: 'Nick', x: '372', y: '366' },
	{ name: 'Mike', x: '99', y: '293' }
];

$(function(){
	canvas = $('.photo_container')
	tagList(canvas);
	createTagsFromData();	
	buttonHandler = makeToggleHandler(canvas);
	buttonHandler.toggleHide();
	usersInPhoto();
});

// add user store like niranjan's code
function userStore() {
	this.users = [],
	this.seed = []
}

function tagList(canvas) {
	$(canvas).click(function(event){
		// debug
		// alert(event.pageX);
		// alert(event.pageY);
		$('.click_container')
			.css("left", event.pageX - 40)
			.css("top", event.pageY - 40)
			// don't forget to fade the div out when you make another selection
			.fadeIn();
		
		$('.click_container')
			.empty()
			.append(
				$('<div></div>')
					.addClass('pretag')
			);

		$('.click_container')
			.append(
				$('<div></div>')
					.addClass('choice_container')
			);

		$(prePopulated).each(function(){
			$('.choice_container')
			.append(
				$('<div></div>')
					.addClass('choice')
					.html(this)
			);
		});
		createTagData();
	});
}

function createTagsFromData() {
	// takes the existing data and places a tag there
	console.log('I got called!');
	$(data).each(function(){
		$('.tag_container')
			.append(
				$('<div></div>')
					.addClass('tag')
					.html(
						$('<div></div>')
							.addClass('name')
							.html(this.name)
					)
					.css('left', this.x + 'px')
					.css('top', this.y - 80 + 'px')
					.hide()
			);
	});
}

function usersInPhoto() {
	$(data).each(function(){
		$('.info')
			.append(this.name)
	});
}


function makeToggleHandler(canvas) {
	return {
		toggleHide: function() {
			$(canvas).mouseenter(this.showTags);
			$(canvas).mouseleave(this.hideTags);
		},

		hideTags: function() {
			$('.tag_container .tag')
				.fadeOut();
		},

		showTags: function() {
			$('.tag_container .tag')
				.fadeIn();
		}
	}
}

function createTagData() {

	$('.choice').click(function(){
		var x = parseInt(($('.click_container').css('left')),'px');
		var y = parseInt(($('.click_container').css('top')), 'px');
		data.push(
			{name: $(this).html(), x: x, y: y}
		);
		$('.click_container').fadeOut();
		createTagsFromData();
	});
}