$(document).ready(function () {    
    $(window).on('load', function() {

        $(".guests-input").on('input', function() {

            let sum = 0;
            $(".guests-input").each(function() {
                sum += Number($(this).val());
            });

            if(sum == 0)
                $("#peopleDropdown").text("Aggiungi ospiti");
            else if(sum == 1)
                $("#peopleDropdown").text(`${sum} ospite`);
            else
                $("#peopleDropdown").text(`${sum} ospiti`);

            $("#guests").val(sum);
        });
    });
    $("#to-signinModal").click(function() {
        $('#reservationModal').modal('hide');
    });
});


