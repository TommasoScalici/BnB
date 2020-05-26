function checkPasswordMatch() {

    if ($("#password").val() != $("#repass").val())
        $("#repass")[0].setCustomValidity("Le password non coincidono!");
    else
        $("#repass")[0].setCustomValidity('');
}

$(document).ready(function () {

    $("a").click(function() {

        let url = $(this).attr("href");

        if(url == "/" || url.startsWith("#"))
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

    $(function() {
        $('form.form-signin').submit(function(event) {

            $('#alertEmail').fadeOut();
            $('#alertPass').fadeOut();

            event.preventDefault(); 
            let form = $(this);

            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize()
            }).done(function(response) {

                $('#alertSuccess').fadeIn(2000).fadeOut(1000);
                setTimeout(() => { $('#signinModal').modal('hide'); }, 3000);
                setTimeout(() => { window.location.replace("/"); }, 4000);

            }).fail(function(response) {

                if(response.responseJSON.message == "User not found")
                    $('#alertEmail').fadeIn(1000);
                else if(response.responseJSON.message == "Password mismatch")
                    $('#alertPass').fadeIn(1000);

                });
            });
        });

    $("#repass").keyup(checkPasswordMatch);
});

$(document).on('shown.bs.modal', function() {
    $(this).find('[autofocus]').focus();
});