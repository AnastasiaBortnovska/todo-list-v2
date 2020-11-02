<?php
    require_once '../../php/connect.php';

    $project_id = trim($_POST['project_id']);
    $name_task = trim($_POST['nameTask']);
    $new_name_task = trim($_POST['newTitleTask']);

    if($project_id == '' OR $name_task =='' OR $new_name_task == ''){
        echo 2;
        die;
    }
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }   
    
    
    $sql = "UPDATE tasks SET name = '".$new_name_task."'  WHERE project_id = '".$project_id."' AND name = '".$name_task."'";
    
    if ($conn->query($sql) === TRUE){
        echo 1;
    } else {
        echo "Error: " . $sql. "<br>". $conn->error;
    }

    
?>