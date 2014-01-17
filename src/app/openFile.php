<?php
  $dir = dirname(__FILE__);
  $url = $dir."/data/mnr_all-v3.xml";
  
  
	
$z = new XMLReader;
$z->open($url);

$doc = new DOMDocument;

// move to the first <product /> node
while ($z->read() && $z->name !== 'Doc');

$titles = array();

// now that we're at the right depth, hop to the next <product/> until the end of the tree
while ($z->name === 'Doc')
{
    // either one should work
    $node = new SimpleXMLElement($z->readOuterXML());
    $thisTitle = $node->Account;
    $match = false;
    for($i = 0, $j = $titles.length; $i < $j; $i++){
      if( $titles[$i] == $thisTitle){
        $match = true;
      }
    }
    if(!$match){
      $titles[] = $thisTitle;
    }
    //echo $z->readString();
    // now you can use $node without going insane about parsing

    // go to next <product />
    $z->next('Doc');
}

$uTitles = array_unique($titles);
foreach($uTitles as $k=>$v){
  echo $v."*";
}
?>