<?php
    require_once '../../php/connect.php';
    
    $id = trim($_POST['task_id']);
    $new_name = trim($_POST['new_name']);

    if($id == '' OR $new_name ==''){
        echo 2;
        die;
    }
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if($conn->connect_error){
        die("Connection failed: ". $conn->connect_error);
    }   
    
    
    $sql = "UPDATE tasks SET name = '".$new_name."'  WHERE id = '".$id."' ";
    
    if ($conn->query($sql) === TRUE){
        echo 1;
    } else {
        echo "Error: " . $sql. "<br>". $conn->error;
    }

    
?>