<?php
require_once './connect.php';
    $email = trim($_POST['email']);
    $pass = trim($_POST['password']);

    if($pass=='' OR $email == ''){
    echo 1;
    die;
}

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    die("Connection failed: ". $conn->connect_error);
}

$resul_1 = mysqli_query($conn,"SELECT * FROM `users` WHERE `email` = '".$email."'");
$resul_2 = mysqli_query($conn,"SELECT * FROM `users` WHERE `email` = '".$email."' && `password`= '".$pass."'");
$cont_1 = mysqli_num_rows($resul_1);
$cont_2 = mysqli_num_rows($resul_2);
if($cont_1 == 1 && $cont_2 ==1){
    echo 2;
}else if($cont_1 ==1 && $cont_2 == 0){
    echo 3;
}else{
    echo 4;
}
?>