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
  
    $('#guests-validation-popover').popover('disable');

    if(user)
      $('#confirm-reservation').popover('disable');
    else
      $('#confirm-reservation').popover('enable');

    $(document).on('click', '#login-link', function() {
      $('#signin-modal').modal('show');
    });

    if(user) {
      $("#confirm-reservation").on('click', function() {
  
        if($("#guests").val() < 1) {
          $(".guests-input")[0].setCustomValidity("Devi inserire almeno un ospite.");
          $('#guests-validation-popover').popover('enable');
          $('#guests-validation-popover').popover('show');
          setTimeout(() => {
            $('#guests-validation-popover').popover('hide');
          }, 2000);
        }
        else {
          $(".guests-input")[0].setCustomValidity('');
          $('#guests-validation-popover').popover('disable');
        }
  
        if($("#reservation-summary-form")[0].checkValidity())
          $("#reservation-summary-form").submit();
        
        $("#reservation-summary-form")[0].reportValidity(); 
      });
    }

    // Aggiorno i costi se le date sono già impostate
    if(($("#reservation-checkin").val()) && ($("#reservation-checkout").val()))
      updateCosts();

    // Aggiorni i costi anche quando i parametri cambiano
    $("#reservation-checkin, #reservation-checkout, .guests-input").change(function() {

        if(!($("#reservation-checkin").val()) ||!($("#reservation-checkout").val()))
          return;

        updateCosts();
    });

    // Controlli per correttezza delle date
    $("#reservation-checkin").attr("min", moment().format("YYYY-MM-DD"));
    $("#reservation-checkout").attr("min", moment().format("YYYY-MM-DD"));

    $("#reservation-checkin").change(function() {
        $("#reservation-checkout").attr("min", $("#reservation-checkin").val());

        if($("#reservation-checkin").val() > $("#reservation-checkout").val())
            $("#reservation-checkout").val($("#reservation-checkin").val());
    });

    $("#reservation-checkout").change(function() {
        if($("#reservation-checkin").val() > $("#reservation-checkout").val())
            $("#reservation-checkin").val($("#reservation-checkout").val());
    });

  });