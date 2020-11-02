<?php
    require_once '../../php/connect.php';

    $project_id = trim($_POST['project_id']);
    $name = trim($_POST['name']);
    $status = trim($_POST['status']);
    
    if($project_id == '' OR $name == '' OR $status == ''){
        echo 2;
        die;
    }
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }
    
    $sql = "UPDATE tasks SET status = '".$status."' WHERE project_id = '".$project_id."' AND name = '".$name."' ";
    
    if ($conn->query($sql) === TRUE){
        echo 1;
    } else {
        echo "Error: " . $sql. "<br>". $conn->error;
    }
?>