var map;

function initMap() {
    map = new google.maps.Map($('#map')[0], { zoom: 12 });
}

// Geocodifica per gli appartamenti presenti nei risultati di ricerca
function geocodeApartments() {
    let address;
    let geocoder = new google.maps.Geocoder();

    address = Cookies.get("location");

    geocoder.geocode( {address: address}, function(results, status) {
        if(status === google.maps.GeocoderStatus.OK)
          map.setCenter(results[0].geometry.location);
    });

    $(".apartment-preview").each(function(index, element) {
        let marker;
        geocoder.geocode( {address: $(element).find(".apartment-fulladdress")[0].innerText}, function(results, status) {

        if (status === google.maps.GeocoderStatus.OK) {

          let apartmentAnchor = $(element).find(".apartment-anchor")[0].innerText;
          let apartmentName = $(element).find(".apartment-name")[0].innerText;
          let apartmentPrice = $(element).find(".apartment-price")[0].innerText
          let apartmentFirstPicture = $(element).find(".apartment-image")[0].innerText;

          map.setCenter(results[0].geometry.location);

          if(marker)
            marker.setMap(null);

          marker = new google.maps.Marker({
              animation: google.maps.Animation.DROP,
              icon: "/images/marker.png",
              map: map,
              position: results[0].geometry.location,
              label: {
                fontWeight: 'bold',
                text: apartmentPrice,
              } 
          });

          
          let infoContent = `<a href="${apartmentAnchor}"><img width="250" height="150" alt="apartment picture"
                             src="${apartmentFirstPicture}"><h5 class="my-3">${apartmentName}</h5></a>
                             <p class="text-muted">${apartmentPrice} a notte</p>`;
                             
          let infoWindow = new google.maps.InfoWindow({ content: infoContent, maxWidth: 280 });
          marker.addListener('click', function () { infoWindow.open(map, marker); });
        }
      }); 
    });
}