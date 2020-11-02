<?php
    require_once '../../php/connect.php';

    $email = trim($_POST['email']);
    $name = trim($_POST['name']);

    if($email == '' OR $name == ''){
        echo 1;
        die;
}

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    die("Connection failed: ". $conn->connect_error);
}

$sql = "SELECT * FROM projects WHERE email = '".$email."' AND name = '".$name."'";
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