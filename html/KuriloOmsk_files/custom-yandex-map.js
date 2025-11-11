window.onload = function() {
  var myMap;
  var shopList = [
    { coordinates: [55.230492, 72.900109], name: 'Поселок “Красный Яр”' },
    { coordinates: [54.863114, 73.297955], name: 'Село “Троицкое”' }
  ];
  ymaps.ready(init);

  function init() {
    myMap = new ymaps.Map('map', {
      center: [55.230492, 72.900109],
      zoom: 16.25
    }, {
      searchControlProvider: 'yandex#search'
    });

    // Дадим доступ к карте снаружи
    window.myMap = myMap;
    window.ymap = myMap; // дубликат, на всякий случай

    myMap.behaviors.enable(['drag', 'scrollZoom']);

    var objectManager = new ymaps.ObjectManager({
      clusterize: true,
      clusterHasBalloon: false,
      geoObjectOpenBalloonOnClick: false
    });
    var organizationID = '';

    // Рисуем PNG-метки
    for (var i = 0; i < shopList.length; i++) {
      var shopInfo = shopList[i];
      objectManager.add({
        type: 'Feature',
        id: i,
        geometry: { type: 'Point', coordinates: shopInfo.coordinates },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../../img/svg/maps-and-flags.svg',
          iconImageSize: [48, 66],
          iconImageOffset: [-24, -66]
        }
      });
    }
    myMap.geoObjects.add(objectManager);

    // --- Обработчик кнопок "Показать на карте" ---
    // мягкая последовательность: scroll -> settle -> pan
    function clickGoto(e) {
      if (e && e.preventDefault) e.preventDefault();

      var mapEl = document.getElementById('map');
      if (!mapEl || !window.myMap) return;

      // 1) Скроллим к карте один раз 
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

      // 2) Ждём, пока прокрутка успокоится
      waitForScrollSettle(280).then(function () {
        // 3) Панорамируем карту плавно
        var lat = parseFloat(e.currentTarget.getAttribute('data-lat'));
        var lng = parseFloat(e.currentTarget.getAttribute('data-lng'));
        var coords = (!isNaN(lat) && !isNaN(lng)) ? [lat, lng] : null;

        if (!coords) return; // если координат нет — просто остановимся у карты

        smoothPanTo(window.myMap, coords, 5000);
      });

      return false;
    }

    // ждём «затухание» скролла окна 
    function waitForScrollSettle(quietMs) {
      return new Promise(function (resolve) {
        var lastY = window.scrollY, idle = 0, raf;
        (function loop() {
          var y = window.scrollY;
          idle = (y === lastY) ? idle + 16 : 0;
          lastY = y;
          if (idle >= quietMs) return resolve();
          raf = requestAnimationFrame(loop);
        })();
      });
    }

    // плавный panTo с защитой + блок колёсика на время полёта
    function smoothPanTo(map, coords, durationMs) {
      var unwheel = lockWheelTemporarily(durationMs + 80);

      try {
        var p = map.panTo(coords, { flying: true, duration: durationMs, delay: 0 });
        if (p && typeof p.then === 'function') {
          p.finally(unwheel).catch(function () {
            map.setCenter(coords, map.getZoom(), { duration: durationMs });
            setTimeout(unwheel, durationMs + 10);
          });
        } else {
          // старые сборки без thenable
          setTimeout(unwheel, durationMs + 10);
        }
      } catch (_) {
        map.setCenter(coords, map.getZoom(), { duration: durationMs });
        setTimeout(unwheel, durationMs + 10);
      }
    }

    // временно блокируем wheel/trackpad, чтобы пользователь не сбивал анимацию
    function lockWheelTemporarily(ms) {
      function stop(e) { e.preventDefault(); }
      window.addEventListener('wheel', stop, { passive: false });
      var t = setTimeout(function () {
        window.removeEventListener('wheel', stop, { passive: false });
      }, ms);
      return function () {
        clearTimeout(t);
        window.removeEventListener('wheel', stop, { passive: false });
      };
    }

    // Навешиваем обработчик на все .location__btn
    var mapBtns = document.querySelectorAll('.location__btn');
    for (var j = 0; j < mapBtns.length; j++) {
      mapBtns[j].onclick = clickGoto;
      if (mapBtns[j].getAttribute('href') && mapBtns[j].getAttribute('href') !== '#map') {
        mapBtns[j].setAttribute('href', '#map');
      }
    }

  }
};
