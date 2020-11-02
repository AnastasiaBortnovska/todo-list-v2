<?php
    require_once '../../php/connect.php';

$name = trim($_POST['name']);
$status = trim($_POST['status']);
$project_id = trim($_POST['project_id']);

if($name == '' OR $status == '' OR $project_id == ''){
    echo 2;
    die;
}

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    die("Connection failed: ". $conn->connect_error);
}

$sql = "INSERT INTO tasks (name, status, project_id) VALUES ('".$name."', '".$status."', '".$project_id."')";

if ($conn->query($sql) === TRUE){
    echo 1;
} else {
    echo "Error: " . $sql. "<br>". $conn->error;
}
?>