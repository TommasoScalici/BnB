$(document).ready(function () {

    $("a").click(function() {

        let url = $(this).attr("href");

        if(url.startsWith("#"))
            return;

        else if(url == "signin") {
            $("#dialog").dialog();
            return;
        }
    });

    $("#profileImage").change(function () {
        if (this.files && this.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                $('#profilePicture').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    $("#form-signin").submit(function(event) {

        $('#alertEmail').fadeOut();
        $('#alertPass').fadeOut();

        event.preventDefault(); 
        let form = $(this);

        $.ajax({
            type: $('input[name="_method"]').val(),
            url: form.attr('action'),
            data: form.serialize()
        }).done(function() {

            $('#alertSignInSuccess').fadeIn(2000).fadeOut(1000);
            setTimeout(() => { $('#signinModal').modal('hide'); }, 3000);
            setTimeout(() => { window.location.replace("/"); }, 4000);

        }).fail(function(response) {

            if(response.responseJSON.message == "User not found")
                $('#alertEmail').fadeIn(1000);
            else if(response.responseJSON.message == "Password mismatch")
                $('#alertPass').fadeIn(1000);

        });
    });

    $("#repass").keyup(checkPasswordMatch);
});

$(window).on('load', function() {
    $(".needs-validation").each(function() {

        let form = $(this);

        $(this).on('submit', function(event) {

            event.preventDefault();

            if (form[0].checkValidity() === false) 
                event.stopPropagation();
            else
            {
                $('#alertSignUpError').fadeOut();
 
                if(form[0].enctype == "multipart/form-data") {
                    var formData = new FormData($(this)[0]);

                    $.ajax({
                        url: form.attr('action'),
                        type: $('input[name="_method"]').val(),
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            $('#alertSignUpSuccess').fadeIn(2000).fadeOut(1000);
                            setTimeout(() => { window.location.replace("/"); }, 3000)
                        },
                        error: function(response) {
                            $('#alertSignUpError').html(response.responseJSON.message);
                            $('#alertSignUpError').fadeIn(1000);
                        }
                    });
                }
                else {

                    $.ajax({
                        type: $('input[name="_method"]').val(),
                        url: form.attr('action'),
                        data: form.serialize(),
                        success: function() {
            
                            $('#alertSignUpSuccess').fadeIn(2000).fadeOut(1000);
                            setTimeout(() => { window.location.replace("/"); }, 3000);
                        },
                        error: function(response) {
            
                            $('#alertSignUpError').html(response.responseJSON.message);
                            $('#alertSignUpError').fadeIn(1000);
                
                        }
                    });
                }
            }
        
            form[0].classList.add('was-validated');
        });
    });
});

$(document).on('shown.bs.modal', function() {
    $(this).find('[autofocus]').focus();
});

function checkPasswordMatch() {

    if ($("#password").val() != $("#repass").val())
        $("#repass")[0].setCustomValidity("Le password non coincidono.");
    else
        $("#repass")[0].setCustomValidity('');
}