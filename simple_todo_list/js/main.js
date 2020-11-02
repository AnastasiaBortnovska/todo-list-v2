import {userEmail} from "../php/get_projects.js";

export function addNewProject(){
   let nameProject = prompt('Введіть назву проєкту');
   if(nameProject == null ||nameProject ==''){
       return;
   }
   createNewProject(nameProject);
}

// create new Project

function createNewProject(nameProject){
    
    // to send a request to the database to create a new project
    let data = {
        "name" : nameProject,
        "email" : userEmail
    
    }
    
    ajax('POST', '../simple_todo_list/php/add_project.php', ifSuccessfullyProject, data);

    function ifSuccessfullyProject(resul){
        if (resul == 2){
            alert('Typing name project');
        }else if(resul == 1){

            ajax('POST', '../simple_todo_list/php/get_project_data.php', getIdProject, data);
            function getIdProject(result){
                result = JSON.parse(result);
                let idproj = result.id;
            
            let divWrapper = document.createElement('div');
            divWrapper.classList.add('wrapper-todo-list');
            
            let span = document.createElement('span');
            span.classList.add('deadlineDate');
            divWrapper.appendChild(span);
        
            let divHeader = createHeader(nameProject, idproj);
            let divFillAddTask = createFillAddTask();
            
        
            divWrapper.appendChild(divHeader);
            divWrapper.appendChild(divFillAddTask);
        
            document.querySelector('.conteiner').appendChild(divWrapper);
            }
        }
        else{
            alert('Error, try add new project later.');
        }
}
  
}

function createHeader(nameProject, idproj){
    let divHeader = document.createElement('div');
    divHeader.classList.add('header-todo-list');
    divHeader.id = idproj;
    
    let imgCalendar = document.createElement('img');
    imgCalendar.classList.add('calendar');
    imgCalendar.src = "./img/calendar.png";
    imgCalendar.addEventListener('click', deadline);
    
    let divTitle = document.createElement('div');
    divTitle.classList.add('title-todo-list');
    divTitle.innerHTML = nameProject;
    
    let divUpdateTodoList = document.createElement('div');
    divUpdateTodoList.classList.add('update-todo-list');
    
    let divEdit = document.createElement('div');
    divEdit.classList.add('edit');
    divEdit.addEventListener('click', EditNameProject);
    
    let divDelete = document.createElement('div');
    divDelete.classList.add('delete');
    divDelete.addEventListener('click', deleteProject);
    divUpdateTodoList.appendChild(divEdit);
    divUpdateTodoList.appendChild(divDelete);

    divHeader.appendChild(imgCalendar);
    divHeader.appendChild(divTitle);
    divHeader.appendChild(divUpdateTodoList);
    return divHeader;
}

function createFillAddTask(){
    let divFillAddTask = document.createElement('div');
    divFillAddTask.classList.add('fill-add-task');

    let divIconPlus = document.createElement('div');
    divIconPlus.classList.add('icon-plus');

    let inputTask = document.createElement('input');
    inputTask.classList.add('input-new-task');
    inputTask.placeholder = '  Start typing here to create a task...';

    let buttonAddNewTask = document.createElement('button');
    buttonAddNewTask.classList.add('btn-add-new-task');
    buttonAddNewTask.innerHTML = 'Add Task';
    buttonAddNewTask.addEventListener('click', addNewTask);

    divFillAddTask.appendChild(divIconPlus);
    divFillAddTask.appendChild(inputTask);
    divFillAddTask.appendChild(buttonAddNewTask);
    return divFillAddTask;
}

//--------------------------------------
// create new task

export function addNewTask(e){
    let nameTask= this.parentElement.children[1].value;
    if(nameTask == null ||nameTask ==''){
        return;
    }

// to send a request to the database to create a new task
    let id_project = this.closest('.wrapper-todo-list').querySelector('.header-todo-list').id;
   
        let data = {
            "name" : nameTask,
            "status" : "not_done",
            "project_id" : id_project

        }

        ajax('POST', '../simple_todo_list/php/add_task.php', ifSuccessfully, data);
    
        crealeNewTask(this, nameTask);
        e.target.parentElement.children[1].value = '';
}

function crealeNewTask(e, nameTask){
  
    let wrapper =  e.parentElement.closest('.wrapper-todo-list');
    let taskList = wrapper.children[3];
   
    if(!taskList){
        let ulTaskList = document.createElement('ul');
        ulTaskList.classList.add('task-list');

        let li = createLiElem(nameTask);
    
        ulTaskList.appendChild(li);

        wrapper.appendChild(ulTaskList);
    }else{
        
        let li = createLiElem(nameTask);
        taskList.appendChild(li);
    }

    function createLiElem(nameTask, id){
        let li = document.createElement('li');
        li.classList.add('row-task');
    
    
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.classList.add('checkbox-task');
        checkbox.addEventListener('click', crossOutItem);
    
        let divName = document.createElement('div');
        divName.classList.add('name-task');
        divName.innerHTML = nameTask;
    
        let divUpdateTask = createDivUpdateTask();
    
        li.appendChild(checkbox);
        li.appendChild(divName);
        li.appendChild(divUpdateTask);
    
        return li;
    }
}

function createDivUpdateTask(){
    let divUpdateTask = document.createElement('div');
    divUpdateTask.classList.add('update-task');

    let divUpDoun = document.createElement('div');
    divUpDoun.classList.add('up-doun-task');
    divUpDoun.addEventListener('click', upTask);

    let divEditTask = document.createElement('div');
    divEditTask.classList.add('edit-task');
    divEditTask.addEventListener('click', editNameTask);

    let divDeleteTask = document.createElement('div');
    divDeleteTask.classList.add('delete-task');
    divDeleteTask.addEventListener('click', deleteTask);

    divUpdateTask.appendChild(divUpDoun);
    divUpdateTask.appendChild(divEditTask);
    divUpdateTask.appendChild(divDeleteTask);

    return divUpdateTask;
}
//-----------------------------
// functions for operations on projects and tasks

export function EditNameProject(){

    let titleTodoList = this.closest('.header-todo-list').children[1];
    let text = titleTodoList.innerHTML;
    let input = document.createElement('input');
    input.classList.add('input-title-list');
    input.value = text;
    input.addEventListener('keypress', setNewItem);
    titleTodoList.innerHTML ='';
    titleTodoList.appendChild(input);
    let project_id = this.closest('.header-todo-list').id
    function setNewItem(e){
        if(e.keyCode == 13){
            let newTitleProject = e.target.value;
          e.target.parentElement.innerHTML = newTitleProject;
          e.target.style.display = 'none';
          // to send a request to the database for update name project
          ajax('POST', '../simple_todo_list/php/update_project.php', ifSuccessfully, {"project_id" : project_id, "text":newTitleProject});

        }
      }
  
  }

export function deleteProject(){
    this.closest('.wrapper-todo-list').remove();
    let id_project = this.closest('.header-todo-list').id;
    ajax('POST', '../simple_todo_list/php/delete_project.php', ifSuccessfully, {"project_id" : id_project});
    ajax('POST', '../simple_todo_list/php/delete_all_task.php', ifSuccessfully, {"project_id" : id_project});

}

export function deadline(){
    let dateline = this.closest('.wrapper-todo-list').querySelector('.deadlineDate');
    dateline.innerHTML = '';
    let calendar = document.createElement('input');
    calendar.type = "date";
    calendar.style.backgroundColor = "rgba(60, 102, 168, 0.8)";
    calendar.addEventListener("change", setDeadline);
    dateline.appendChild(calendar);

    let id_project = this.closest('.wrapper-todo-list').querySelector('.header-todo-list').id;

    function setDeadline(){
        let deadlineDate = this.value;
        ajax('POST', '../simple_todo_list/php/set_deadline.php', ifSuccessfully, {"id_project": id_project, "date":deadlineDate})
        dateline.innerHTML = deadlineDate;
        
    }
} 

export function crossOutItem(){
    let id_project = this.closest('.wrapper-todo-list').querySelector('.header-todo-list').id;
   
    let nameTask = this.parentElement.querySelector('.name-task');
    if(this.checked){
        ajax('POST', '../simple_todo_list/php/status_task.php', ifSuccessfully, {"project_id" : id_project, "name":nameTask.innerHTML, "status" : "done"});
    
        nameTask.classList.add('cross-out');
        this.parentElement.querySelector('.update-task').innerHTML ='';
        let divDeleteTask = document.createElement('div');
        divDeleteTask.classList.add('delete-task');
        divDeleteTask.addEventListener('click', deleteTask);
        this.parentElement.querySelector('.update-task').appendChild(divDeleteTask);
    }else{
        ajax('POST', '../simple_todo_list/php/status_task.php', ifSuccessfully, {"project_id" : id_project, "name":nameTask.innerHTML, "status" : "not_done"});
   
        nameTask.classList.remove('cross-out');
        this.parentElement.querySelector('.update-task').innerHTML ='';
        this.parentElement.querySelector('.update-task').appendChild(createDivUpdateTask());
    }

    
  }

export function editNameTask(){
   
    let id_project = this.closest('.wrapper-todo-list').querySelector('.header-todo-list').id;
    let nameTask = this.closest('.row-task').querySelector('.name-task');
    let text = nameTask.innerHTML;
    let input = document.createElement('input');
    input.value = text;
    input.addEventListener('keypress', setNewItem);
    nameTask.innerHTML ='';
    nameTask.appendChild(input);

    function setNewItem(e){
        if(e.keyCode == 13){
            let newTitleTask = e.target.value;
          e.target.parentElement.innerHTML = newTitleTask;
          e.target.style.display = 'none';
          ajax('POST', '../simple_todo_list/php/update_task.php', ifSuccessfully, {"project_id" : id_project, "nameTask": text, "newTitleTask": newTitleTask});

        }
      }
  
}

export function deleteTask(){
    let title_task = this.closest('.row-task').children[1].innerHTML;
    let id_project = this.closest('.wrapper-todo-list').querySelector('.header-todo-list').id;
    ajax('POST', '../simple_todo_list/php/delete_task.php', ifSuccessfully, {"project_id" : id_project, "name":title_task});


    let taskList = this.closest('.task-list');
    let lengthUl = taskList.children.length;
    this.closest('.row-task').remove();
    if(lengthUl == 1){
        taskList.remove();
    }
}

export function upTask(){
    let liRowTask = this.closest('.row-task');
    let ulTaskList = liRowTask.parentElement;
    let allTask = ulTaskList.querySelectorAll('.row-task');
    for(let i=0; i<allTask.length; i++){
        if(allTask[i] == liRowTask){
            if(i==0) return;
            let id_project = this.closest('.wrapper-todo-list').querySelector('.header-todo-list').id;
            let task_name_pre = allTask[i-1].querySelector('.name-task').innerHTML;
            let task_name_current = allTask[i].querySelector('.name-task').innerHTML;
         
            ajax('POST', '../simple_todo_list/php/get_task_data.php', getIdTaskPre, {"id_project": id_project, "name": task_name_pre});
            function getIdTaskPre(result){
                result = JSON.parse(result);
                let id_pre = result.id;
               
                ajax('POST', '../simple_todo_list/php/get_task_data.php', getIdTaskCur, {"id_project": id_project, "name": task_name_current});
               
                function getIdTaskCur(result){
                    result = JSON.parse(result);
                    let id_cur = result.id; 
                 
                    ajax('POST', '../simple_todo_list/php/prior_task.php', ifSuccessfully, {"task_id" : id_cur, "new_name": task_name_pre});
                    ajax('POST', '../simple_todo_list/php/prior_task.php', ifSuccessfully, {"task_id": id_pre, "new_name": task_name_current});
                }
                
        }
            
            allTask[i-1].before(allTask[i]);
        }

    }

    
}

function ifSuccessfully(resul){
    if (resul == 2){
        alert('Fill in all the fields');
    
    }else if(resul ==1){
        return
    }
    else{
        alert('Error, try it later.');
       
    }
}