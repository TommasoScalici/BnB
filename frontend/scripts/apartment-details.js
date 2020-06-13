function updateCosts() {

  let checkinDate = moment($("#reservation-checkin").val());
  let checkoutDate = moment($("#reservation-checkout").val());
  let guestsAdults = Number($("#guests-adults").val());
  let guestsChildren = Number($("#guests-children").val());
  
  let nights = checkoutDate.diff(checkinDate, "days");
  
  let cityTax = guestsAdults * 5 + guestsChildren * 2; // Tasse di soggiorno fisse per semplicità (per il momento)
  let cleaningCost = rooms * 5; // Per ora è fisso, si potrebbe dare la possibilità all'host di inserire quanto farsi
                                // pagare come pulizia per ogni stanza
  let serviceCost = 20; // Per ora lo metto fisso, sarebbe il costo di gestione della piattaforma
  let stayCost = price * nights;

  $("#nights").text(nights);

  $("#reservation-citytax").val(cityTax);
  $("#citytax").text(`${cityTax} €`);

  $("#reservation-cleaningcost").val(cleaningCost);
  $("#cleaningcost").text(`${cleaningCost} €`);

  $("#reservation-servicecost").val(20);
  $("#servicecost").text("20 €");

  $("#reservation-staycost").val(stayCost);
  $("#staycost").text(`${stayCost} €`);

  $("#totalcost").text(`${cityTax + cleaningCost + serviceCost + stayCost} €`);
}

$(document).ready(function() {

    $('[data-toggle="popover"]').popover();
  
    $('.popover-dismiss').popover({
      trigger: 'focus'
    });
  
    if(user)
      $('#confirm-reservation').popover('disable');
    else
      $('#confirm-reservation').popover('enable');

    $(document).on('click', '#login-link', function() {
      $('#signin-modal').modal('show');
    });


    $("#reservation-checkin, #reservation-checkout, .guests-input").change(function() {

        if(!($("#reservation-checkin").val()) ||!($("#reservation-checkout").val()))
          return;

        updateCosts();
    });

    // Controlli per correttezza delle date
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