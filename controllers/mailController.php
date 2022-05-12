<?php
include '../Mandrill.php';

$user = isset($_POST['myData']) ? $_POST['myData'] : false;
if(!$user){
    echo json_encode(array('user' => 'false'));
    return false;
}

$template = file_get_contents('../templates/contact-email.html');

$name        = ucfirst(trim($user['nombre']));
$email       = trim($user['email']);
$tel         = trim($user['tel']);
$message     = trim($user['mensaje']);

$content = $template;
$content = str_replace("{{nombre}}", $name, $content);
$content = str_replace("{{email}}", $email, $content);
$content = str_replace("{{tel}}", $tel, $content);
$content = str_replace("{{mensaje}}", $message, $content);


Try {
    $mandrill = new Mandrill('RaPl-2sKZPiJRG2bBAnq8A');
    $message = array(
        'html' => $content,

        'subject' => 'Consulta Enviada Desde La Web de Fitband',
        'from_email' => 'hola@exo.com.ar',
        'from_name' => 'Fitband',
        'to' => array(
            array(
                'email' => 'hola@exo.com.ar',
                'name' => $name,
                'type' => 'to'
            )
        ),
        'headers' => array('Reply-To' => $email),
        'important' => false,
        'track_opens' => null,
        'track_clicks' => null,
        'auto_text' => null,
        'auto_html' => null,
        'inline_css' => null,
        'url_strip_qs' => null,
        'preserve_recipients' => null,
        'view_content_link' => null,
        //'bcc_address' => 'mayoresconectados@exo.com.ar',
        'tracking_domain' => null,
        'signing_domain' => null,
        'return_path_domain' => null,
        'merge' => true,
        'merge_language' => 'mailchimp',
        'metadata' => array('website' => 'smartphone.exo.com.ar')
    );

    $async = false;
    $ip_pool = 'Main Pool';
    $send_at = '';
    $result = $mandrill->messages->send($message, $async, $ip_pool, $send_at);
    echo json_encode($result);
    //print_r($result);
    /*
    Array
    (
        [0] => Array
            (
                [email] => recipient.email@example.com
                [status] => sent
                [reject_reason] => hard-bounce
                [_id] => abc123abc123abc123abc123abc123
            )

    )
    */
} catch(Mandrill_Error $e) {
    // Mandrill errors are thrown as exceptions
    error_log('Couldnt Send mail: ');
    error_log(print_r($e, true));
    error_log($e->getMessage());
    echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
    // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    throw $e;
}
