document.addEventListener("DOMContentLoaded", function() {

	const loadedTimer = setTimeout(function() {
		document.querySelector('.wrap').classList.add('wrap-loaded')
	}, 1000)

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});



	//tooltip
	tippy('[data-tooltip]', {
		content(reference) {
			const selector = reference.getAttribute('data-tooltip');
			const el = document.querySelector(selector);
			return el ? el.innerHTML : '';
		},
		allowHTML: true,
		interactive: true,
		placement: 'top',
		theme: 'light-border',
		maxWidth: 350
	});


	//select toggle content visibility
	const inputs = document.querySelectorAll(
	"input[data-content], input[data-content-check], input[data-content-uncheck]"
	);

	inputs.forEach(function (input) {
	toggleContent(input);
	});

	inputs.forEach((input) => {
	input.addEventListener("click", function () {
		document.querySelectorAll(".frm-content").forEach((content) => {
		content.classList.remove("active");
			});

		inputs.forEach(toggleContent);
		});
	});

	document.querySelectorAll(".btn[data-content]").forEach((button) => {
	button.addEventListener("click", function () {
		let dataContent = this.getAttribute("data-content");
		this.disabled = true;
		document
		.querySelectorAll('.frm-content[data-content="' + dataContent + '"]')
		.forEach((content) => {
			content.classList.add("active");
			});
		return false;
		});
	});

	function toggleContent(input) {
	let selectContent;
	if (input.checked) {
		selectContent =
		input.getAttribute("data-content-check") ||
		input.getAttribute("data-content");
		} else {
		selectContent = input.getAttribute("data-content-uncheck");
		}
	document
		.querySelectorAll('.frm-content[data-content="' + selectContent + '"]')
		.forEach((content) => {
		content.classList.add("active");
		});
	}



	//side menu
	const sideMenuButtons = document.querySelectorAll('.side-menu-box .btn-menu');

	if (sideMenuButtons) {
		sideMenuButtons.forEach(function(sideButton) {
			sideButton.addEventListener('click', function(e) {
				if (this.nextElementSibling.classList.contains('menu')) {
					e.preventDefault();
					this.closest('li').classList.toggle('open');
				}
			})
		})
	}



		
	//popup mobile box
	document.querySelectorAll('.js-popup-mobile-close').forEach(btnClose => {
		btnClose.addEventListener('click', function(e) {
			e.preventDefault();
			this.closest('.popup-mobile-box').classList.remove('active')
		});
	})
	document.querySelectorAll('.js-popup-mobile-open').forEach(btn => {
	btn.addEventListener('click', function(e) {
		e.preventDefault();
		const popupName = this.getAttribute('data-mobile-popup');
		if(!popupName) return;
		const popup = document.querySelector(`.popup-mobile-box[data-mobile-popup="${popupName}"]`);
		if(popup) {
		popup.classList.add('active');
		}
	});
	});

	
	//form submit
	const form = document.querySelector('#form');
	const formPay = document.querySelector('#form-pay');
	const formPopup = document.querySelector('#form-popup');
	const formPopupMessage = document.querySelector('#popup-succefull');
	if (formPopup) {
		formPopup.addEventListener('submit', function(event) {
			event.preventDefault();
			this.closest('.popup-outer-box').classList.remove('active');
			formPopupMessage.classList.add('active');
		})
	}
	if (formPay) {
		formPay.addEventListener('submit', function(event) {
			event.preventDefault();
			this.closest('.form-main-box').classList.add('active');
		})
	}
	if (form) {
		form.addEventListener('submit', function(event) {
			event.preventDefault();
			this.closest('.form-box').classList.add('active');
		})
	}


	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			let next = this.nextElementSibling;
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			
			
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	let buttonsTglOne = document.querySelectorAll('.js-btn-tgl-one');
	buttonsTglOne.forEach(function(button) {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			let row = this.closest('.row');
			row.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
				btn.classList.remove('active');
			});
			row.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
				btn.classList.remove('active');
			});
			this.classList.add('active');
			return false;
		});
	});


	
	//fixed header
	let header = document.querySelector(".header-main-panel");
	let headerHeight = header.offsetHeight;
	 window.addEventListener("scroll", function () {
	   const windowTop = window.pageYOffset;
	   if (windowTop > 51) {
		 document.querySelector(".wrap").classList.add("header-fixed");
		} else {
		 document.querySelector(".wrap").classList.remove("header-fixed");
		}
	});
	
	//panel card fixed
	let panel = document.querySelector(".panel-card-box");
	if (panel) {
		let panelHeight = panel.offsetHeight;
		window.addEventListener("scroll", function () {
		const windowTop = window.pageYOffset;
		if (windowTop > 500) {
			document.querySelector(".wrap").classList.add("panel-fixed");
			} else {
			document.querySelector(".wrap").classList.remove("panel-fixed");
			}
		});
	}

	//header catalog menu 
	
	if (window.innerWidth < 1024) {
		document.querySelectorAll('.popup-catalog-wrap .btn-menu').forEach(function(menuBtn) {
			menuBtn.addEventListener('click', function(event) {
	
				const parentLi = this.closest('li');
				const hasSubmenu = parentLi.querySelector('ul.menu');
				
				if (hasSubmenu) {
					event.preventDefault(); 
					const siblings = parentLi.parentElement.children;
					for (let sibling of siblings) {
						if (sibling !== parentLi) {
							sibling.classList.remove('open');
						}
					}
					parentLi.classList.toggle('open');
				}
				
			});
		});
		document.querySelector('.popup-catalog-wrap .js-menu-back').addEventListener('click', function(event) {
			event.preventDefault();
			const openItems = document.querySelectorAll('.popup-catalog-wrap li.open');
			let deepestOpenItem = null;
	
			openItems.forEach(item => {
				const hasNestedMenu = item.querySelector('ul.menu');
				if (hasNestedMenu) {
					const nestedOpenItems = hasNestedMenu.querySelectorAll('li.open');
					if (nestedOpenItems.length > 0) {
						deepestOpenItem = nestedOpenItems[0];
					}
				} else {
					deepestOpenItem = item;
				}
			});
			if (deepestOpenItem) {
				deepestOpenItem.classList.remove('open');
			} else {
				openItems.forEach(item => {
					item.classList.remove('open');
				});
			}
		});
	} else {
		document.querySelectorAll('.popup-catalog-wrap .menu-main>li>.btn-menu').forEach(function(menuBtn) {
			menuBtn.addEventListener('click', function(event) {
	
				const parentLi = this.closest('li');
				const hasSubmenu = parentLi.querySelector('ul.menu');
				
				if (hasSubmenu) {
					event.preventDefault(); 
					const siblings = parentLi.parentElement.children;
					for (let sibling of siblings) {
						if (sibling !== parentLi) {
							sibling.classList.remove('open');
						}
					}
					parentLi.classList.toggle('open');
				}
				
			});
		});
		document.addEventListener('click', function(event) {
		const catalogWrap = document.querySelector('.popup-catalog-wrap');
		if (!catalogWrap.contains(event.target)) {
			document.querySelectorAll('.popup-catalog-wrap .menu-main > li.open').forEach(function(openLi) {
				openLi.classList.remove('open');
			});
		}
	});
	}

	//form input clear
	const inputFields = document.querySelectorAll(".frm-field-input-action .form-input");
	const clearButtons = document.querySelectorAll(".btn-clear");
	
	for (let i = 0; i < inputFields.length; i++) {
	  const inputField = inputFields[i
		];
	  const form = inputField.closest(".frm-field-input-action");
	
	  inputField.addEventListener("input", function () {
		if (inputField.value.length > 0) {
		  form.classList.add("inp-valid");
			} else {
		  form.classList.remove("inp-valid");
			}
		});
	}
	for (let i = 0; i < clearButtons.length; i++) {
	  const clearButton = clearButtons[i
		];
	  clearButton.addEventListener("click", function (event) {
		this.closest(".frm-field-input-action").querySelector(".form-input").value = "";
		this.closest(".frm-field-input-action").classList.remove("inp-valid");
		event.preventDefault();
		});
	}


	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	const bodyElem = document.querySelector('body')
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('catalog-show')
		document.body.classList.remove('filter-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (window.innerWidth < 1024) {
				if (!element.closest('.no-close-mobile') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}

			} else {
				if (!element.closest('.no-close')) {
					element.classList.remove('active')
				}
			}
			
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-catalog-wrap')) {
					document.body.classList.add('catalog-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
		element.addEventListener("click", function (event) {
		document.body.classList.remove("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}
		event.preventDefault();
		event.stopPropagation();
		});
	});
	document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	element.addEventListener("click", function (event) {
		if (!event.target.closest(".popup-box")) {
		document.body.classList.remove("popup-open");
		document.body.classList.remove("popup-open-scroll");
		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
			e.classList.remove("active");
				});
		return false;
			}
		});
	});


	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
							console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		})
	}
	tabsActiveStart()


	//slider catalog
	// const swiperTileSliderCatalog = new Swiper('.tile-slider-catalog .swiper', {
	// 	loop: false,
	// 	slidesPerView: 1,
	// 	spaceBetween: 0,
	// 	autoHeight: true,
	// 	speed: 400,
	// 	pagination: {
	// 		el: '.tile-slider-catalog-pagination',
	// 		clickable: true,
	// 	},
	// 	autoplay: {
	// 		delay: 2500,
	// 		disableOnInteraction: false,
	// 	},
	// 	navigation: false,
	
	// });



	//slider tile
	const swiperSliderTile = new Swiper('.slider-tile .swiper', {
		loop: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 600,
		pagination: {
			el: '.slider-tile-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tile-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tile-prev',
		},
	
	});


	//slider tiles
	const swiperSliderTiles = new Swiper('.slider-tiles .swiper', {
		loop: false,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: false,
		freeMode: true,
		 scrollbar: {
			el: '.slider-scrollbar-tiles',
			draggable: true,
		},
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tiles-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tiles-prev',
		},
		breakpoints: {
			1024: {
				slidesPerView: 3,
				freeMode: false,
			},
			1200: {
				slidesPerView: 4,
				freeMode: false,
			},
			1400: {
				slidesPerView: 5,
				freeMode: false,
			},
		},
	
	});


	//slider examples
	const swiperSliderExamples = new Swiper('.slider-examples .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: {
			el: '.slider-examples-pagination',
			clickable: true,
		},
		autoplay: false,
		navigation: false,
	
	});


	//slider categories
	const swiperSliderCategories = new Swiper('.slider-categories .swiper', {
		loop: false,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: {
			el: '.slider-categories-pagination',
			clickable: true,
		},
		autoplay:false,
		navigation: false,
	});


	//slider photos thumbs preview
	document.querySelectorAll('.tiles-thumbs-slider-box').forEach(function(container) {
		const thumbsEl = container.querySelector('.slider-photos-thumbs .swiper');
		const mainEl = container.querySelector('.slider-photos-main .swiper');
		const nextMBtn = container.querySelector('.button-slider-photos-main-next');
		const prevMBtn = container.querySelector('.button-slider-photos-main-prev');
		const nextTBtn = container.querySelector('.button-slider-photos-thumbs-next');
		const prevTBtn = container.querySelector('.button-slider-photos-thumbs-prev');
		const mainPag = container.querySelector('.slider-photos-main-pagination');
	
		const swiperPhotosPreview = new Swiper(thumbsEl, {
			loop: true,
			slidesPerView: 5,
			spaceBetween: 0,
			direction: 'vertical',
			threshold: 5,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			freeMode: false,
			navigation: {
				nextEl: nextTBtn,
				prevEl: prevTBtn,
			},
			breakpoints: {
				1024: {
					direction: 'horizontal',
				},
				1920: {
					direction: 'vertical',
				},
			},
		});
		const swiperPhotosMain = new Swiper(mainEl, {
			loop: false,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 400,
			threshold: 5,
			freeMode: false,
			watchSlidesProgress: true,
			navigation: {
				nextEl: nextMBtn,
				prevEl: prevMBtn,
			},
			pagination: {
				el: mainPag,
				clickable: true,
			},
			thumbs: {
				swiper: swiperPhotosPreview,
			},
		});
	});


	//mobile slider catalog item
	if (window.innerWidth < 1024) {
		const swiperSliderTilesCatalog = new Swiper('.items-wrap .tile-slider-catalog .swiper', {
			loop: false,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 400,
			pagination: {
				el: '.tile-slider-catalog-pagination',
				clickable: true,
			},
			autoplay: false,
			navigation: false,
		
		});
	}




})