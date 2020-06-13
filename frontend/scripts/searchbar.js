/*
*** 
*** Scripts per la gestione dell'autocompletamento della SearchBar
*** con Autocomplete (Google Places) e per l'aggiornamento del totale nel campo ospiti
***
*/

var addressCalculated;
var autocompleteSearchbar;
var geolocation;
  
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        let circle = new google.maps.Circle({
            center: geolocation, radius: position.coords.accuracy});
            autocompleteSearchbar.setBounds(circle.getBounds());
        });
    }
}


function setFieldsFromAddressComponents(address_components) {

    address = $("#searchbar-location").val();
    $(".searchbar-hidden-field").val(null);

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (let i = 0; i < address_components.length; i++) {
        let addressType = address_components[i].types[0];

        switch (addressType) {
            case "administrative_area_level_2":
                $("#searchbar-province").val(address_components[i].short_name);
                break;
            case "country":
                $("#searchbar-country").val(address_components[i].short_name);
                break;
            case "locality":
                $("#searchbar-town").val(address_components[i].short_name)
                break;
            case "postal_code":
                $("#searchbar-postalcode").val(address_components[i].short_name)
                break;
            case "administrative_area_level_1":
                $("#searchbar-region").val(address_components[i].short_name)
                break;
            case "route":
                $("#searchbar-street").val(address_components[i].short_name)
                break;
            case "street_number":
                $("#searchbar-streetnumber").val(address_components[i].short_name)
                break;
            default:
                break;
        }
    }
}

// Si occupa di aggiornare il contatore (totale) degli ospiti
// quando si modificano le diverse tipologie di ospiti (adulti, bambini, neonati)
function updateGuests() {
    let sum = 0;
    $(".searchbar-guests-input").each(function() {
        if($(this).val() < 0)
            $(this).val(0);
        sum += Number($(this).val());
    });

    if(sum == 0)
        $("#searchbar-people-dropdown").text('Aggiungi ospiti');
    else if(sum == 1)
        $("#searchbar-people-dropdown").text(`${sum} ospite`);
    else
        $("#searchbar-people-dropdown").text(`${sum} ospiti`);

    $("#searchbar-guests").val(sum);
}

$(document).ready(function() {

    addressCalculated = false;
    autocompleteSearchbar = new google.maps.places.Autocomplete(document.getElementById('searchbar-location'), {types: ['geocode']});
    autocompleteSearchbar.setFields(['address_component']);

    autocompleteSearchbar.addListener('place_changed', function() {
        let place = autocompleteSearchbar.getPlace();
        setFieldsFromAddressComponents(place.address_components);
    });
    // Fine gestione autocompletamento Google Maps Places

    // Gestione dei cookie per la query di ricerca
    if(Cookies.get("query_search")) {
        $("#searchbar-form").deserialize(Cookies.get("query_search"));
        updateGuests();
    }

    $(document).on('submit', '#searchbar-form', function(event) {

        if((autocompleteSearchbar.getPlace() === undefined || autocompleteSearchbar.getPlace().name !== undefined)
            && !addressCalculated) {

            event.preventDefault();
            let address = $("#searchbar-location").val();
            let geocoder = new google.maps.Geocoder();

            if(!address) {
                geocoder.geocode( {location: geolocation}, function(results, status) {
                    if(status === google.maps.GeocoderStatus.OK) {
                        $("#searchbar-location").val(results[0].formatted_address);
                        $("#searchbar-form").submit();
                    }
                });
            }
            else {
                geocoder.geocode( {address: address}, function(results, status) {
                    if(status === google.maps.GeocoderStatus.OK) {
                        addressCalculated = true;
                        setFieldsFromAddressComponents(results[0].address_components);
                        $("#searchbar-form").submit();
                    }
                });
            }
            
        }
        else
        {
            let cookie = Cookies.get("query_search");
            let data =  $(this).serialize();

            if(!cookie || cookie !== data) {
                event.preventDefault();
                Cookies.set("location", $("#searchbar-location").val());
                Cookies.set("query_search", data);
                $(this).submit();
            }
        }   
    });

    $("#searchbar-checkin").attr("min", moment().format("YYYY-MM-DD"));
    $("#searchbar-checkout").attr("min", moment().format("YYYY-MM-DD"));

    $("#searchbar-checkin").change(function() {
        $("#searchbar-checkout").attr("min", $("#searchbar-checkin").val());

        if($("#searchbar-checkin").val() > $("#searchbar-checkout").val())
            $("#searchbar-checkout").val($("#searchbar-checkin").val());
    });

    $("#searchbar-checkout").change(function() {
        if($("#searchbar-checkin").val() > $("#searchbar-checkout").val())
            $("#searchbar-checkin").val($("#searchbar-checkout").val());
    });

    $(".searchbar-guests-input").change(() => updateGuests());
});