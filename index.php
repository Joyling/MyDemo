<?php
if($_POST){
	$ext = pathinfo($_FILES['photo']['name'],PATHINFO_EXTENSION);
	if(in_array($ext,['png','jpg','gif'])){
		echo "类型检测成功";
		move_uploaded_file($_FILES['photo']['tmp_name'], './'.$_FILES['photo']['name'])

	}
}
?>



<form method="post" enctype='multipart/form-data'>
	
<input type="txt" name="title" value="this is a title &#"/>
<input type="file" name="photo">
<input type="submit" value="提交"/>

</form>