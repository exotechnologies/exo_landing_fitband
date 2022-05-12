jQuery(document).ready(function(){
    var $form = $('#contact-form');
    $form.validate({
        onfocusout: false,
        onkeyup: false,
        focusInvalid: false,
        focusCleanup: true,
        rules: {
            exoNombre: {
                required : true
            },
            exoEmail: {
                email: true,
                required: true
            },
            exoTel:{
                required: true
            },
            exoMensaje:{
                required: true
            }
        },
        messages: {
            exoNombre: {
                required : "Este campo no puede estar vacío."
            },
            exoEmail: {
                email: "Ingrese una dirección de eamil valida.",
                required : "Este campo no puede estar vacío."
            },
            exoTel: {
                required : "Este campo no puede estar vacío."
            },
            exoMensaje: {
                required : "Este campo no puede estar vacío."
            }
        }
    });

    $("#spinner" ).hide();
    $(document ).ajaxStart(function() {
        $( "#spinner" ).show();
        $('.message-wrapper .message').html('');
    });

    $(document).ajaxComplete(function() {
        $( "#spinner" ).hide();
    });
    $('input.exo-submit').click(function(e){
        e.preventDefault();
        var data = {
            nombre: $('#exo-nombre').val(),
            email: $('#exo-email').val(),
            tel: $('#exo-tel').val(),
            mensaje: $('#exo-mensaje').val()
        };

        console.log(data);
       if($form.valid() && grecaptcha.getResponse() != "" && typeof (grecaptcha.getResponse()) != 'undefined'){
         $('.captcha-error ').html('');
           $.ajax({
               url: '../controllers/mailController.php',
               type: 'POST',
               dataType: "json",
               data: {myData:data},
               success: function(res){
                   console.log('success');
                   $('.message-wrapper .message').addClass('success');
                   $('.message-wrapper .message').append('<span>Hemos recibido su consulta</span>')
               },
               error: function(error, res){
                   console.log('error');
                   $('.message-wrapper .message').addClass('error');
                   $('.message-wrapper .message').append('<span>Ocurrión un error al enviar la consulta.</span>')
               }
           })
       }else{
         $('.captcha-error ').append('<span>Captcha inválido</span>');
       }
    });

});
