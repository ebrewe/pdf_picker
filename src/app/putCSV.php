<?php

  $data = json_decode(file_get_contents("php://input"));
  /*$titles = '';
  $string="";
  foreach($data[0] as $k=> $v){
    $titles .= $k . ",";
  }
  $titles = rtrim($titles) . "\n";
  foreach($data as $key=>$item){
  
    $str = "";
    foreach($item as $k=>$v){
      $str .= $v . ",";
    }
    $string .= rtrim($str) . "\n";
  }
  
  echo $titles;
  echo $string;*/
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