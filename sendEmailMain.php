<?php

    //Mail
    $message = '';
    $message .= '<h1>Kontaktný formulár HYPOmango!</h1>';
    $message .= '<p>Meno a priezvisko: '.$_POST['value_1'].'</p>';
    $message .= '<p>Telefon: '.$_POST['value_2'].'</p>';
    $message .= '<p>Email: '.$_POST['value_3'].'</p>';
    $message .= '<p>Správa: '.$_POST['value_4'].'</p>';

    

    $subject = 'HYPOmango kontaktný formulár';
    $to = 'uzana.drobnakova11@gmail.com'.','; // Recipient
    $to .= 'hypomango@gmail.com'; // Dubble
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

    $retval = mail($to, $subject, $message, $headers);

    header('Content-type: application/json');
    if ($retval) {
        echo json_encode(['message' => 'ok']);
    } else {
        echo json_encode(['message' => 'error']);
    }
?>