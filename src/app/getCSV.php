<?php

  class CSVReader{
    private $url;
    private $csvdata;
    private $names = array();
    
    public function __construct(){
      $this->url = dirname(__FILE__)."/data/included_pdfs.csv";
    }
    
    function getFile(){
      if( file_exists($this->url)){
        $file = fopen($this->url, "r");
        
				while (($this->csvdata = fgetcsv($file, 12000, ",")) !== FALSE) {
						$this->names[] = $this->csvdata[0];
				}

        fclose($file); 
        return true;
      }else{
        return false;
      }
    }
    
    function getNames(){
      foreach( $this->names as $item){
        echo $item."*"; 
      }
    }
    
  }
  
  $cr = new CSVReader();
  $cr->getFile();
  $cr->getNames();
?>