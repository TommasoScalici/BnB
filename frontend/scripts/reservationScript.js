$(document).ready(function () {    
    $(window).on('load', function() 
    {
        $('.notlogged-popover').popover({
            container: 'body'
            
        });

        // By Tom: questa cosa qui è pericolosa perché lo script viene caricato in index.ejs che contiene già elementi
        // con queste classi e id, c'è rischio di conflitti. Una soluzione potrebbe usare nomi di identificatori diversi
        //By Gigi: ma dove? xD
        //By Salvo: mi piace il cazzo! :)
        $("#adults").change(function(){
            if(Number($("#adults").val()) + Number($("#children").val() ) > $("#guests").attr("max"))
            $("#adults").val($("#adults").val() - 1);
        });    
    
        $("#children").change(function(){
            if(Number($("#adults").val()) + Number($("#children").val() ) > $("#guests").attr("max"))
            $("#children").val($("#children").val() - 1);
        });
        
        $(".guests-input, #checkin, #checkout").change(function() {

            let totalPrice;
            let adults = 0;
            let newborns = 0;
            let sum = 0;
            let date1 = new Date ($('#checkin').val()); 
            let date2 = new Date ($('#checkout').val());
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

            $("#guests").val(sum);

            totalPrice = ((date2 - date1)/86400000 * (apartmentPrice)*(adults + (newborns/2)));

            if(totalPrice > 0)
                $('#strong-price').html(totalPrice+"€");
                
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

        //Non so perchè ma sta cosa fixa il problema che puoi selezionare anche date precedenti al cui giorno presente
        if(false){
        }
        });



    });

    
    
    $("#to-signinModal").click(function(event) {
        event.preventDefault();
        $('#reservationModal').modal('hide');
    });
});