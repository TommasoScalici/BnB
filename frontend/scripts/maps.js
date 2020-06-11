var map;

function initMap() {
    map = new google.maps.Map($('#map')[0], { zoom: 12 });
}

$(document).ready(function() {

    let address;
    let geocoder = new google.maps.Geocoder();

    address = $("#search-location").text();

    geocoder.geocode( { 'address': address}, function(results, status) {
        map.setCenter(results[0].geometry.location);
    });

    $(".apartment-preview").each(function(index, element) {
        let marker;
        geocoder.geocode( { 'address': $(element).find(".apartment-fulladdress")[0].innerText}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          if(marker)
            marker.setMap(null);
          marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              label: $(element).find(".apartment-price")[0].innerText
          });
        }
      }); 
    });
});