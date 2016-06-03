<?php

if (isset($_POST['name'], $_POST['email'], $_POST['phone'])) {

    $send_data = array();

  $send_data['data']['manager_id'] = 0;
  $send_data['data']['category_id'] = $_POST['idexport'];
  $send_data['data']['time'] = date("Y-m-d H:i:s");

  $send_data['name'] = $_POST['name'];
  $send_data['email'] = $_POST['email'];
  $send_data['phone'] = $_POST['phone'];
  $send_data['roistat_id'] = $_COOKIE['roistat_visit'];

 if( $curl = curl_init() ) {
    curl_setopt($curl, CURLOPT_URL, 'http://crm.geniusm.me/api/deals/add_deal');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($send_data));
    $out = curl_exec($curl);
    echo $out;
    curl_close($curl);
  }
require_once('KISSmetrics/Client.php');
require_once('KISSmetrics/Transport/Transport.php');
require_once('KISSmetrics/Transport/Sockets.php');

 $km = new KISSmetrics\Client('5e751c2912529ae67fe2762634d6973b1644b18a', KISSmetrics\Transport\Sockets::initDefault()); // Initialize

  $km->identify($_POST['email']);
  if (isset($_COOKIE['km_ai'])) {
      $km->alias($_COOKIE['km_ai']);
  }
  $km->record('Sub GMme GMSummit United');
  $km->submit();
  echo '1';
}


?>