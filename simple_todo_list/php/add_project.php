<?php
    require_once '../../php/connect.php';

$name = trim($_POST['name']);
$email = trim($_POST['email']);


if($name == '' OR $email == ''){
    echo 2;
    die;
}

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    die("Connection failed: ". $conn->connect_error);
}
$sql = mysql_set_charset("utf8");
$sql = "INSERT INTO projects (name, email) VALUES ('".$name."', '".$email."')";

if ($conn->query($sql) === TRUE){
    echo 1;
} else {
    echo "Error: " . $sql. "<br>". $conn->error;
}
?>