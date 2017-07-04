$(document).ready(function() {
	var gemAry
	if (localStorage.getItem('gems')){
		gemAry = localStorage.gems.split(',')
	} else {
		gemAry = []
	}
	setNavigation(window.location.pathname)

	loadFavorites(localStorage.gems, blueStar)

	$('.search-form').on('submit', function(e){
		event.preventDefault()
		$(this).removeClass('red-form')
		var t = e.target
		$.ajax({
			url: t.action,
			type: t.method,
			data: $(t).serialize(),
			success: function(response){
				$('.search-form').addClass
				$('.search-results').html(response)
				if ($('.main').find('.error-box').length > 0) {
					$('.search-form').addClass('red-form')
				} else {
					$('.search-form')[0].reset()
					$('.gem').each(function(){
						var gemName = $(this).find('a').text().trim()
						if (gemAry.includes(gemName)){
							$(this).find('.gray-star').toggle()
						} else {
							$(this).find('.blue-star').toggle()
						}
					})
				}
			},
			error: function(response){
				$('.search-results').html("<div class='error-box'><p>Error finding gems</p></div>")
			}
		})
	})

	$('.main').on('click', '.favorite-star', function(){
		var $box = $(this).closest('.star-box')
		var gemName = $(this).closest('.gem').find('a').text().trim()
		updateFavoriteStatus(gemName, gemAry, $box)
		$box.find('img').toggle()
		var stringAry = gemAry.toString()
		localStorage.setItem('gems', stringAry)
	})
});

function updateFavoriteStatus(gemName, gems, starBox){
	if (gems.includes(gemName)) {
		var i = gems.indexOf(gemName)
		gems.splice(i, 1)
		starBox.closest('.favorite-gem').remove()
	} else {
		var i = gems.length
		gems[i] = gemName
	}
}

function setNavigation(path) {
	$('.active').removeClass('active')
  path = path
  $(".nav li a").each(function () {
    var href = $(this).attr('href');
    if (path === href) {
    	$(this).addClass('active');
    }
  });
}

function loadFavorites(stringAry, star) {
	var favorites = stringAry.split(',')
	for(i = 0; i < favorites.length; i++){
		var name = favorites[i]
		var url = "https://rubygems.org/gems/" + name
		var listItem = "<li class='favorite-gem gem'><div class='star-box'>" + star + "</div><a href="+ url +" class='favorite-item'>"+ name +"</a></li>"
		$('.favorite-list').append(listItem)
	}
	$('.favorite-star')
}

var blueStar = "<img src='assets/star-blue.png' class='favorite-star' />"
var grayStar = "<img src='assets/star-gray.png' class='favorite-star' />"
