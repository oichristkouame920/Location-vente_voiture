<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>page achat</title>
</head>
<body>
<?php
    if(isset($_POST["nom"]))
    {
      echo "M./Mme./Mlle." .$_POST["nom"]."<br>";
    }
    if(isset($_POST["Prenoms"]))
    {
      echo $_POST["Prenoms"]."<br>";
    }
    if(isset($_POST["email"]))
    {
      echo"Votre Email est: ".$_POST["email"]."<br>";
    }
    if(isset($_POST["Contacts"]))
    {
      echo"Votre contact est: ".$_POST["Contacts"]."<br>";
    }
    if(isset($_POST["Adresse"]))
    {
      echo"Votre adresse est".$_POST["Adresse"]."<br>";
    }
    if(isset($_POST["suv"]))
    {
      echo"vous voulez un".$_POST["SUV"]."<br>";
    }
    if(isset($_POST["berline"]))
    {
      echo"vous voulez une".$_POST["Berline"]."<br>";
    }
    if(isset($_POST["Citadine"]))
    {
      echo"vous voulez une".$_POST["Citadine"]."<br>";
    }
    if($_SERVER["REQUEST_METHOD"]=="POST")
    {
      if(isset($_POST['valider']))
      {
        $nom=htmlspecialchars($_POST['nom']);$message="<p style='color: green;'> Formulaire validé avec succes pour <strong>$nom</strong></p>";
      }
      elseif(isset($_POST['reinitialiser']))
      {
        $message="<p style='color: red;'> Formulaire reinitialisé avec succes pour <strong>$nom</strong></p>";
      }
    }
  ?>
</body>
</html>