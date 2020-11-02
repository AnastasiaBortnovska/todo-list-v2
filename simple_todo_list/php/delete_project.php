<?php
    require_once '../../php/connect.php';

    $project_id = trim($_POST['project_id']);
    
    if($project_id == ''){
        echo 2;
        die;
    }
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }
    
    $sql = "DELETE FROM projects WHERE id = '".$project_id."'";
    
    if ($conn->query($sql) === TRUE){
        echo 1;
    } else {
        echo "Error: " . $sql. "<br>". $conn->error;
    }
?>