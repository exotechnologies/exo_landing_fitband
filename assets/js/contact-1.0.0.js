$(function () {
    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator
    // $('#contact-form').validator();
    // when the form is submitted
    $('#contact-form').on('submit', function (e) {
        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var ticket = {
                title: "",
                name: $('#form_name').val(),
                lastName: $('#form_lastname').val(),
                email: $('#form_email').val(),
                phone: $('#form_phone').val(),
                message: $('#form_message').val()
            }
            ticket.title = document.title + " | " + ticket.lastName.toUpperCase() + ", " + ticket.name.charAt(0).toUpperCase() + ticket.name.substr(1).toLowerCase();
            ticket.message = ticket.message.replace(/\n/g, " ");      
            var contactData = {
                Ticket: {
                    Title: ticket.title,
                    Type: "Unclassified",
                    Queue: "Sarmiento",
                    State: "open",
                    Priority: "3 normal",
                    CustomerUser: ticket.email
                    },
                Article: {
                    Subject: ticket.title,
                    Body: JSON.stringify(ticket, null, 4),
                    ContentType: "text/plain; charset=utf8"
                    },
                DynamicFields: {
                    UbicacionesSalud: ""
                    }
                }
            $.ajax({
                async: true,
                crossDomain: true,
                url: 'http://dev-marting-3/otrs/nph-genericinterface.pl/Webservice/GenericTicketConnectorRESTv1/Ticket?UserLogin=newTicket&Password=5r9odDR1avRt',
                type: 'POST',
                ContentType: "application/json",
                dataType: "json",
                processData: false,
                data: JSON.stringify(contactData),
                success: function (data){
                    $("#modal-greetings").modal('show');
                    $('#contact-form')[0].reset();
                },
                error: function(data){
                    $("#modal-greetings-title").text("Oops");
                    $("#modal-greetings-body-msg").text("Encontramos un problema! Por favor vuelva a intentar mas tarde. Gracias :)")
                    $("#modal-greetings").modal('show');
                }
            });
            return false;
        }
    })
});