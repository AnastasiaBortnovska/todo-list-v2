import {deleteProject, addNewProject, addNewTask, EditNameProject, crossOutItem, editNameTask, deleteTask, upTask, deadline} from '../js/main.js';
document.querySelector('.btn-add-todo-list').addEventListener('click', addNewProject);

export let userEmail = getCookie('email');
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

document.querySelectorAll('.calendar').forEach(e=>{e.addEventListener('click', deadline)});
document.querySelectorAll('.edit').forEach(e=>{e.addEventListener('click', EditNameProject)});
document.querySelectorAll('.delete').forEach(e=>{e.addEventListener('click', deleteProject)});
document.querySelectorAll('.btn-add-new-task').forEach(e=>{e.addEventListener('click', addNewTask)});
document.querySelectorAll('.checkbox-task').forEach(e=>{e.addEventListener('click', crossOutItem)});
document.querySelectorAll('.up-doun-task').forEach(e=>{e.addEventListener('click', upTask)});
document.querySelectorAll('.edit-task').forEach(e=>{e.addEventListener('click', editNameTask)});
document.querySelectorAll('.delete-task').forEach(e=>{e.addEventListener('click', deleteTask)});






 
