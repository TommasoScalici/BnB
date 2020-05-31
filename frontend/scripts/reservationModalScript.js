$(document).ready(function () {    
    $(window).on('load', function() 
    {
        var totalPrice;
        var apartmentPrice = Number($('#apartmentPrice').val());

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

        $("#checkin, #checkout").change(function(){

            
            var date1 = new Date ($('#checkin').val()); 
            var date2 = new Date ($('#checkout').val());
            
            totalPrice = (date2 - date1)/86400000 * apartmentPrice;
            
            
            $('#totalPriceLabel').html(totalPrice);
        });
       
        $("#checkin").attr("min", moment().format("YYYY-MM-DD"));
        $("#checkout").attr("min", moment().format("YYYY-MM-DD"));

        $("#checkin").change(function() {
            $("#checkout").attr("min", $("#checkin").val());

                if($("#checkin").val() > $("#checkout").val())
                    $("#checkout").val($("#checkin").val());
        });

        $("#checkout").change(function() {
            if($("#checkin").val() > $("#checkout").val())
                $("#checkin").val($("#checkout").val());
        });

    });
    $("#to-signinModal").click(function(event) {
        event.preventDefault();
        $('#reservationModal').modal('hide');
    });
});


