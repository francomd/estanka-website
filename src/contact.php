<?php

/**
 * PHP MAILER
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/PHPMailer/Exception.php';
require 'vendor/PHPMailer/PHPMailer.php';
require 'vendor/PHPMailer/SMTP.php';

$mail = new PHPMailer;

$firstName = $_POST['first_name'];
$lastName = $_POST['last_name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$city = $_POST['city'];
$message = $_POST['message'];

if (isset($firstName, $email)) {
    // build message body
    $body = '
    <html>
    <body>
    <div style="
        background-color: #fafafa;
        padding: 4rem;max-width: 640px;
        border-bottom: 4px solid #000a5f;
        margin: 0 auto;
    ">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACl0lEQVR4Ae3Bz2sTaRzA4c98O5k22rdujbqw0EpbsZnA1l+I6IIdLz0KgkeFPezJg4ftYUX/BBfB6x67ue7J67JMwEiDAQVpDG7ioblUcUp1Op0wqVMNeChFNImN9IV5HhKJRCKR2DWGDKCyFxErzXdispsM02L6zn/EmxFBvYRfcfGrBYLaInHUpA9M+kGsNMp2ULZDWxyFBPUSfsXFrxYIaiXiKGQXmHTJEJGtOI7phlhplO2gbIe2OAoJ6iX8iotfLRDUSsRRSA9MupT79Y/7IxPZ06uVsustld21F08fbTbDgG6IlUbZDsp2aIujkKBewq+4+NUCQW2ROGrSAZMuSSo1ODp98sLo9MkLU1d+ux1vtqIn9+avvioXHtArsdIo20HZDm1brSbrtUX8iotfLRDUSsRRyGeYfCMxU5aZHh7hi7a2wDDolJEaQtkOynZoi6OQoF6isXCTjeVnbGOyw8j48Zns9d/vepXH7upS2X37slKON1stevV+Y42lWzOo7Cwq56Bsh8Efp+iGWGmU7WBljrKx/IxtTHaQVMo6dOL83KET5+f46H1zY33533/+er7w5zy9irwGXjGPV8zTZmXGUNlZVM5B2bMMHpkCw6AHJl8xMLRvWI0f+5ndFHkNvGIer5inzcqMobKzqJyDsh0Gj0yCYdABk70g8hp4xTxeMU+blRlj8kae4exFvkLYiyKvQWtthQ4ImhM0J2hO0JygOUFzguYEzQmaEzQnaE7QnKA5QXMm/SbWPiZv/E239h87RwdM+s0wLQ7+co0+ETQnaE7QnMEOqeGR0Uzu7CW2id6tvl6tPnnIRwcm7FPpwz9NsM3bl0uPwzcrDQwZ4IczlwGDflj//xGttRUSiUQikfjkA9sn4v+bDEIpAAAAAElFTkSuQmCC" style="
        padding-right: 1rem;
    ">


    <br><hr style="opacity: 0.3;"><br>

    <span style="font-size:16px;">'.$firstName.' realizó una consulta en el formulario de contacto</span><br><br>

    <span style="font-size: 20px;opacity:0.6;">Mensaje:<br>'.$message.'</span><br><br>

    <span style="font-size: 16px;">
    <strong>Datos de contacto:</strong><br>
    Nombre: '.$firstName.' '.$lastName.'<br>
    Email: '.$email.'<br>
    Teléfono: '.$phone.'<br>
    Ciudad: '.$city.'<br>
    </span>

    <br><hr style="opacity: 0.3;"><br>

    <small style="opacity:0.6;">Enviado desde formulario de contacto de https://estanka.com.ar</small>
    </div>
    </body>
    </html>
    ';

    // configuration

    $mail->isSMTP();
    $mail->SMTPDebug = 2;
    $mail->Host = 'c1481474.ferozo.com';
    $mail->Port = 465;
    $mail->SMTPSecure = 'ssl';
    $mail->SMTPAuth = true;
    $mail->CharSet = 'utf-8';
    $mail->Username = "website@estanka.com.ar";
    $mail->Password = "@yyhMfV5nG";

    $mail->addReplyTo($email, $firstName.' '.$lastName);
    $mail->setFrom('website@estanka.com.ar', 'Sitio Web');
    $mail->addAddress('consultas@estanka.com.ar', 'Consultas');
    $mail->Subject = 'Consulta de '.$firstName;
    $mail->MsgHTML($body);

    // Send mail and detect error
    // This isn't showed because validate.js prevent default event
    // Instead it show a .alert-success message

    if (!$mail->send()) {
        echo "Error al enviar: " . $mail->ErrorInfo;
    } else {
        echo "Mensaje enviado";
    }
}
