/*
*** 
*** Scripts per la gestione dell'autocompletamento della Search Bar
*** e per l'aggiornamento del totale nel campo ospiti
***
*/

var autocomplete;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('searchbar-location'), {types: ['geocode']});
    autocomplete.setFields(['address_component']);
  
    autocomplete.addListener('place_changed', function() {
        let place = autocomplete.getPlace();

        // Get each component of the address from the place details,
        // and then fill-in the corresponding field on the form.
        for (let i = 0; i < place.address_components.length; i++) {
            let addressType = place.address_components[i].types[0];

            switch (addressType) {
                case "administrative_area_level_2":
                    $("#searchbar-province").val(place.address_components[i].short_name);
                    break;
                case "locality":
                    $("#searchbar-town").val(place.address_components[i].short_name)
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

    initAutocomplete();

    // Gestione dei cookie per la query di ricerca
    if(Cookies.get("query_search")) {
        $("#searchbar-form").deserialize(Cookies.get("query_search"));
        updateGuests();
    }

    $("#searchbar-form").submit(function(event) {
        let cookie = Cookies.get("query_search");
        let data =  $(this).serialize();

        if(!cookie || cookie != data) {
            event.preventDefault();
            Cookies.set("query_search", data, {expires: 7});
            $(this).submit();
        }
    })
    // Fine gestione cookie


    // Gestione autocompletamento per input di ricerca location
    // $.getJSON("../data/comuni.json", function(data) {
    //     $("#searchbar-location").autocomplete({

    //         focus: function(event, ui) {
    //             $("#searchbar-location").val(`${ui.item.label} (${ui.item.value})`);
    //             return false;
    //         },

    //         select: function(event, ui) {
    //             $("#searchbar-location").val(`${ui.item.label} (${ui.item.value})`);
    //             $("#searchbar-province").val(ui.item.value);
    //             $("#searchbar-town").val(ui.item.label);
    //             return false;
    //         },

    //         source: function(request, response) {
    //             let matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex(request.term), "i" );
    //             let results = data.map(x => {return { label: x.nome, value: x.sigla} })
    //             results = $.grep(results, function(item) { return matcher.test(item.label || item.value)});
    //             results.sort();
    //             response(results.slice(0, 10));
    //         } 
    //     })

    //     if($("#searchbar-location").autocomplete("instance") !== undefined) {
    //         $("#searchbar-location").autocomplete("instance")._renderItem = function(ul, item) {
    //             return $("<li>").append(`<div>${item.label} (${item.value})</div>`)
    //                             .appendTo(ul);
    //         };
    //     }
    // });

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