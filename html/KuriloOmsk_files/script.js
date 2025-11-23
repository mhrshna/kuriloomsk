var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

$.fn.digits = function () {
	return this.each(function () {
		$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 "));
	})
};

// cart
$(function () {
	$('.nav-menu [href="/vidy-avtomobiley/"], .nav-menu [href="/brands/"], .nav-menu [href="/uslugi/"], .nav-menu [href="/gostinitsa/"], .nav-menu [href="/company/"]').on('click', function(e) {
		e.preventDefault();
	});

	function updateCart(data) {
		if (data.in_basket == 0) {
			window.location.reload();
		}

		$('.js-cart-count').text(data.in_basket);
		$('.js-cart-total-count').text(data.in_basket);

		if ($('.js-total-cart-price').length) {
			$('.js-total-cart-price').attr('data-price', data.total_price);
			$('.js-total-cart-price').text(data.total_price).digits();
		}

		if ($('.js-cart-item').length) {
			for (var key in data.items) {
				var item = data.items[key];
				var $row = $('.js-cart-item[data-cart-id="' + item.ID + '"]');

				$row.find('.js-cart-item-price').text(item.PRICE * item.QUANTITY).digits();
			}
		}
	}

	$('.js-to-cart').on('click', function () {
		var $self = $(this);
		var quantity = 1;

		if ($self.data('count-target')) {
			quantity = $($self.data('count-target')).val();
		}

		$.post('/ajax/add_to_cart.php', {request: 'buy', quantity: quantity, id: $self.data('id')}, function (data) {
			$('.js-cart-count').text(data.in_basket);
		}, 'json');
	});

	$('.js-pushstate').on('click', function (e) {
		var $self = $(this);

		window.history.pushState(null, "", $self.data('url'));
	});

	$('.js-product-popup').on('click', function (e) {
		e.preventDefault();

		var $self = $(this);

		$.get('/ajax/product.php', {ID: $self.data('id')}, function (data) {
			$('#popup-product').html(data);

			window.history.pushState(null, "", $self.attr('href'));

			$('.js-product-popup-init').click();
		});
	});

	$('.count__btn').on('click', function () {
		var $self = $(this);
		var $input = $self.parent().find('input');
		var value = +$input.val();

		if ($self.hasClass('count__btn-plus')) {
			value++;
		} else {
			value--;
		}

		if (value < 1) {
			value = 1;
		}

		$input.val(value).trigger('change');
	});

	$('.js-cart-quantity').on('change', function () {
		var $self = $(this);
		var id = $self.closest('.js-cart-item').data('cart-id');

		$.post('/ajax/cart.php', {request: 'update', quantity: $self.val(), id: id}, function (data) {
			updateCart(data);
		}, 'json');
	});

	$('.js-cart-remove').on('click', function () {
		var $self = $(this);
		var id = $self.closest('.js-cart-item').data('cart-id');

		$.post('/ajax/cart.php', {request: 'remove', id: id}, function (data) {
			$('.js-cart-item[data-cart-id="' + id + '"]').remove();

			updateCart(data);
		}, 'json');
	});
});

// custom
$(function () {
	$('[name="PAGE_URL"]').val(window.location.href);

	$('.js-review-form').on('submit', function(e) {
		e.preventDefault();

		var $form = $(this);

		$.post('/ajax/review.php', $form.serializeArray(), function (data) {
			$form.html(data);
		});
	});

	$('.js-repair-form').on('submit', function(e) {
		e.preventDefault();

		var $form = $(this);

		$.post('/ajax/repair.php', $form.serializeArray(), function (data) {
			$form.html(data);
		});
	});

	$('.js-nomera-form').on('submit', function(e) {
		e.preventDefault();

		var $form = $(this);

		$.post('/ajax/nomera.php', $form.serializeArray(), function (data) {
			$form.html(data);
		});
	});

	$('.js-director-form').on('submit', function(e) {
		e.preventDefault();

		var $form = $(this);

		$.post('/ajax/director.php', $form.serializeArray(), function (data) {
			$form.html(data);
		});
	});

	$('.js-order-input-map').on('input change', function () {
		var $self = $(this);

		$($self.data('target')).text($self.val());
	});
});

// scroll more
jQuery(document).ready(function ($) {
	if ($('.scroll-down').length) {
		$('.scroll-down').click(function () {
			var destination = $(this).parents('.section').innerHeight();
			$('html').animate({scrollTop: destination}, 900);
		});
	}
}(jQuery));

// smooth scroll

jQuery(document).ready(function ($) {
	$("a.scrollto").click(function () {
		elementClick = $(this).attr("href")
		destination = $(elementClick).offset().top - 20;
		$("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
		return false;
	});
}(jQuery));


// dropdown

jQuery(document).ready(function ($) {
	if ($('.dropdown').length) {
		let dropdown = $('.dropdown');
		dropdown.click(function () {
			if ($(this).hasClass('open')) {
				$(this).removeClass('open');
			} else {
				dropdown.removeClass('open');
				$(this).addClass('open');
			}
		});
	}
}(jQuery));


// nav-dropdown bg

jQuery(document).ready(function ($) {
	if ($('.nav-dropdown').length) {
		let navDropdown = document.querySelectorAll('.header .nav-dropdown');
		let navLink = document.querySelectorAll('.header .has-dropdown');

		function setNavWidth() {
			navDropdown.forEach(function (item, i, arr) {
				let offTop = 0;
				let navWidth = 0;
				if (i === arr.length - 1) {
					item.parentElement.style.right = '-30px';
					item.parentElement.style.left = 'auto';
				}
				if (item.scrollWidth === item.offsetWidth) {
					item.style.minWidth = '100px';
					let elems = item.children;
					for (let elem of elems) {
						elem.style.paddingRight = 0;
					}
				} else {
					navWidth = item.clientWidth;
					let elems = item.children;
					for (elem of elems) {
						if (elem.offsetTop > offTop) {
							offTop = elem.offsetTop;
						} else {
							navWidth += elem.clientWidth;
							offTop = 0;
						}
					}
					let navStyle = getComputedStyle(item.parentElement);
					// let navPadding = parseInt(navStyle.paddingRight.slice(0, -2) + navStyle.paddingLeft.slice(0, -2));
					let navPadding = 0;
					item.parentElement.style.width = navWidth + navPadding + 'px';
					navWidth = 0;
					offTop = 0;
				}
			});
		}

		setNavWidth();
		navLink.forEach(function (item, i, arr) {
			item.onmouseover = function (event) {
				setNavWidth();
			};
		});

	}
}(jQuery));




// выпадашка выбора отзывов
document.addEventListener("DOMContentLoaded", function () {

  function setupReviewModal(modal, mode) {
  if (!modal) return;

  const title = modal.querySelector(".review-modal__title");
  const subtitle = modal.querySelector(".review-modal__subtitle");
  const hint = modal.querySelector(".review-modal__hint");
  const buttons = modal.querySelectorAll(".review-modal__btn");

  if (title) {
    title.textContent =
      mode === "add"
        ? title.dataset.textAdd
        : title.dataset.textView;
  }

  if (subtitle) {
    subtitle.textContent =
      mode === "add"
        ? subtitle.dataset.subtitleAdd
        : subtitle.dataset.subtitleView;
  }

  if (hint) {
    hint.textContent =
      mode === "add"
        ? hint.dataset.hintAdd
        : hint.dataset.hintView;
  }

  buttons.forEach(btn => {
    const url =
      mode === "add"
        ? btn.dataset.urlAdd
        : btn.dataset.urlView;
    if (url) btn.setAttribute("href", url);
  });
}

  function openReviewModal(trigger) {
    const modalSelector = trigger.dataset.openModal;
    const mode = trigger.dataset.reviewMode || "view";
    const modal = document.querySelector(modalSelector);
    if (!modal) return;

    setupReviewModal(modal, mode);
    modal.classList.add("is-open");
  }


  // helper: плавное закрытие с анимацией
  function closeReviewModal(modal) {
    if (!modal || !modal.classList.contains("is-open")) return;

    modal.classList.add("is-closing");

    // время должно совпадать с CSS-transition (.28s)
    setTimeout(() => {
      modal.classList.remove("is-open", "is-closing");
    }, 280);
  }

  // Открытие
  document.addEventListener("click", function (e) {
    const trigger = e.target.closest("[data-open-modal]");
    if (!trigger) return;
    e.preventDefault();
    openReviewModal(trigger);
  });

  // Закрытие (крестик + клик по фону)
  document.querySelectorAll(".review-modal").forEach(modal => {
    const closeBtn = modal.querySelector("[data-close]");
    const backdrop = modal.querySelector(".review-modal__backdrop");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        closeReviewModal(modal);
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", () => {
        closeReviewModal(modal);
      });
    }
  });

  // Закрытие по ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".review-modal.is-open")
        .forEach(modal => closeReviewModal(modal));
    }
  });


});



// ЗАДАТЬ ВОПРОС
document.addEventListener("DOMContentLoaded", function () {
    // создаём ползунок внутри переключателя
  document.querySelectorAll('.question-form__contact-type[data-contact-type]').forEach(function (wrap) {
    if (!wrap.querySelector('.contact-type__slider')) {
      const slider = document.createElement('div');
      slider.className = 'contact-type__slider';
      wrap.insertBefore(slider, wrap.firstChild);
    }
    updateContactSlider(wrap); 
  });

  
  
  // Переключатель E-mail / Телефон
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".contact-type__option");
    if (!btn) return;

    const wrapper = btn.closest("[data-contact-type]");
    if (!wrapper) return;

    const type = btn.dataset.type; // 'email' | 'phone'

    // Подсветка активной кнопки
    wrapper.querySelectorAll(".contact-type__option").forEach(b => {
      b.classList.toggle("contact-type__option--active", b === btn);
    });
    // Обновляем позицию ползунка
    updateContactSlider(wrapper);


    const emailInput = document.querySelector("[data-input-email]");
    const phoneInput = document.querySelector("[data-input-phone]");

    if (!emailInput || !phoneInput) return;

    // Сбрасываем ошибки у обоих полей при любом переключении
    [emailInput, phoneInput].forEach(function (input) {
      const group = input.closest('.question-form__group');
      if (!group) return;
      input.classList.remove('is-error');
      const err = group.querySelector('.question-form__error');
      if (err) err.textContent = '';
    });

    if (type === "email") {
      emailInput.style.display = "";
      emailInput.required = true;
      emailInput.type = "email";
      emailInput.placeholder = "example@mail.ru";

      phoneInput.style.display = "none";
      phoneInput.required = false;
      phoneInput.value = "";
    } else {
      // телефон
      emailInput.style.display = "none";
      emailInput.required = false;
      emailInput.value = "";

      phoneInput.style.display = "";
      phoneInput.required = true;
      phoneInput.type = "tel";
      phoneInput.placeholder = "+7 (___) ___-__-__";
    }
  });
});

// Обновить позицию и ширину ползунка под активной кнопкой
function updateContactSlider(wrapper) {
  if (!wrapper) return;
  const slider = wrapper.querySelector('.contact-type__slider');
  const active = wrapper.querySelector('.contact-type__option--active');
  if (!slider || !active) return;

  const wrapRect = wrapper.getBoundingClientRect();
  const btnRect  = active.getBoundingClientRect();

  slider.style.width = btnRect.width + 'px';
  slider.style.transform = 'translateX(' + (btnRect.left - wrapRect.left) + 'px)';
}


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('questionForm');
  if (!form) return;

  const modal        = document.getElementById('questionModal');
  const nameInput    = form.querySelector('#q-name');
  const emailInput   = form.querySelector('[data-input-email]');
  const phoneInput   = form.querySelector('[data-input-phone]');
  const messageInput = form.querySelector('#q-message');
  const consent      = form.querySelector('input[name="consent"]');

  // какой контакт сейчас активен (email / phone)
  function getActiveContactInput() {
    if (!emailInput || !phoneInput) return emailInput || phoneInput;
    const emailHidden = window.getComputedStyle(emailInput).display === 'none';
    return emailHidden ? phoneInput : emailInput;
  }

  // проверка корректности телефона
  function isValidPhone(raw) {
    if (!raw) return false;

    // убираем всё, кроме цифр
    let digits = raw.replace(/[^\d]/g, '');

    // если начинается с 8 — считаем как 7 (рф)
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    }

    // формат 7XXXXXXXXXX (11 цифр)
    return digits.length === 11 && digits.startsWith('7');
  }

  // создать/найти контейнер под ошибку прямо в группе
  function getErrorElement(input) {
    const group = input.closest('.question-form__group');
    if (!group) return null;
    let err = group.querySelector('.question-form__error');
    if (!err) {
      err = document.createElement('div');
      err.className = 'question-form__error';
      group.appendChild(err);
    }
    return err;
  }

  // создаём пустые контейнеры ошибок сразу, чтобы их появление потом не меняло высоту сетки
  [nameInput, emailInput, phoneInput, messageInput].forEach(function (input) {
    if (!input) return;
    getErrorElement(input);
  });

  function showFieldError(input, message) {
    const err = getErrorElement(input);
    if (!err) return;
    input.classList.add('is-error');
    err.textContent = message;
  }

  function clearFieldError(input) {
    if (!input) return;
    input.classList.remove('is-error');
    const group = input.closest('.question-form__group');
    if (!group) return;
    const err = group.querySelector('.question-form__error');
    if (err) err.textContent = '';
  }

  // общий ресет формы и ошибок
  function resetQuestionForm() {
    // сбрасываем значения
    form.reset();

    // очищаем ошибки полей
    [nameInput, emailInput, phoneInput, messageInput].forEach(clearFieldError);

    // убираем подсветку чекбокса
    if (consent && consent.nextElementSibling) {
      consent.nextElementSibling.classList.remove('checkbox-error');
    }

    // вернуть активный email по умолчанию
    if (emailInput && phoneInput) {
      emailInput.style.display = '';
      emailInput.required = true;

      phoneInput.style.display = 'none';
      phoneInput.required = false;
      phoneInput.value = '';

      const toggleWrap = form.querySelector('[data-contact-type]');
      if (toggleWrap) {
        toggleWrap.querySelectorAll('.contact-type__option').forEach(btn => {
          btn.classList.toggle(
            'contact-type__option--active',
            btn.dataset.type === 'email'
          );
        });

        // вернуть ползунок под E-mail
        updateContactSlider(toggleWrap);
      }

    }
  }

  // очищаем ошибку при фокусе/вводе для текстовых полей
  [nameInput, emailInput, phoneInput, messageInput].forEach(function (input) {
    if (!input) return;
    input.addEventListener('focus',  () => clearFieldError(input));
    input.addEventListener('input',  () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
  });

  // очищаем подсветку чекбокса при смене состояния
  if (consent) {
    consent.addEventListener('change', () => {
      if (consent.nextElementSibling) {
        consent.nextElementSibling.classList.remove('checkbox-error');
      }
    });
  }

  // плавное закрытие модалки, как по крестику
  function closeQuestionModal() {
    if (!modal) return;
    modal.classList.add('is-closing');
    setTimeout(function () {
      modal.classList.remove('is-open', 'is-closing');
    }, 280);
  }

  // всплывашка "вопрос отправлен"
  function showQuestionToast(message) {
    let toast = document.querySelector('.question-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'question-toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;

    // перезапуск анимации
    toast.classList.remove('is-visible');
    void toast.offsetWidth;
    toast.classList.add('is-visible');

    setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3000);
  }

  // очистка при ОТКРЫТИИ модалки ("Задать вопрос")
  document.addEventListener('click', function (e) {
    const openBtn = e.target.closest('[data-open-modal="#questionModal"]');
    if (!openBtn) return;
    resetQuestionForm();
  });

  // очистка при ЗАКРЫТИИ модалки по крестику (data-close внутри questionModal)
  if (modal) {
    modal.addEventListener('click', function (e) {
      const closeBtn = e.target.closest('[data-close]');
      if (!closeBtn) return;
      resetQuestionForm();
    });
  }

  // основная проверка при отправке
  form.addEventListener('submit', function (e) {
    let isValid = true;

    // сброс ошибок полей 
    [nameInput, emailInput, phoneInput, messageInput].forEach(clearFieldError);
    if (consent && consent.nextElementSibling) {
      consent.nextElementSibling.classList.remove('checkbox-error');
    }

    // 1. Имя
    if (!nameInput.value.trim()) {
      showFieldError(nameInput, 'Укажите ваше имя.');
      isValid = false;
    }

    // 2. Контакт (email или телефон)
    const contactInput = getActiveContactInput();
    if (contactInput) {
      const value = contactInput.value.trim();

      if (!value) {
        showFieldError(contactInput, 'Укажите контакт для связи.');
        isValid = false;
      } else {
        // проверка email
        if (contactInput === emailInput && !emailInput.checkValidity()) {
          showFieldError(contactInput, 'Проверьте корректность e-mail.');
          isValid = false;
        }

        // проверка телефона
        if (contactInput === phoneInput && !isValidPhone(value)) {
          showFieldError(contactInput, 'Введите корректный номер телефона.');
          isValid = false;
        }
      }
    }

    // 3. Вопрос
    if (!messageInput.value.trim()) {
      showFieldError(messageInput, 'Напишите ваш вопрос.');
      isValid = false;
    }

    // 4. Согласие — подсвечиваем квадратик чекбокса (span после input)
    if (!consent.checked) {
      if (consent.nextElementSibling) {
        consent.nextElementSibling.classList.add('checkbox-error');
      }
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      const firstError = form.querySelector('.is-error, .checkbox-error');
      if (firstError && firstError.scrollIntoView) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // УСПЕШНАЯ ОТПРАВКА 
    e.preventDefault(); // чтобы не перезагружать страницу

    // полностью очищаем форму и состояние
    resetQuestionForm();

    // закрываем модалку и показываем вывод
    closeQuestionModal();
    showQuestionToast('Вопрос отправлен, ожидайте обратной связи.');
  });
});








// Выпадашка Яндекс Карт
document.addEventListener('DOMContentLoaded', function () {
  // Ленивая подгрузка карт
  document.querySelectorAll('.map-panel__iframe-wrap iframe').forEach(function (frame) {
    if (frame.dataset.mapSrc && !frame.src) {
      frame.src = frame.dataset.mapSrc;
    }
  });

  // ======== ЛОК СКРОЛЛА СТРАНИЦЫ ========
 let scrollLocked = false;
let savedScrollY = 0;

function lockScroll() {
  if (scrollLocked) return;
  scrollLocked = true;

  // запоминаем позицию
  savedScrollY = window.scrollY || document.documentElement.scrollTop || 0;

  // ширина системного скроллбара
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  // компенсируем исчезновение скроллбара
  if (scrollBarWidth > 0) {
    document.body.style.marginRight = scrollBarWidth + 'px';
  }

  // фиксируем body
  document.body.style.position = 'fixed';
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
}

function unlockScroll() {
  if (!scrollLocked) return;
  scrollLocked = false;

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.marginRight = '';

  window.scrollTo(0, savedScrollY);
}

  function isAnyMapOpen() {
    return !!document.querySelector('.map-panel.is-open');
  }

  function openMapPanel(panel) {
    if (!panel) return;
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');

    // при открытии первой карты — лочим скролл
    if (!scrollLocked) {
      lockScroll();
    }
  }

  function closeMapPanel(panel) {
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');

    // если карт больше нет — снимаем лок
    if (!isAnyMapOpen()) {
      unlockScroll();
    }
  }

  // Открытие по кнопке data-map-panel
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-map-panel]');
    if (!btn) return;

    const selector = btn.dataset.mapPanel;
    if (!selector) return;

    const panel = document.querySelector(selector);
    if (panel) openMapPanel(panel);

    e.preventDefault();
  });

  // Закрытие по фону / крестику (data-map-close)
  document.addEventListener('click', function (e) {
    const closer = e.target.closest('[data-map-close]');
    if (!closer) return;

    const panel = closer.closest('.map-panel');
    if (panel) closeMapPanel(panel);
  });

  // Закрытие по Esc
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    document.querySelectorAll('.map-panel.is-open').forEach(function (panel) {
      closeMapPanel(panel);
    });
  });


});








// Основная панель: скроллим только .service-panel__body, фон не листается
jQuery(function ($) {
  let touchStartY = 0;

  // утилита: можно ли дальше скроллить этот элемент?
  function canScroll(el, deltaY) {
    if (!el) return false;
    const t = el.scrollTop;
    const h = el.scrollHeight;
    const ch = el.clientHeight;
    if (deltaY > 0) return t + ch < h; // вниз
    if (deltaY < 0) return t > 0;      // вверх
    return true;
  }

  function getPanelBody() {
    const p = document.querySelector('.popup.service-panel.active .service-panel__body');
    return p || null;
  }

  // --- открыть/закрыть панель (без фиксации body) ---
  function openPanel($panel) {
    if (!$panel.length || $panel.hasClass('active')) return;
    $panel.addClass('active').attr('aria-hidden', 'false');
  }
  function closePanel($panel) {
    if (!$panel.length || !$panel.hasClass('active')) return;
    $panel.removeClass('active').attr('aria-hidden', 'true');
  }

  // открыть по клику
  $(document).on('click', '.js-open-panel', function (e) {
    e.preventDefault();
    openPanel($($(this).data('panel')));
  });

  // закрыть
  $(document).on('click', '.popup.service-panel .popup-close', function () {
    closePanel($(this).closest('.popup.service-panel'));
  });
  $(document).on('click', '.popup.service-panel', function (e) {
    if (e.target === this) closePanel($(this));
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') closePanel($('.popup.service-panel.active'));
  });

  

	// === Блокируем прокрутку фона, разрешаем скролл только внутри .service-panel__body ===
(function () {
  let touchStartY = 0;

  function getPanelBody() {
    return document.querySelector('.popup.service-panel.active .service-panel__body');
  }

  // можно ли прокручивать текущий контейнер в сторону deltaY
  function canScroll(el, deltaY) {
    if (!el) return false;
    const top = el.scrollTop;
    const max = el.scrollHeight - el.clientHeight;

    if (deltaY > 0) {            // вниз
      return top < max - 1;      // оставляем ~1px на неточность
    } else if (deltaY < 0) {     // вверх
      return top > 0;
    }
    return false;
  }

  // колесо мыши / трекпад
  window.addEventListener('wheel', function (e) {
    const bodyEl = getPanelBody();
    if (!bodyEl) return; // панель закрыта — ничего не трогаем

    // если крутим НЕ над .service-panel__body — запрещаем
    if (!e.target.closest('.service-panel__body')) {
      e.preventDefault();
      return;
    }

    // крутим над .service-panel__body — проверяем края
    const dy = e.deltaY || 0;
    if (!canScroll(bodyEl, dy)) {
      e.preventDefault(); // на краях не отдаём скролл фону
    }
  }, { passive: false });

  // тач (мобилки/тачпады)
  window.addEventListener('touchstart', function (e) {
    if (!getPanelBody()) return;
    touchStartY = e.touches && e.touches.length ? e.touches[0].clientY : 0;
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    const bodyEl = getPanelBody();
    if (!bodyEl) return;

    if (!e.target.closest('.service-panel__body')) {
      e.preventDefault();
      return;
    }

    const y = e.touches && e.touches.length ? e.touches[0].clientY : touchStartY;
    const dy = touchStartY ? (touchStartY - y) : 0; // >0 вниз, <0 вверх
    if (!canScroll(bodyEl, dy)) {
      e.preventDefault();
    }
  }, { passive: false });

  // клавиатурная прокрутка (стрелки/Space/PageUp/PageDown/Home/End)
  window.addEventListener('keydown', function (e) {
    const bodyEl = getPanelBody();
    if (!bodyEl) return;

    const tag = (e.target.tagName || '').toLowerCase();
    if (/(input|textarea|select)/.test(tag) || e.target.isContentEditable) return;

    const keys = ['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','Spacebar'];
    if (!keys.includes(e.key)) return;

    // если фокус не внутри .service-panel__body — блокируем
    if (!e.target.closest('.service-panel__body')) {
      e.preventDefault();
      return;
    }

    // внутри контейнера — дополнительно защищаемся на краях
    const dyMap = {
      ArrowDown: 40, PageDown: 200, ' ': 200, Spacebar: 200,
      ArrowUp: -40, PageUp: -200, Home: -99999, End: 99999
    };
    const dy = dyMap[e.key] ?? 0;
    if (!canScroll(bodyEl, dy)) {
      e.preventDefault();
    }
  }, { passive: false });
})();




  // клавиши (стрелки, PgUp/Dn, пробел, Home/End)
  window.addEventListener('keydown', function (e) {
    const bodyEl = getPanelBody();
    if (!bodyEl) return;

    const keys = [' ', 'PageDown', 'PageUp', 'End', 'Home', 'ArrowDown', 'ArrowUp'];
    if (!keys.includes(e.key)) return;

    // если фокус не внутри .service-panel__body — блокируем
    if (!document.activeElement || !document.activeElement.closest('.service-panel__body')) {
      e.preventDefault();
      return;
    }

    // внутри тела панели — проверяем можно ли скроллить
    const dy = (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'End' || e.key === ' ')
      ? 1 : -1;
    if (!canScroll(bodyEl, dy)) {
      e.preventDefault();
    }
  }, true);
});



// Галерея: плавная, но быстрая смена главного фото по клику на превью
jQuery(function ($) {
  $(document).on('click', '.gallery__thumbs img', function () {
    var $thumb = $(this);
    var full = $thumb.data('full') || $thumb.attr('src');
    var $gallery = $thumb.closest('.gallery');
    var $mainWrap = $gallery.find('.gallery__main');
    var $current = $mainWrap.find('img');

    if ($current.attr('src') === full) return;

    // обновляем активную миниатюру
    $thumb.addClass('is-active').siblings().removeClass('is-active');

    // создаём новое изображение поверх старого
    var $next = $('<img>', {
      src: full,
      alt: $current.attr('alt'),
      css: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0
      }
    });

    $mainWrap.append($next);

    // ускоренный fade-переход
    $next.animate({ opacity: 1 }, 350, 'swing', function () {
      $current.remove();
      $next.css({ position: '', top: '', left: '', objectFit: '' });
    });
  });
});



// Лайтбокс: открыть по клику на большое фото, закрыть по клику на фото/фон/ESC
jQuery(function ($) {
  // создаем один лайтбокс на страницу
  var $lightbox = $(`
    <div class="lightbox" aria-hidden="true">
      <img src="" alt="Фото">
    </div>
  `);
  $('body').append($lightbox);

  // открыть из галереи
  $(document).on('click', '.gallery__main img', function () {
    var src = $(this).attr('src');
    $lightbox.find('img').attr('src', src);
    $lightbox.addClass('active').attr('aria-hidden', 'false');
  });

  // закрыть по клику на фон
  $(document).on('click', '.lightbox', function (e) {
    if (e.target === this) {
      $lightbox.removeClass('active').attr('aria-hidden', 'true');
    }
  });

  // закрыть по клику на изображение (как просили)
  $(document).on('click', '.lightbox img', function () {
    $lightbox.removeClass('active').attr('aria-hidden', 'true');
  });

  // закрыть по ESC
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $lightbox.removeClass('active').attr('aria-hidden', 'true');
    }
  });

  // не даем колесом/тачем прокручивать фон, когда открыт лайтбокс
  $(document).on('wheel touchmove', '.lightbox.active', function (e) {
    e.preventDefault();
  }, { passive: false });
});


// Галерея: плавная смена + подписи
jQuery(function ($) {

  function normSrc(u) {
    if (!u) return '';
    try {
      var abs = new URL(u, window.location.href);
      return abs.pathname.replace(/\/+/g, '/');
    } catch (e) {
      return u.split('#')[0].split('?')[0];
    }
  }

  function updateGalleryCaption($thumb){
    var $section = $thumb.closest('.service-section');
    var title = $thumb.data('title') || '';
    var desc  = $thumb.data('desc')  || '';
    $section.find('[data-role="gtitle"]').text(title);
    $section.find('[data-role="gdesc"]').text(desc);
    $thumb.closest('.gallery').find('.gallery__main img').attr('alt', title || 'Фото');
  }

  // Флаг, чтобы не наслаивались анимации
  var isAnimating = false;

  // Прелоадим все полноразмерные картинки
  $('.gallery__thumbs img').each(function () {
    var full = $(this).data('full');
    if (full) {
      var img = new Image();
      img.src = full;
    }
  });

  $(document).on('click', '.gallery__thumbs img', function () {
    if (isAnimating) return;

    var $thumb    = $(this);
    var full      = $thumb.data('full') || $thumb.attr('src');
    var $gallery  = $thumb.closest('.gallery');
    var $mainWrap = $gallery.find('.gallery__main');
    var $current  = $mainWrap.find('img');

    // Нормализуем пути
    var cur = normSrc($current.attr('src'));
    var nxt = normSrc(full);

    // Обновляем активное превью
    $thumb.addClass('is-active').siblings('img').removeClass('is-active');

    // Подпись обновляем всегда
    updateGalleryCaption($thumb);

    // Если реально то же изображение — дальше не идём
    if (cur === nxt) return;

    // Убеждаемся, что обёртка позиционируется
    if ($mainWrap.css('position') === 'static') {
      $mainWrap.css('position', 'relative');
    }

    isAnimating = true;

    var $next = $('<img>', {
      src: full,
      alt: $thumb.data('title') || $current.attr('alt') || '',
      css: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0
      }
    });

    // Ждём, пока новая картинка загрузится, чтобы не было "мигания"
    $next.on('load', function () {
      $mainWrap.append($next);

      // Crossfade: старая плавно исчезает, новая появляется
      $current.stop(true, true).animate({ opacity: 0 }, 260, 'swing');
      $next.stop(true, true).animate({ opacity: 1 }, 280, 'swing', function () {
        $current.remove();
        $next.css({ position: '', inset: '', objectFit: '' });
        isAnimating = false;
      });
    });

    // На случай, если картинка уже в кеше и load сработает синхронно
    if ($next[0].complete) {
      $next.trigger('load');
    }
  });

  // Инициализация подписи
  $('.gallery').each(function(){
    var $g = $(this);
    var $active = $g.find('.gallery__thumbs img.is-active').first();
    if (!$active.length) $active = $g.find('.gallery__thumbs img').first();
    if ($active.length) updateGalleryCaption($active);
  });
});




// Яндекс Карты
document.addEventListener('click', function (e) {
  // ОТКРЫТИЕ
  const openBtn = e.target.closest('[data-map-panel]');
  if (openBtn) {
    const selector = openBtn.getAttribute('data-map-panel');
    const panel = document.querySelector(selector);
    if (panel) {
      panel.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  // ЗАКРЫТИЕ по крестику / фону
  const closeBtn = e.target.closest('[data-map-close]');
  if (closeBtn) {
    const panel = closeBtn.closest('.map-panel');
    if (panel) {
      panel.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }
});

// ESC для закрытия
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const opened = document.querySelector('.map-panel.is-open');
    if (opened) {
      opened.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }
});









// клик по "Ремонт" — открыть/закрыть выпадашку (как hover)
jQuery(function ($) {
  // по ссылке "Ремонт"
  $(document).on('click', '.nav-menu__item.has-dropdown > .nav-menu__link', function (e) {
    e.preventDefault();           
    e.stopPropagation();          
    const $li = $(this).closest('.has-dropdown');

    $('.nav-menu__item.has-dropdown').not($li).removeClass('is-open');
    $li.toggleClass('is-open');
  });

  // по стрелочке (если есть кнопка)
  $(document).on('click', '.nav-menu__item.has-dropdown > .nav-dropdown__btn', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const $li = $(this).closest('.has-dropdown');

    $('.nav-menu__item.has-dropdown').not($li).removeClass('is-open');
    $li.toggleClass('is-open');
  });

  // клик вне — закрыть
  $(document).on('click', function () {
    $('.nav-menu__item.has-dropdown').removeClass('is-open');
  });
});



// Универсальная шапка с двумя вкладками
jQuery(function ($) {
  function initSplitHeader($scope) {
    $scope.find('.popup.service-panel .split-header').each(function () {
      var $hdr   = $(this);
      var $panel = $hdr.closest('.popup.service-panel');

      var paneLeftSel  = $hdr.attr('data-pane-left');
      var paneRightSel = $hdr.attr('data-pane-right');

      if (!paneLeftSel || !paneRightSel) {
        var $panes = $panel.find('.tab-pane');
        if ($panes.length >= 2) {
          paneLeftSel  = paneLeftSel  || ('#' + $panes.eq(0).attr('id'));
          paneRightSel = paneRightSel || ('#' + $panes.eq(1).attr('id'));
        }
      }

      function switchTo(side) {
        if (side !== 'left' && side !== 'right') return;

        $hdr.attr('data-active', side);

        var targetSel = (side === 'left') ? paneLeftSel : paneRightSel;
        var $show = targetSel ? $panel.find(targetSel) : $();
        var $all  = $panel.find('.tab-pane');

        if ($show.length) {
          $all.attr('hidden', true);
          $show.removeAttr('hidden');
        }

        $hdr.find('.left').attr('aria-selected', side === 'left');
        $hdr.find('.right').attr('aria-selected', side === 'right');
      }

      // Снимаем старые хендлеры и вешаем новые
      $hdr
        .off('.splitHdr')
        // Клик по ЛЮБОЙ точке шапки
        .on('click.splitHdr', function (e) {
          var offset = $hdr.offset();
          var x = e.pageX - offset.left;
          var side = x < ($hdr.outerWidth() / 2) ? 'left' : 'right';
          switchTo(side);
        })
        // Клавиши стрелок как раньше
        .on('keydown.splitHdr', function (e) {
          if (e.key === 'ArrowLeft')  { e.preventDefault(); switchTo('left');  }
          if (e.key === 'ArrowRight') { e.preventDefault(); switchTo('right'); }
        });

      // Стартовое состояние
      switchTo($hdr.attr('data-active') === 'right' ? 'right' : 'left');
    });
  }

  initSplitHeader($(document));
});






// tabs

jQuery(document).ready(function ($) {
	let tabNav = document.querySelectorAll('.tabs-nav__link'),
	tabContent = document.querySelectorAll('.tab'),
	tabName;

	tabNav.forEach(item => {
		item.addEventListener('click', selectTabNav)
	});

	function selectTabNav() {
		tabNav.forEach(item => {
			item.classList.remove('is-active');
		});
		this.classList.add('is-active');
		tabName = this.getAttribute('data-tab-name');
		selectTabContent(tabName);
	}

	function selectTabContent(tabName) {
		tabContent.forEach(item => {
			item.classList.contains(tabName) ? item.classList.add('is-active') : item.classList.remove('is-active');
		})
	}
}(jQuery));


// cost tabs

jQuery(document).ready(function ($) {
	let costTabLink = $('.cost-tabs__links .tabs-nav__link');
	let costBg = $('.cost .bg');

	costTabLink.click(function () {
		var $self = $(this);

		($(window).width() < '1025') ? $('.cost-price__wrap').fadeOut() : $('.cost-price__wrap').fadeTo(300, 0);
		($(window).width() < '1025') ? $($self.data('price')).fadeIn() : $($self.data('price')).fadeTo(300, 1);

		var bg = $self.data('bg');

		costBg.css('background', 'linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url(' + bg + ')');
	});
}(jQuery));


// product button active state

jQuery(document).ready(function ($) {
	if ($('.product__link').length) {
		let productAddToCart = $('.product__link');

		productAddToCart.click(function (event) {
			$(this).addClass('active');
			$(this).find('span').text('В корзине');
		});
	}
}(jQuery));


// popups

jQuery(document).ready(function ($) {
	if ($('.popup').length) {

		$('.button--popup').click(function (event) {
			scrollLock.addScrollableSelector('.popup');
			scrollLock.disablePageScroll();
			let popupName = $(this).attr('data-popup');
			let popup = $('#popup-' + popupName + '');
			popup.fadeIn('100');

			let popup_wrap = popup.closest('.popup');

			popup_wrap.fadeIn('400');
			$(window).trigger('resize');
		});
		$('.popup-close').click(function (event) {
			scrollLock.enablePageScroll();

			let popup_wrap = $(this).closest('.popup');

			if ($(this).hasClass('button')) {
				$(this).parent().fadeOut('300');
				popup_wrap.fadeOut('300');
			} else {
				popup_wrap.fadeOut('300');
				$(this).siblings().fadeOut('300');
			}
		});
	}
}(jQuery));

// глобально гасим "fill gap" у scrollLock, чтобы не добавлял правые паддинги/маргины
try {
  if (window.scrollLock) {
    // для новых версий: пустим методы-заглушки
    if (typeof scrollLock.setFillGapMethod === 'function') {
      scrollLock.setFillGapMethod('none');
    }
    // подстраховка для других реализаций:
    scrollLock.fillGaps = function() {};
    scrollLock.unfillGaps = function() {};
    scrollLock.clearQueueScrollLocks && scrollLock.clearQueueScrollLocks();
  }
} catch (e) {}




// mobile menu

jQuery(document).ready(function ($) {
	if ($(window).width() < '1025') {
		let mobile_menu = $('#mobile-menu');
		$('.mobile__btn').click(function () {
			scrollLock.addScrollableSelector('.mobile__menu');
			scrollLock.disablePageScroll();
			mobile_menu.addClass('active');
		});
		$('.mobile__btn-close').click(function () {
			mobile_menu.removeClass('active');
			scrollLock.enablePageScroll();
		});
		$('.nav-dropdown__btn').click(function () {
			$(this).parent().toggleClass('dropdown');
		});
	}
}(jQuery));


// slick truck types

jQuery(document).ready(function ($) {
	if ($('.truck-types').length) {
		let slider = $('.truck-types-slider');
		slider.each(function () {
			let sliderParent = $(this).parent();
			$(this).slick({
				arrows: true,
				prevArrow: '<button class="slider-nav__arrow slider-nav__arrow--prev"><svg viewBox="0 0 95 8" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 3.64645C0.451187 3.84171 0.451187 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53554 7.53553C4.7308 7.34027 4.7308 7.02369 4.53554 6.82843L1.70711 4L4.53554 1.17157C4.7308 0.976311 4.7308 0.659728 4.53554 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM95 3.5L1 3.5V4.5L95 4.5V3.5Z"/></svg></button>',
				nextArrow: '<button class="slider-nav__arrow slider-nav__arrow--next"><svg viewBox="0 0 95 8" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M94.3536 4.35355C94.5488 4.15828 94.5488 3.8417 94.3536 3.64644L91.1716 0.464458C90.9763 0.269196 90.6597 0.269196 90.4645 0.464458C90.2692 0.65972 90.2692 0.976303 90.4645 1.17157L93.2929 3.99999L90.4645 6.82842C90.2692 7.02368 90.2692 7.34026 90.4645 7.53553C90.6597 7.73079 90.9763 7.73079 91.1716 7.53553L94.3536 4.35355ZM4.37114e-08 4.5L94 4.49999L94 3.49999L-4.37114e-08 3.5L4.37114e-08 4.5Z"/></svg></button>',
				dots: true,
				adaptiveHeight: true,
				dotsClass: 'slick-dots dots truck-types-slider__dots',
				asNavFor: '.truck-types .dots',
				customPaging: function (slick, index) {
					let caption = $(slick.$slides[index]).find('.truck-types-slider__title').text();
					return '<h4>' + caption + '</h4>'
				}
			});
			$(this).children('.dots').slick({
				focusOnSelect: true,
				variableWidth: true,
				centerMode: true,
				arrows: false,
				asNavFor: slider,
				responsive: [
				{
					breakpoint: 1367,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 1025,
					settings: {
						slidesToShow: 3
					}
				}
				]
			});
		});
	}
}(jQuery));


jQuery(function ($) {
  const $info = $('.photogallery-slider__info'); // текст (ведущий)
  const $img  = $('.photogallery-slider__img');  // картинки (ведомый)
  if (!$info.length || !$img.length) return;

  // На всякий случай — снять прежние инициализации
  [$info, $img].forEach($s => $s.hasClass('slick-initialized') && $s.slick('unslick'));

  const $nav  = $info.closest('.photogallery-info').find('.slider-nav');
  const $prev = $nav.find('.slider-nav__arrow--prev');
  const $next = $nav.find('.slider-nav__arrow--next');

  // Текстовый слайдер — ведёт
  $info.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    arrows: true,
    prevArrow: $prev,         // привязываем готовые кнопки
    nextArrow: $next,
    appendArrows: $nav,
    asNavFor: $img
  });

  // Картинки — ведомый
  $img.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    asNavFor: $info
  });

  // Пагинация
  const total = $info.find('.slick-slide').not('.slick-cloned').length;
  $nav.find('.total').text(total);
  $info.on('afterChange', function (e, slick, current) {
    $nav.find('.active').text(current + 1);
  });
});









// slick certificates

jQuery(document).ready(function ($) {
	if ($('.certificates').length) {
		let slider = $('.certificates-slider');
		let sliderNav = $('.certificates__nav');
		let sliderParent = slider.parent();
		slider.slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: true,
			appendArrows: sliderNav,
			prevArrow: '<button class="slider-nav__arrow slider-nav__arrow--prev"><svg viewBox="0 0 95 8" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 3.64645C0.451187 3.84171 0.451187 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53554 7.53553C4.7308 7.34027 4.7308 7.02369 4.53554 6.82843L1.70711 4L4.53554 1.17157C4.7308 0.976311 4.7308 0.659728 4.53554 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM95 3.5L1 3.5V4.5L95 4.5V3.5Z"/></svg></button>',
			nextArrow: '<button class="slider-nav__arrow slider-nav__arrow--next"><svg viewBox="0 0 95 8" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M94.3536 4.35355C94.5488 4.15828 94.5488 3.8417 94.3536 3.64644L91.1716 0.464458C90.9763 0.269196 90.6597 0.269196 90.4645 0.464458C90.2692 0.65972 90.2692 0.976303 90.4645 1.17157L93.2929 3.99999L90.4645 6.82842C90.2692 7.02368 90.2692 7.34026 90.4645 7.53553C90.6597 7.73079 90.9763 7.73079 91.1716 7.53553L94.3536 4.35355ZM4.37114e-08 4.5L94 4.49999L94 3.49999L-4.37114e-08 3.5L4.37114e-08 4.5Z"/></svg></button>',
			draggable: true,
			responsive: [
			{
				breakpoint: 550,
				settings: {
					slidesToShow: 1
				}
			}
			]
		});

		slider.on('afterChange', function (event, slick, currentSlide) {
			sliderNav.find('.slider-nav__pagination .active').html(currentSlide + 1);
		});

		let sliderItemsNum = slider.find('.slick-slide').not('.slick-cloned').length;
		sliderNav.find('.slider-nav__pagination .total').html(sliderItemsNum);
	}
}(jQuery));


// image comparison

jQuery(document).ready(function ($) {
	$('.image-comparison').each(function () {
		var cur = $(this);
		var width = cur.width() + 'px';
		cur.find('.image-comparison__resize img').css('width', width);
		drags(cur.find('.image-comparison__handle'), cur.find('.image-comparison__resize'), cur);
	});
	$(window).resize(function () {
		$('.image-comparison').each(function () {
			var cur = $(this);
			var width = cur.width() + 'px';
			cur.find('.image-comparison__resize img').css('width', width);
		});
	});

	function drags(dragElement, resizeElement, container) {

		dragElement.on('mousedown touchstart', function (e) {

			dragElement.addClass('ba-draggable');
			resizeElement.addClass('ba-resizable');

			var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

			var dragWidth = dragElement.outerWidth(),
			posX = dragElement.offset().left + dragWidth - startX,
			containerOffset = container.offset().left,
			containerWidth = container.outerWidth();

			minLeft = containerOffset + 10;
			maxLeft = containerOffset + containerWidth - dragWidth - 10;

			dragElement.parents().on("mousemove touchmove", function (e) {

				var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

				leftValue = moveX + posX - dragWidth;

				if (leftValue < minLeft) {
					leftValue = minLeft;
				} else if (leftValue > maxLeft) {
					leftValue = maxLeft;
				}

				widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

				$('.ba-draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
					$(this).removeClass('draggable');
					resizeElement.removeClass('ba-resizable');
				});
				$('.ba-resizable').css('width', widthValue);
			}).on('mouseup touchend touchcancel', function () {
				dragElement.removeClass('ba-draggable');
				resizeElement.removeClass('ba-resizable');
			});
			e.preventDefault();
		}).on('mouseup touchend touchcancel', function (e) {
			dragElement.removeClass('ba-draggable');
			resizeElement.removeClass('ba-resizable');
		});
	}
}(jQuery));


// slick hotel-room

jQuery(document).ready(function ($) {
	if ($('.hotel-room__slider').length) {
		let slider = $('.hotel-room__slider');

		slider.each(function () {
			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true,
				fade: true,
				cssEase: 'linear',
				arrows: true,
				prevArrow: '<button class="slider-nav__arrow slider-nav__arrow--prev"><i class="ti-angle-left"></i></button>',
				nextArrow: '<button class="slider-nav__arrow slider-nav__arrow--next"><i class="ti-angle-right"></i></button>'
			});
		});
	}
}(jQuery));


// slick hotel-room

jQuery(document).ready(function ($) {
	function setTKValue() {
		$('.js-order-delivery-label').text($('[name="ADDRESS"]').val() + ', ' + $('[name="ROOM"]').val() + ', ' + $('[name="ZIP"]').val());
	}

	function setPickupValue() {
		$('.js-order-delivery-label').text($('[name="PICKUP_ADDRESS"]:checked').length ? $('[name="PICKUP_ADDRESS"]:checked').val() : '');
	}

	var form = $("#checkout-form");
	form.children("div").steps({
		headerTag: "h3",
		bodyTag: "section",
		transitionEffect: "slideLeft",
		cssClass: "tabcontrol",
		enableAllSteps: true,
        // labels: {
        // 	next: "",
        // 	previous: "",
        // 	finish: ""
        // },
        onStepChanging: function (event, currentIndex, newIndex) {
        	form.find('input:not([name="your-agree"])').each(function (index, el) {
        		moveOrderInfo($(this));
        	});
        	moveOrderInfo(form.find('textarea'));
        	moveOrderInfo(form.find('select'));
        	form.validate().settings.ignore = ":disabled,:hidden";
        	return form.valid();
        },
        onFinishing: function (event, currentIndex) {
        	console.log('test');
        	form.validate().settings.ignore = ":disabled";
        	return form.valid();
        }
    });
	form.validate({
		errorPlacement: function (error, element) {
			element.before(error);
		}
	});
	jQuery.extend(jQuery.validator.messages, {
		required: 'Это поле обязательно для заполнения.',
		email: "Некорректный формат e-mail"
	});
	let nextButton = form.find('.checkout-btn__next');
	let delivery = form.find('.delivery-info');
	let pickup = form.find('.pickup-info');
	let deliveryMethod = form.find('input[name="DELIVERY_METHOD"]');

	delivery.slideUp('');
	pickup.slideUp('');

	$('[name="PAYMENT_ID"]').change(function () {
		$('.js-order-payment-label').text($(this).next().text());
	});

	$('[name="DELIVERY_METHOD"]').change(function () {
		$('.js-order-delivery-method-label').text($(this).next().text());
	});

	$('[name="PICKUP_ADDRESS"]').change(function () {
		setPickupValue();
	});

	$('[name="ADDRESS"], [name="ROOM"], [name="ZIP"]').change(function () {
		setTKValue();
	});

	deliveryMethod.change(function (event) {
		switch ($(this).attr('id')) {
			case 'your-delivery-method-1':
			pickup.slideDown('');
			delivery.slideUp('');
			pickup.find('input').removeAttr('disabled');
			pickup.find('select').removeAttr('disabled');
			delivery.find('input').attr('disabled', '');
			delivery.find('select').attr('disabled', '');

			setPickupValue();

			break;
			case 'your-delivery-method-2':
			pickup.slideUp('');
			delivery.slideDown('');
			delivery.find('input').removeAttr('disabled');
			delivery.find('select').removeAttr('disabled');
			pickup.find('input').attr('disabled', '');
			pickup.find('select').attr('disabled', '');

			setTKValue();

			break;
		}
	});

	nextButton.click(function (event) {
		event.preventDefault();
		form.find('.actions li:nth-child(2)>a').click();
		if ($(this).hasClass('checkout-btn__final')) {
			$('.tabcontrol>.steps>ul>li:not(:last-child)').removeClass('done');

			if (form.valid()) {
				$.post('/ajax/order.php', form.serializeArray(), function(data) {
					if (data.success) {
						$('.js-order-number').text(data.order_id);
					} else {
						$('.js-order-total-info').html(data.message);
					}
				}, 'json');
			}
		}
	});

	function moveOrderInfo(orderInput) {
		let orderInputName = orderInput.attr('name');
		if (orderInput.attr('disabled') === 'disabled') {
			$('.order-info__' + orderInputName + '').text('');
			return;
		}
		if (orderInputName === 'your-address-room') {
			$('.order-info__your-address').append(', ' + orderInput.val());
			return;
		}
		if (orderInputName === 'your-address-index') {
			$('.order-info__your-address').prepend(orderInput.val() + ' ,');
			return;
		}
		if (orderInput.attr('type') === 'radio') {
			if (!orderInput.prop('checked')) {
				return;
			}
		}
		$('.order-info__' + orderInputName + '').text(orderInput.val());
	}
}(jQuery));

}
/*
     FILE ARCHIVED ON 15:50:07 Apr 01, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:02:50 Oct 16, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 2.405
  exclusion.robots: 0.032
  exclusion.robots.policy: 0.019
  esindex: 0.013
  cdx.remote: 70.639
  LoadShardBlock: 432.368 (3)
  PetaboxLoader3.datanode: 627.756 (5)
  load_resource: 883.585
  PetaboxLoader3.resolve: 168.455
  loaddict: 577.812
*/