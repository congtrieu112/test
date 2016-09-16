<?php for($s=0;$s<15;$s++){ 
 if($s==0){ 
print '<li role="presentation" class="active"><a href="#step '.$s.'" aria-controls="step'.$s.'" role="tab" data-toggle="tab"> '.$s.'</a></li>';
}else if($s > 0){ 
print '<li role="presentation"><a href="#step'.$s.'" aria-controls="step'.$s.'" role="tab" data-toggle="tab">'.$s.'</a></li>';
}else if($s>=9){
print '<li role="presentation" class="hide"><a href="#step'.$s.'" aria-controls="step'.$s.'" role="tab" data-toggle="tab">'.$s.'</a></li>';
}

}

?>