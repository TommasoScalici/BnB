/*
*** 
*** Scripts per la gestione dell'autocompletamento della Search Bar
*** e per l'aggiornamento del totale nel campo ospiti
***
*/

function updateGuests() {
    let sum = 0;
    $(".guests-input").each(function() {
        sum += Number($(this).val());
    });

    if(sum == 0)
        $("#searchbar-peopleDropdown").text("Aggiungi ospiti");
    else if(sum == 1)
        $("#searchbar-peopleDropdown").text(`${sum} ospite`);
    else
        $("#searchbar-peopleDropdown").text(`${sum} ospiti`);

    $("#searchbar-guests").val(sum);
}

$(document).ready(function() {
    $.getJSON("../data/comuni.json", function(data) {
        $("#searchbar-location").autocomplete({

            focus: function(event, ui) {
                $("#searchbar-location").val(`${ui.item.label} (${ui.item.value})`);
                return false;
            },

            select: function(event, ui) {
                $("#searchbar-location").val(`${ui.item.label} (${ui.item.value})`);
                $("#searchbar-province").val(ui.item.value);
                $("#searchbar-town").val(ui.item.label);
                return false;
            },

            source: function(request, response) {
                let matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex(request.term), "i" );
                let results = data.map(x => {return { label: x.nome, value: x.sigla} })
                results = $.grep(results, function(item) { return matcher.test(item.label || item.value)});
                results.sort();
                response(results.slice(0, 10));
            } 
        })

        if($("#searchbar-location").autocomplete("instance") !== undefined) {
            $("#searchbar-location").autocomplete("instance")._renderItem = function(ul, item) {
                return $("<li>").append(`<div>${item.label} (${item.value})</div>`)
                                .appendTo(ul);
            };
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
});


$(".guests-input").on('input', () => updateGuests());