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

    // Дадим доступ к карте снаружи (важно!)
    window.myMap = myMap;
    window.ymap = myMap; // дубликат, на всякий случай

    myMap.behaviors.enable(['drag', 'scrollZoom']);

    var objectManager = new ymaps.ObjectManager({
      clusterize: true,
      clusterHasBalloon: false,
      geoObjectOpenBalloonOnClick: false
    });
    var organizationID = '';

    // Рисуем PNG-метки как у тебя
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
    function clickGoto(e) {
      if (e && e.preventDefault) e.preventDefault();

      // 1) Плавно докручиваем к карте (надёжно)
      var mapEl = document.getElementById('map');
      if (mapEl) {
        // два вызова — для мобильных, где прыгает адресная строка
        mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function(){ mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 250);
      }

      // 2) Берём координаты из data-атрибутов, если есть
      var lat = parseFloat(this.getAttribute('data-lat'));
      var lng = parseFloat(this.getAttribute('data-lng'));

      // функция перелёта
      function flyTo(coords) {
        try {
          var p = myMap.panTo(coords, { flying: true, delay: 50 });
          // В старых версиях panTo может не возвращать thenable — сделаем fallback
          if (p && typeof p.then === 'function') {
            p.catch(function(){ myMap.setCenter(coords, myMap.getZoom()); });
          }
        } catch (err) {
          myMap.setCenter(coords, myMap.getZoom());
        }
      }

      if (!isNaN(lat) && !isNaN(lng)) {
        // координаты заданы — просто перелетаем
        flyTo([lat, lng]);
        return false;
      }

      // 3) Fallback: геокод по строке из data-goto (если координаты не заданы)
      var city = this.getAttribute('data-goto');
      if (city && window.ymaps) {
        ymaps.geocode(city).then(
          function(res) {
            var first = res.geoObjects.get(0);
            if (!first) return;
            var coords = first.geometry.getCoordinates();
            flyTo(coords);
          },
          function() {
            // без alert — просто молча не двигаем
            console.warn('Geocode failed for:', city);
          }
        );
      }
      return false;
    }

    // Навешиваем обработчик на все .location__btn
    var mapLink = document.querySelectorAll('.location__btn');
    for (var j = 0; j < mapLink.length; j++) {
      mapLink[j].onclick = clickGoto;
      // на всякий случай перепишем href, чтобы страница не перезагружалась
      if (mapLink[j].getAttribute('href') && mapLink[j].getAttribute('href') !== '#map') {
        mapLink[j].setAttribute('href', '#map');
      }
    }
  }
};
