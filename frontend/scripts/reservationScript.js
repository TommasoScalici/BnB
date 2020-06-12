$(document).ready(function () {    
    $(window).on('load', function() 
    {
        
        
//By Tom: https://rb.gy/erpn1z ;)        
        $("#reservation-checkin").val($("#searchbar-checkin").val());
        $("#reservation-checkout").val($("#searchbar-checkout").val());

        $("#cleaning-cost").val(3*$("#apartmentRooms").val());   //6 per il numero di stanze
        
        $(".guests-input, #reservation-checkin, #reservation-checkout").change(function() {

            let stayCost;
            let adults = 0;
            let newborns = 0;
            let sum = 0;
            let date1 = new Date ($('#reservation-checkin').val()); 
            let date2 = new Date ($('#reservation-checkout').val());
            let apartmentPrice = Number($('#apartmentPrice').val());

            $(".guests-input").each(function() {
                if($(this).val() < 0)
                    $(this).val(0);
                    sum += Number($(this).val());
                });
            
            newborns = Number($("#newborns").val());
            adults = sum - newborns;

            if(sum == 0)
                $("#peopleDropdown").text("Aggiungi ospiti");
            else if(sum == 1)
                $("#peopleDropdown").text(`${sum} ospite`);
            else
                $("#peopleDropdown").text(`${sum} ospiti`);

            $("#reservation-guests").val(sum);

            stayCost = ((date2 - date1)/86400000 * (apartmentPrice)*(adults + (newborns/2)));

            if(stayCost > 0)
                $('#strong-price').html(stayCost+"€");
                $('#stay-cost').val(stayCost);
                
        });
       
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
});