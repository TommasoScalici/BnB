$(document).ready(function () {    
    $(window).on('load', function() 
    {
        
        
//By Tom: https://rb.gy/erpn1z ;)        
        $("#reservation-checkin").val($("#searchbar-checkin").val());
        $("#reservation-checkout").val($("#searchbar-checkout").val());
        
        $(".guests-input, #reservation-checkin, #reservation-checkout").change(function() {

            let totalPrice;
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

            totalPrice = ((date2 - date1)/86400000 * (apartmentPrice)*(adults + (newborns/2)));

            if(totalPrice > 0)
                $('#strong-price').html(totalPrice+"€");
                
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

        //Non so perchè ma sta cosa fixa il problema che puoi selezionare anche date precedenti al cui giorno presente
        if(false){
        }
        });



    });
});