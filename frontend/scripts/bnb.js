$(document).ready(function () {
    // Gestione del click sugli anchor 
    $("a").click(function() {

        let url = $(this).attr("href");

        if(url === undefined || url === null || url.startsWith("#"))
            return;

        else if(url == "signin") {
            $("#dialog").dialog();
            return;
        }
    });

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
    $("#apartment-images-input").change(function () {

        if (this.files && this.files[0]) {
            let files = this.files;

            // Inizializzazione view per il caricamento
            $('#photos-preview').empty(); // Svuoto nel caso ci fossero immagini caricate in precedenza
            $('#apartment-spinner').fadeIn(500);
            $("#apartment-progressbar").attr("aria-valuenow", 0);
            $("#apartment-progressbar").css("width", 0);
            $("#apartment-progressbar").html(0);        
            $("#apartment-progressbar").toggleClass("bg-success");
            $("#apartment-progressbar").toggleClass("progress-bar-animated");
            $("#apartment-progressbar").toggleClass("progress-bar-striped");

            $.each(files, function(index, value) {
                
                setTimeout(() => {

                    let percentage = Math.ceil(((index + 1) / files.length * 100));

                    let img = new Image();
                    let reader = new FileReader();

                    img.style.display = "none";
                    img.style.width = "200px";
                    img.classList.add("img-fluid");
                    img.classList.add("img-thumbnail");

                    img.onload = function() { $(this).fadeIn(2000)};

                    $('#photos-preview').append(img);

                    reader.onload = function (e) {
                        img.src = e.target.result;
                    }

                    reader.readAsDataURL(value);

                    $("#apartment-progressbar").attr("aria-valuenow", `${percentage}%`);
                    $("#apartment-progressbar").css("width", `${percentage}%`);
                    $("#apartment-progressbar").html(`${percentage}%`);

                    if(percentage === 100) {
                        $('#apartment-spinner').fadeOut(1000);
                        $("#apartment-progressbar").toggleClass("bg-success");
                        $("#apartment-progressbar").toggleClass("progress-bar-animated");
                        $("#apartment-progressbar").toggleClass("progress-bar-striped");
                    }

                }, 1000 + (index * 1000));
            });
        }
    });


    // Gestione alerts per il submit dei form
    $("#form-signin").submit(function(event) {

        setTimeout(() => {
        $('#alert-signin-email').fadeOut(1000);
        $('#alert-signin-pass').fadeOut(1000);
        }, 2000);

        event.preventDefault(); 
        let form = $(this);

        $.ajax({
            type: $('input[name="_method"]').val(),
            url: form.attr('action'),
            data: form.serialize()
        }).done(function() {

            $('#alert-signin-success').fadeIn(2000).fadeOut(1000);
            setTimeout(() => { $('#signin-modal').modal('hide'); }, 3000);
            setTimeout(() => { window.location.replace(window.location.pathname); }, 4000);

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

            event.preventDefault();

            if (form[0].checkValidity() === false) 
                event.stopPropagation();
            else
            {
                $('#alert-form-error').fadeOut();
 
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
                            $('#alert-form-success').fadeIn(2000).fadeOut(1000);
                            setTimeout(() => { window.location.replace("/"); }, 3000)
                        },
                        error: function(response) {
                            $('#alert-form-error').html(response.responseJSON.message);
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
            
                            $('#alert-form-error').html(response.responseJSON.message);
                            $('#alert-form-error').fadeIn(1000);
                
                        }
                    });
                }
            }
        
            form[0].classList.add('was-validated');
        });
    });
});

/*
***
*** Gestione delle query per l'autocompletamento
***
*/

// Filtro con "Unique" e "startsWith" (RegExp) 
function uniqueFilterSearch(request, source) {
    let matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex(request.term), "i" );
    let results = source;
    results = _.uniq(results, function(item) { return item.value === undefined ? item : item.value});
    results = $.grep(results, function(item) { return matcher.test(item.label || item.value || item)});
    results.sort();
    return results.slice(0, 10);
}


$("#country").ready(function() {
    $.getJSON("../data/countries.json", function(data) {
        $("#country").autocomplete({
            source: function(request, response) {
                response(uniqueFilterSearch(request, data.map(x => x.name)))
            }
        });
    });
});

$("#province").ready(function() {
    $.getJSON("../data/comuni.json", function(data) {
        $("#province").autocomplete({
            source: function(request, response) {
                response(uniqueFilterSearch(request,data.map(x => {return { label: x.provincia.nome, value: x.sigla} })))
            }
        })
        
        if($("#province").autocomplete("instance") !== undefined) {
            $("#province").autocomplete("instance")._renderItem = function(ul, item) {
                return $("<li>").append(`<div>${item.label} (${item.value})</div>`)
                                .appendTo(ul);
            };
        }
    });
});

$("#town").ready(function() {
    $.getJSON("../data/comuni.json", function(data) {
        $("#town").autocomplete({
            source: function(request, response) {
                response(uniqueFilterSearch(request, data.map(x => x.nome)))
            }
        });
    });
});

/*
***
*** Fine gestione autocompletamento
***
*/


// Focus automatico sulla modale del signin
$(document).on('shown.bs.modal', function() {

    $(this).find('[autofocus]').focus();
});

// Funzione di validazione aggiuntiva per il match delle password
function checkPasswordMatch() {

    if ($("#password").val() != $("#repass").val())
        $("#repass")[0].setCustomValidity("Le password non coincidono.");
    else
        $("#repass")[0].setCustomValidity('');
}