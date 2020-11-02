<?php
    require_once '../../php/connect.php';

    $name = trim($_POST['name']);
    $project_id = trim($_POST['id_project']);

    if($project_id == '' OR $name == ''){
        echo 1;
        die;
}

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    die("Connection failed: ". $conn->connect_error);
}

$sql = "SELECT * FROM tasks WHERE project_id = '".$project_id."' AND name = '".$name."'";
$resul = $conn->query($sql);

if($resul->num_rows > 0){
while($row = $resul->fetch_assoc()){
    echo json_encode($row);
}

    
}else{
    echo 0;
}
$conn->close();

?>