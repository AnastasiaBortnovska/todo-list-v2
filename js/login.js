document.querySelector('#sing-in').onclick = function(Event){
    Event.preventDefault();

    let pass = document.querySelector('.passwordd').value;
    let email = document.querySelector('.emaill').value;

    
    let data = {
        "password" : pass,
        "email" : email
    }
    
    ajax('POST', '../php/singup.php', login, data);
    
    function login(resul){
        if(resul == 1){
            alert('Fill in all the fields!');
        }else if(resul == 2){
            let d = new Date();
            d.setTime(d.getTime()+(10*60*1000));
            let expires = d.toUTCString();
               console.log(data.email);
            document.cookie = `email = ${data.email}; expires=${expires}; path=/`;
            location.href = "../simple_todo_list/index.php";
        }else if(resul ==3){
            alert('Incorrect password');
        }else{
            alert("This email isn't registered");
        }      
    }

}