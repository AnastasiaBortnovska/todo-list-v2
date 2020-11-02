<?php
    require_once '../../php/connect.php';

    $project_id = trim($_POST['project_id']);
    $text = trim($_POST['text']);
    
    if($project_id == '' OR $text ==''){
        echo 2;
        die;
    }
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }
    
    $sql = "UPDATE projects SET name = '".$text."'  WHERE id = '".$project_id."'";
    
    if ($conn->query($sql) === TRUE){
        echo 1;
    } else {
        echo "Error: " . $sql. "<br>". $conn->error;
    }
?>