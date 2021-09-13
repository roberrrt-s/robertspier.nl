<style type="text/css">
body {
	font-family: Verdana, Geneva, sans-serif;
	text-decoration: none;
}
#wrapper {
	width: 800px;
	margin-top: 30px;
	margin-right: auto;
	margin-bottom: auto;
	margin-left: auto;
}
</style>

<head>
<title>Directory dump // robertspier.nl</title>
</head>
<body><div id="wrapper">
<center>

<?php
// open this directory
$myDirectory = opendir(".");

// get each entry
while($entryName = readdir($myDirectory)) {
	$dirArray[] = $entryName;
}

// close directory
closedir($myDirectory);

//	count elements in array
$indexCount	= count($dirArray);
Print ("$indexCount files<br>\n");

// sort 'em
sort($dirArray);

// print 'em
print("<TABLE border=1 cellpadding=5 cellspacing=0 class=whitelinks>\n");
print("<TR><TH>Filename</TH><th>Filetype</th><th>Filesize</th></TR>\n");
// loop through the array of files and print them all
for($index=0; $index < $indexCount; $index++) {
        if (substr("$dirArray[$index]", 0, 1) != "."){ // don't list hidden files
		print("<TR><TD><a href=\"$dirArray[$index]\">$dirArray[$index]</a></td>");
		print("<td>");
		print(filetype($dirArray[$index]));
		print("</td>");
		print("<td>");
		print(filesize($dirArray[$index]));
		print("</td>");
		print("</TR>\n");
	}
}
print("</TABLE>\n");
?></center>
</div></body>