
window.onload = function() {
	var myMap;
	var shopList = [
	{
		'coordinates': [55.230492, 72.900109],
		'name': 'Поселок “Красный Яр”'
	},
	{
		'coordinates': [54.863114, 73.297955],
		'name': 'Село “Троицкое”'
	}
	];
	ymaps.ready(init);


	function init() {

		myMap = new ymaps.Map('map', {
			center: [55.230492, 72.900109],
			zoom: 16.25
		}, {
			searchControlProvider: 'yandex#search'
		});

		myMap.behaviors.enable(['drag', 'scrollZoom']);
		
		var objectManager = new ymaps.ObjectManager({
			clusterize: true,
			clusterHasBalloon: false,
			geoObjectOpenBalloonOnClick: false
		});
		var organizationID = '';

		for (var i = 0; i < shopList.length; i++) {

			var shopInfo = shopList[i];
			objectManager.add({
				type: 'Feature',
				id: i,
				geometry: {
					type: 'Point',
					coordinates: shopInfo.coordinates
				},
				options: {
					iconLayout: 'default#image',
					iconImageHref: '../../img/svg/maps-and-flags.svg',
					iconImageSize: [48, 66],
					iconImageOffset: [-24, -66],
				}
			});
		}

		myMap.geoObjects.add(objectManager);
		// objectManager.objects.events.add('click', function (e) {
		// 	var objectId = e.get('objectId');
		// 	openBaloon(objectId);
		// });

		function clickGoto() {
			var city = this.getAttribute('data-goto');
			var myGeocoder = ymaps.geocode(city);
			myGeocoder.then(
				function(res) {
					coords = res.geoObjects.get(0).geometry.getCoordinates();
					myMap.panTo(coords, {
						flying: 1
					});
				},
				function(err) {
					alert('Ошибка');
				}
				);
			return false;
		}
		// function openBaloon(index) {
		// 	if (index === 0) {
		// 		organizationID = '1306705509';
		// 	}else{
		// 		organizationID = '237569699476';
		// 	}
		// 	ymaps.findOrganization(organizationID).then(
		// 		function (orgGeoObject) {
		// 			myMap.geoObjects.add(orgGeoObject);
		// 			orgGeoObject.options.hideIconOnBalloonOpen = true;
		// 			orgGeoObject.options.fillOpacity = 0;
		// 			orgGeoObject.balloon.open();
		// 		},
		// 		function (err) {
		// 		}
		// 		);
		// 	return false;
		// }

		var mapLink = document.querySelectorAll('.location__btn');
		for (var i = 0, n = mapLink.length; i < n; ++i) {
			mapLink[i].onclick = clickGoto;
		}

	}
};


/*
playback timings (ms):
  captures_list: 0.626
  exclusion.robots: 0.034
  exclusion.robots.policy: 0.022
  esindex: 0.012
  cdx.remote: 196.821
  LoadShardBlock: 1464.288 (3)
  PetaboxLoader3.resolve: 1736.362 (4)
  PetaboxLoader3.datanode: 1534.329 (5)
  load_resource: 2170.803
  loaddict: 471.065
*/