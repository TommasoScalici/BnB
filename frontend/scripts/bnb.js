$(document).ready(function () {

    // Renderizza la preview dell'immagine profilo che si sta caricando
    $("#profile-image-input").change(function () {
        if (this.files && this.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                $('#profile-image').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Renderizza le previews per le immagini all'inserimento di un nuovo alloggio
    // utilizzando l'effetto fadein
    $(".images-file-input").change(function(event) {

        if (this.files && this.files[0]) {
            let files = this.files;

            let dataid = event.target.getAttribute("data-id") ?
                         `-${event.target.getAttribute("data-id")}` : "";

            // Inizializzazione view per il caricamento
            $(`#photos-preview${dataid}`).empty(); // Svuoto nel caso ci fossero immagini caricate in precedenza
            $(`#progressbar${dataid}`).fadeIn(500);
            $(`#progressbar${dataid}`).attr("aria-valuenow", 0);
            $(`#progressbar${dataid}`).css("width", 0);
            $(`#progressbar${dataid}`).html(0);        
            $(`#progressbar${dataid}`).toggleClass("bg-success");
            $(`#progressbar${dataid}`).toggleClass("progress-bar-animated");
            $(`#progressbar${dataid}`).toggleClass("progress-bar-striped");

            $("button[type=submit], input[type=submit]").prop("disabled", true);

            $.each(files, function(index, value) {
                
                setTimeout(() => {

                    $(`#spinner${dataid}`).fadeIn();

                    let percentage = Math.ceil(((index + 1) / files.length * 100));

                    let img = new Image();
                    let reader = new FileReader();

                    img.style.display = "none";
                    img.style.width = "200px";
                    img.classList.add("img-fluid");
                    img.classList.add("img-thumbnail");

                    img.onload = function() { $(this).fadeIn(2000)};

                    $(`#photos-preview${dataid}`).append(img);

                    reader.onload = function (e) {
                        img.src = e.target.result;
                    }

                    reader.readAsDataURL(value);

                    $(`#progressbar${dataid}`).attr("aria-valuenow", `${percentage}%`);
                    $(`#progressbar${dataid}`).css("width", `${percentage}%`);
                    $(`#progressbar${dataid}`).html(`${percentage}%`);

                    if(percentage === 100) {
                        $(`#progressbar${dataid}`).fadeOut(1000);
                        $(`#spinner${dataid}`).fadeOut(1000);
                        $(`#progressbar${dataid}`).toggleClass("bg-success");
                        $(`#progressbar${dataid}`).toggleClass("progress-bar-animated");
                        $(`#progressbar${dataid}`).toggleClass("progress-bar-striped");
                        $("button[type=submit], input[type=submit]").prop("disabled", false);
                    }

                }, 1000 + (index * 1000));
            });
        }
    });


    // Gestione alerts per il submit dei form
    $("#form-signin").submit(function(event) {

        $('#alert-signin-email').fadeOut(500);
        $('#alert-signin-pass').fadeOut(500);

        event.preventDefault(); 
        let form = $(this);

        $.ajax({
            type: $('input[name="_method"]').val(),
            url: form.attr('action'),
            data: form.serialize()
        }).done(function() {

            $('#alert-signin-success').fadeIn(1000).fadeOut(1000);
            setTimeout(() => { $('#signin-modal').modal('hide'); }, 2500);
            setTimeout(() => { window.location.reload(); }, 3000);

        }).fail(function(response) {

            if(response.responseJSON.message == "User not found")
                $('#alert-signin-email').fadeIn(1000);
            else if(response.responseJSON.message == "Password mismatch")
                $('#alert-signin-pass').fadeIn(1000);

        });
    });

    $("#repass").keyup(checkPasswordMatch);
    
});

$(window).on('load', function() {

    // Validazione custom di Bootstrap
    $(".needs-validation").each(function() {

        let form = $(this);

        $(this).submit(function(event) {

            $('#alert-form-error').fadeOut();
            event.preventDefault();

            if (form[0].checkValidity() === false)
            {
                event.stopPropagation();
                $('#alert-form-error').html("Sono presenti errori di validazione. Ricontrolla i dati inseriti.");
                $('#alert-form-error').fadeIn(1000);
            }
            else
            {
  
                if(form[0].enctype == "multipart/form-data") {

                    let formData = new FormData();
                    let json = form.serializeJSON(); // Serializzazione del form in formato JSON

                    Object.keys(json).forEach(function(key) {
                
                        let value = json[key];

                        // Ricostruzione degli oggetti del form secondo il loro tipo
                        if(typeof value === "string" || typeof value === "number" 
                           || typeof value === "boolean")
                            formData.append(key, value);
                        else if ($.isArray(value))
                            for(let val of value)
                            formData.append(`${key}`, val);
                        else 
                            formData.append(key, JSON.stringify(value));
                    });

                    // Ricostruzione degli input SOLO di tipo files (vanno gestiti separatamente)
                    let inputFiles = form.find("input[type=file]");

                    for(let inputFile of inputFiles) 
                        for(let file of inputFile.files)
                            formData.append(`${inputFile.getAttribute("id")}[]`, file, file.name);

                    $.ajax({
                        url: form.attr('action'),
                        type: form.find("input[name=_method]").val(),
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            $('#alert-form-success').fadeIn(2000).fadeOut(1000);
                            setTimeout(() => { window.location.replace("/"); }, 3000)
                        },
                        error: function(response) {
                            $('#alert-form-error').html(response.responseJSON.message ?
                                                        response.responseJSON.message :
                                                        response.responseText);
                            $('#alert-form-error').fadeIn(1000);
                        }
                    });
                }
                else {

                    $.ajax({
                        type: $('input[name="_method"]').val(),
                        url: form.attr('action'),
                        data: form.serialize(),
                        success: function() {
            
                            $('#alert-form-success').fadeIn(2000).fadeOut(1000);
                            setTimeout(() => { window.location.replace("/"); }, 3000);
                        },
                        error: function(response) {
            
                            $('#alert-form-error').html(response.responseJSON.message ?
                                                        response.responseJSON.message :
                                                        response.responseText);
                            $('#alert-form-error').fadeIn(1000);
                
                        }
                    });
                }
            }
        
            form[0].classList.add('was-validated');
        });
    });
});


// Focus automatico sulla modale del signin
$(document).on('shown.bs.modal', function() {

    $(this).find('[autofocus]').focus();
});

// Funzione di validazione aggiuntiva per il match delle password
function checkPasswordMatch() {

    if ($("#password").val() !== $("#repass").val())
        $("#repass")[0].setCustomValidity("Le password non coincidono.");
    else
        $("#repass")[0].setCustomValidity('');
}