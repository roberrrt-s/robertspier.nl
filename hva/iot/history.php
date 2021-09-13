<?php  

$user = $_GET['user'];
$status = $_GET['status'];

$message = "User " .$user. " status is now " .$status. "!";

	$file = fopen("history.txt", "w") or die("can't open file");
	fwrite($file, $message);
	fclose($file);

?>

<html>
<head></head>
<body>
	<p> works </p>
	<?php echo '<p>something happened</p>' ?>
</body>
</html>
