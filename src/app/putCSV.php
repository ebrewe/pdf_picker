<?php

  $data = json_decode(file_get_contents("php://input"));
  $list= array();
  $list[0]=array();
  foreach($data[0] as $k=>$v){
    $list[0][] = $k;
  }
  foreach($data as $key=>$value){
    $c = sizeof($list);
    $list[$c] = array();
    foreach($value as $k=> $v){
      $list[$c][] = $v;
    }
    
  }
  
  $fp = fopen('data/included_pdfs.csv', 'w');

	foreach ($list as $fields) {
			fputcsv($fp, $fields);
	}
	
	fclose($fp);
  echo 'kewl';
?>