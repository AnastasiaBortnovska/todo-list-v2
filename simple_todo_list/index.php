<?php

require_once('../php/connect.php');

    if(!isset($_COOKIE['email']) OR trim($_COOKIE['email']) == ''){
        header("Location:../index.html");
        exit;
    }

$conn = new mysqli($servername, $username, $password, $dbname);
$result = mysqli_query($conn, "SELECT * FROM `projects` WHERE `email` LIKE '".$_COOKIE['email']."' ");

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todolist Ruby Garage</title>
    <link rel="stylesheet" href="./css/style.css" />
</head>
<body>
  <div class="content">
  <header>
    <h2>SIMPLE TODO LISTS</h2>
    <h5>FROM RUBY GARAGE</h5>
  </header>
    <div class="conteiner">
    <?php
     while($project = mysqli_fetch_assoc($result)){
       ?>
      <div class="wrapper-todo-list">
        <span class="deadlineDate"> <?= $project['deadline'] ?> </span>
        <div class="header-todo-list" id='<?= $project['id']?>'>
          <img src="./img/calendar.png" class="calendar"/>
          <div class="title-todo-list"><?= $project['name'] ?></div>
          <div class="update-todo-list">
            <div class="edit"></div>
            <div class="delete"></div>
          </div>
        </div>
        <div class="fill-add-task">
          <div class="icon-plus"></div>
          <input type="text" placeholder="  Start typing here to create a task..." class="input-new-task"/>
          <button class="btn-add-new-task">Add Task</button>
      </div>
      <ul class="task-list">
    
      <?php
      $result2 = mysqli_query($conn, "SELECT * FROM `tasks` WHERE `project_id` LIKE '".$project['id']."' "); 
     while($tasks = mysqli_fetch_assoc($result2)){
    ?>

      <li class="row-task" id='<?=$tasks['id']?>'>
        <input type="checkbox" class="checkbox-task"  <?php if($tasks['status'] == 'done'){?> checked <?php }?>/>
     <div class="name-task <?php if($tasks['status'] == 'done'){?> cross-out <?php }?>"><?=$tasks['name'] ?></div>
        <div class="update-task">
        <?php if($tasks['status'] != 'done'){?>
            <div class="up-doun-task"></div>
            <div class="edit-task"></div>
          <?php }?>
          <div class="delete-task"></div>
        </div>
      </li>

    <?php
     }
     ?>

     </ul>
     </div>

     <?php
    }
     ?>

  </div> 
  
  <footer>
    <button class="btn-add-todo-list"><img src="./img/plus.png"/> <div>Add TODO List</div></button>
    <p> &copy; Ruby Garage</p>
</footer>
</div>

<script src="../js/ajax.js"></script>
<script type="module" src="./php/get_projects.js"></script>
<script type="module" src="./js/main.js"></script>

</body>

</html>