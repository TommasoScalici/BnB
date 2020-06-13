var autocomplete;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {types: ['geocode']});
    autocomplete.setFields(['address_component']);
  
    autocomplete.addListener('place_changed', function() {
        let place = autocomplete.getPlace();

        // Get each component of the address from the place details,
        // and then fill-in the corresponding field on the form.
        for (let i = 0; i < place.address_components.length; i++) {
            let addressType = place.address_components[i].types[0];

            switch (addressType) {
                case "administrative_area_level_2":
                    $("#province").val(place.address_components[i].short_name);
                    break;
                case "country":
                    $("#country").val(place.address_components[i].short_name);
                    break;
                case "locality":
                    $("#town").val(place.address_components[i].short_name)
                    break;
                case "postal_code":
                    $("#postalcode").val(place.address_components[i].short_name)
                    break;
                case "route":
                    $("#street").val(place.address_components[i].short_name)
                    break;
                case "street_number":
                    $("#streetnumber").val(place.address_components[i].short_name)
                    break;
                default:
                    break;
            }
        }
    });
}
  
  
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        let geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        let circle = new google.maps.Circle({
            center: geolocation, radius: position.coords.accuracy});
            autocomplete.setBounds(circle.getBounds());
        });
    }
}

$(document).ready(function() {
    initAutocomplete();
});