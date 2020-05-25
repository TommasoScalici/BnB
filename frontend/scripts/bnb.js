function checkPasswordMatch() {

    if ($("#password").val() != $("#repass").val())
        $("#repass")[0].setCustomValidity("Le password non coincidono!");
    else
        $("#repass")[0].setCustomValidity('');
}

$(document).ready(function () {

    $("a").click(function() {

        let url = $(this).attr("href");

        if(url == "/" || url == '#')
            return;

        if(url == "signin") {
            $("#dialog").dialog();

            return;
        }


        $.ajax({
            url: $(this).attr("href"),
            success: function(response) {
                $("#ajaxContent").html(response);
            }
        });

        return false;
    });

    $("#repass").keyup(checkPasswordMatch);
});