prePopulated = ["Mike", "Sean", "Andrew", "Jackie", "Nick"];
data = [
	{ name: 'Sean', x: '334', y: '351' },
	{ name: 'Nick', x: '412', y: '336' },
	{ name: 'Mike', x: '139', y: '263' }
];

$(function(){
	canvas = $('.photo_container')
	tagList(canvas);
	iterateThroughData();	
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
	});
}

function iterateThroughData() {
	// takes the existing data and places a tag there
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
					.css('left', this.x - 40 + 'px')
					.css('top', this.y - 40 + 'px')
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

