<?php 
       if ($_SERVER['REQUEST_METHOD'] === 'POST') {
         // Waarde wegschrijven naar bestand
         $data = $_POST["light"];
         // Push data to text file
         file_put_contents("output.txt", $data . "\n", FILE_APPEND);
       } else  {
           // Open the file
           $fp = @fopen("output.txt", "r");
           // Add each line to an array
           if ($fp) {
              $array = explode("\n", fread($fp, filesize("output.txt")));
           }
           foreach ($array as $value) {
               ?> <p class="bar"> <?php echo $value; ?></p> <?php
           };
       }
   ?>