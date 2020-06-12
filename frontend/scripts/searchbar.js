/*
*** 
*** Scripts per la gestione dell'autocompletamento della SearchBar
*** con Autocomplete (Google Places) e per l'aggiornamento del totale nel campo ospiti
***
*/

var autocomplete;
  
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

// Si occupa di aggiornare il contatore (totale) degli ospiti
// quando si modificano le diverse tipologie di ospiti (adulti, bambini, neonati)
function updateGuests() {
    let sum = 0;
    $(".guests-input").each(function() {
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

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('searchbar-location'), {types: ['geocode']});
    autocomplete.setFields(['address_component']);

    autocomplete.addListener('place_changed', function() {
        let place = autocomplete.getPlace();

        $(".searchbar-hidden-field").val(null);

        // Get each component of the address from the place details,
        // and then fill-in the corresponding field on the form.
        for (let i = 0; i < place.address_components.length; i++) {
            let addressType = place.address_components[i].types[0];

            switch (addressType) {
                case "administrative_area_level_2":
                    $("#searchbar-province").val(place.address_components[i].short_name);
                    break;
                case "country":
                    $("#searchbar-country").val(place.address_components[i].short_name);
                    break;
                case "locality":
                    $("#searchbar-town").val(place.address_components[i].short_name)
                    break;
                case "postal_code":
                    $("#searchbar-postalcode").val(place.address_components[i].short_name)
                    break;
                case "route":
                    $("#searchbar-street").val(place.address_components[i].short_name)
                    break;
                case "street_number":
                    $("#searchbar-streetnumber").val(place.address_components[i].short_name)
                    break;
                default:
                    break;
            }
        }
    });
    // Fine gestione autocompletamento Google Maps Places

    // Gestione dei cookie per la query di ricerca
    if(Cookies.get("query_search")) {
        $("#searchbar-form").deserialize(Cookies.get("query_search"));
        updateGuests();
    }

    $("#searchbar-form").submit(function(event) {

        if(autocomplete !== undefined &&
          (autocomplete.getPlace() !== undefined  || autocomplete.getPlace().name !== undefined))
            $(".searchbar-hidden-field").val(null);

        let cookie = Cookies.get("query_search");
        let data =  $(this).serialize();

        if(!cookie || cookie !== data) {
            event.preventDefault();
            Cookies.set("location", $("#searchbar-location").val(), {expires: 7});
            Cookies.set("query_search", data, {expires: 7});
            $(this).submit();
        }

    })
    // Fine gestione cookie

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
});


$(".guests-input").change(() => updateGuests());