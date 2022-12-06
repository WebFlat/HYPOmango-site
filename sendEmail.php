<?php

    //Mail
    $message = '';
    $message .= '<h1>Hypotéku HYPOmango!</h1>';
    $message .= '<p>Aku výšku hypotéky potrebujete: '.$_POST['value_1'].'</p>';
    $message .= '<p>Aka je hodnota nehnuteľnosti: '.$_POST['value_2'].'</p>';
    $message .= '<p>Typ nehnutelnosti: '.$_POST['value_3'].'</p>';
    $message .= '<p>Kolko rokov chcete splácať: '.$_POST['value_4'].'</p>';
    $message .= '<p>Príjem: '.$_POST['value_5'].'</p>';
    $message .= '<p>Kolko % z hodnoty požadujete: '.$_POST['value_6'].'</p>';
    $message .= '<p>Email: '.$_POST['value_7'].'</p>';
    $message .= '<p>Meno a priezvisko: '.$_POST['value_8'].'</p>';
    $message .= '<p>Telefon: '.$_POST['value_9'].'</p>';
    $message .= '<p>PSČ: '.$_POST['value_10'].'</p>';

    

    $subject = 'HYPOmango hypotéku';
    $to = 'uzana.drobnakova11@gmail.com'.','; // Recipient
    $to .= 'vavrikr@gmail.com'; // Dubble
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