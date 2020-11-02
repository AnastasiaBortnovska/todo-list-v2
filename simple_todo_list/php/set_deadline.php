<?php
    require_once '../../php/connect.php';


$date = trim($_POST['date']);
$id_project = trim($_POST['id_project']);


if($id_project == '' OR $date == ''){
    echo 2;
    die;
}

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    die("Connection failed: ". $conn->connect_error);
}
$sql = mysql_set_charset("utf8");
$sql = "UPDATE projects SET deadline = '".$date."'  WHERE id = '".$id_project."' ";

if ($conn->query($sql) === TRUE){
    echo 1;
} else {
    echo "Error: " . $sql. "<br>". $conn->error;
}
?>