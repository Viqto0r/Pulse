<?php
//use PHPMailer\PHPMailer\PHPMailer;
//use PHPMailer\PHPMailer\SMTP;
//use PHPMailer\PHPMailer\Exception;
//require 'phpmailer/PHPMailer.php';
//require 'phpmailer/SMTP.php';
//require 'phpmailer/Exception.php';




use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

//Load Composer's autoloader
//require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
//$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail = new PHPMailer(true);
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

try {
    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    //$mail->SMTPDebug = 2;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'viqto0r.dev.sender@gmail.com';                     //SMTP username
    $mail->Password   = 'znidteuwyxdwrssp';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
		$mail->CharSet = "utf-8";

    //Recipients
    $mail->setFrom('viqto0r.dev.sender@gmail.com', 'Pulse');
    $mail->addAddress('viqto0r@gmail.com');     //Add a recipient
    //$mail->addAddress('Pulse');               //Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'Имя: ' . $name . '<br>Телефон: ' . $phone . '<br>Почта: '. $email . '';
	//	$mail->Body    = '
	//	Пользователь оставил данные <br> 
	//Имя: ' . $name . ' <br>
	//Номер телефона: ' . $phone . '<br>
	//E-mail: ' . $email . '';
  //  $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}