(function() {
  
	var client = {
		
		initialize : function () {

			this.setUpListeners();

		},

		setUpListeners: function () {

			$('header .menu').on('click', this.showMenu);
			$('.posts .post .actions .share').on('click', this.showShare);
			$('article .actions .share').on('click', this.showShare);
			$('a.loader').on('click', this.getMore);
			$('.select').on('click', this.showSelectUl);
			$('.select ul li').on('click', this.selectSection);
			$('.comments .comment .main .unswer a').on('click', this.scrollTo);
			$('form').on('submit', this.submitForm);
			$('form').on('keydown', 'input', this.removeError);
			$('form').on('keydown', 'textarea', this.removeError);
			$('.topArrow').on('click', this.scrollTop);
			
			$(window).on('scroll', this.checkScroll);

		},

		showMenu: function () {

			var nav = $('header nav'),
				icon = $('#nav-icon');

			icon.toggleClass('open');
			nav.slideToggle();

		},

		showShare: function (e) {

			var shareIcons = $(this)
							.parent('.actions')
							.children('.info')
							.children('.social');
			
			if (shareIcons.css('left') == "-200px") {
				shareIcons.animate({left: "0px"}, 600);	
			} else {
				shareIcons.animate({left: "-200px"}, 600);
			}

			e.preventDefault();

		},

		getMore: function (e) {

			var icon = $(this).children('.fa');

			icon.addClass('fa-spin');

			e.preventDefault();

		},

		showSelectUl: function () {

			$(this).children('ul').slideToggle(150);
			$(this).toggleClass('open');
			
		},

		selectSection: function () {
			
			var sitem = $(this).html(),
				sdata = $(this).data('item'),
				span = $(this).parent('ul')
						.siblings('span.selected');

			$(this).siblings('li').removeClass('selected');
			$(this).addClass('selected');

			span.html(sitem);
			console.log(sdata);

		},

		scrollTo: function () {
			
			var elem = $(this).attr('href'),
				textarea = $('#comment-form textarea'),
				name = $(this).parents('.main')
								.find('div.name')
								.text();

			if ($(elem).length != 0){
				$('html, body').animate({scrollTop: $(elem).offset().top}, 500);
				
				setTimeout(function () {
					textarea.val(name + ', ').focus();
				}, 300);
			}			

			return false;

		},

		submitForm: function (e) {
			
			var form = $(this),
				formData = form.serialize();

			if ( client.validateForm(form) === false )
				return false;

			console.log('GO AJAX! ==> ' + formData);

			e.preventDefault();

		},

		validateForm: function(form) {

			var inputs = form.find('input'),
				textarea = form.find('textarea'),
				valid = true;

			inputs.each(function(index, el) {
				
				var input = $(el),
					val = $.trim( input.val() ),
					p = input.parent('p'),
					label = p.find('label')
							.text()
							.toLowerCase()
							.slice(0, -1),
					err = 'Введите ' + label;

				if ( val.length === 0 ) {

					p.append('<span>' + err + '</span>');
					input.css('border-color', '#EDC80C');

					valid = false;

				}


			});

			return valid;

		},

		removeError: function () {
			
			$(this).css('border-color', '').siblings('span').remove();
		},

		scrollTop: function () {
			
			$('html, body').animate({scrollTop: 0}, 500);

		},

		checkScroll: function() {

		    var scrollTop = Math.round($(this).scrollTop()),
				clientHeight = Math.round(document.documentElement.clientHeight),
				footerTop = Math.round($('footer').offset().top);

			if ( scrollTop > clientHeight / 2 )
			    $(".topArrow").fadeIn();
			else
			    $(".topArrow").fadeOut();


			if ( scrollTop + clientHeight > footerTop ) {

				$(".topArrow").css({

					position: 'absolute',
					top: footerTop - 80

				});

			} else {

				$(".topArrow").css({

					position: '',
					top: ''

				});

			}

		},
		
	}

	client.initialize();

}());