<?php
$path = "uploads/";

$valid_formats = array("jpg", "png", "gif", "bmp","jpeg");

if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST")
{
	$name = $_FILES['oi_image']['name'];
	$size = $_FILES['oi_image']['size'];
	if(strlen($name))
	{
		list($txt, $ext) = explode(".", $name);
		if(in_array($ext,$valid_formats))
		{
			if($size<(1024*1024)) // Image size max 1 MB
			{
				$actual_image_name = time().".".$ext;
				$tmp = $_FILES['oi_image']['tmp_name'];
				if(move_uploaded_file($tmp, $path.$actual_image_name))
				{
					echo "<img src='uploads/".$actual_image_name."' class='oi_image_p preview img-responsive col-md-12'>";
				}
				else
					echo "Upload Error. Try to put a chmod of at least 755 on the uploads directory.";
			}
			else
			{
				echo "Image file size max 1 MB.";
			}
		}
		else 
		{ 
			echo "Invalid file format..";
		}
	}
	else
	{
		echo "Please select image..!";
	}
}
?>