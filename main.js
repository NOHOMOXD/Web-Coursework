/*$(document).ready(function(){
    /*$("#cotalog").on("click",function(){
        $(".submenu").slideToggle("slow");
    });*/
  /*  var log_sign_width=window.innerWidth,log_sign_height=window.innerHeight;
    $(".login_signin").css({"left":(window.innerWidth/2.5),"top":(window.innerHeight/12)});
    $("#login").click(function(){
        $("#signin_div").slideUp("middle");
        $("#login_div").slideToggle("slow");
        $("#login_div").css({"opacity": "1"});
        $(".modal_lgn_sgn").css({"display":"block"});
    });
    $("#signin").click(function(){
        $(".modal_lgn_sgn").css({"display":"block"});
        $("#login_div").slideUp("middle");
        $("#signin_div").slideToggle("slow");
        $("#signin_div").css({"opacity": "1"});
    });
    $(".btn_close").click(function(){
        $(".modal_lgn_sgn").css({"display":"none"});
        $("#signin_div").slideUp("middle");
        $("#login_div").slideUp("middle"); 
        
    });
    $(".modal_lgn_sgn").click(function(){
        $("#signin_div").slideUp("middle");
        $("#login_div").slideUp("middle");
        $(".modal_lgn_sgn").css({"display":"none"});
    })
});*/
//Фунция удаления дочерних элементов из списка
function removeChildren(elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }
var ul = document.getElementsByClassName("registration")[0];
//Функция появления модального окна входа при нажатии кнопки вход
    document.getElementById("login").addEventListener("click",function(){
        document.getElementById("login_div").style ="display:block;";
        document.getElementsByClassName("modal_lgn_sgn")[0].style = "display:block";
        document.body.style.overflow = 'hidden';
  });
//Функция появления модального окна регистрации при нажатии кнопки регистрация
    document.getElementById("signin").addEventListener("click",function(){
        document.getElementById("signin_div").style ="display:block;";
        document.getElementsByClassName("modal_lgn_sgn")[0].style = "display:block";
        document.body.style.overflow = 'hidden';
    });
//Функция закрытия модального окна при нажати крестик или на серый фон
    document.getElementsByClassName("btn_close")[0].addEventListener("click",close);
    document.getElementsByClassName("btn_close")[1].addEventListener("click",close);
    document.getElementsByClassName("modal_lgn_sgn")[0].addEventListener("click",close);
    function close(){
        document.getElementById("login_div").style ="display:none;";
        document.getElementById("signin_div").style ="display:none";
        document.getElementsByClassName("modal_lgn_sgn")[0].style = "display:none";
        document.body.style.overflow = '';
    }
//Вывод колличества товаров в корзине
    var busk = document.getElementById("busket")
    if (localStorage.getItem('amount_Busket')!=null){
    busk.innerHTML = localStorage.getItem('amount_Busket');
    }
//Счетчик посещений сайта 
window.onload = function(){
    if(localStorage.getItem('visiting')!=null){
        count=parseInt(localStorage.getItem('visiting'));
        count+=1;
        localStorage.setItem('visiting', count);
    }else{
        localStorage.setItem('visiting', 1);
    }
    document.getElementById("ID_Count").innerHTML=localStorage.getItem('visiting'); 
    email1();
}
//Проверка почты
function EmailCheck(some){
    
    if (some.value.includes('@') && some.value.includes('.') && some.value.length>3) {
        some.style = "border:2px solid lightgreen;";
    }else {
        some.style = "border:2px solid red";
        if (some.value===""){
            some.style="";
        }
    }
}
//функия ajax отправки запросов
function http(method,url,params) { 
    return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open(method,url,true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status >= 200 && this.status < 300){
          resolve(xhr.responseText);
        }else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function(){
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
        throw new Error(reject);
      };
    xhr.send(params);
    });
 }
//Аутентификация
document.getElementById("login_div").addEventListener("submit",login);
function login(e){
    e.preventDefault();
    var email = document.getElementById("Email_login").value,password = document.getElementById("Pass_login").value;
    let params = "email="+email+"&password="+password;
    let method='POST',url=document.getElementById("login_div").action;
   http(method,url,params).then(function(data){
       if (data.includes("true")){
        localStorage.setItem("login",email);   
        alert(`Добро пожаловать снова: ${data.split(" ")[1]} ${data.split(" ")[2]}`);
        window.location.reload();
        //email1();  
        //close();
    }else{
        throw new Error("Неправильно введен email или пароль");
    }
   })
   .catch(function(err){
       if (err.status!=undefined){
    alert(`Ошибка ${err.status} : ${err.statusText}`);
       }else alert(err);
  });
};

//удаление кнопок входа выхода и отрисовка логина
function email1(){
if (localStorage.getItem("login")!=null){
    removeChildren(ul);
let li = "";
li +=`<li><img align='middle' id='log_img' width='30vh'></li><li id='log_user'>
&nbsp${localStorage.getItem("login")}</li>
<li id='logout' title='Выйти' style='margin-left:1.5vw;cursor: pointer;'>
<img src='exit_f9.svg' width='30vh'>
</li>`;
let img = new Image();
img.addEventListener('error', function(){
     document.getElementById("log_img").src="../account_box_white.svg";
});
img.addEventListener('load', function(){
    document.getElementById("log_img").src="account_box_white.svg";
});
ul.title="Пользователь";
ul.innerHTML = li;
var log_user = document.getElementById('log_user');
//create_user_sub(log_user);
//log_user.addEventListener("click",show_user);
img.src='account_box_white.svg';
ul.classList.remove('registration');
ul.classList.add("user");
document.getElementById('logout').addEventListener("click",logout);
}
}
/*
function create_user_sub(user_login_li) {
   var div = document.createElement('div');
   div.classList.add("user_sub");
   div.classList.add("display_false");
   div.innerHTML=`<ul><li> Мой аккаунт </li><li> Выход<img src='exit.svg' width='30vh'></li></ul>`;
   ul.appendChild(div);
}
function show_user() {
    var sub_user = document.querySelectorAll(".user_sub")[0];
    console.log(sub_user.classList);
    sub_user.classList.toggle("display_false");
}
.then((result) => {
    alert(`Fulfilled: ${result}`)
}).catch((err) => {
    alert(`Rejected: ${err}`)
})
*/
//Выход
function logout(){
    localStorage.removeItem('login');
    window.location.reload();
}
document.getElementById("signin_div").addEventListener("submit",sign_up);
document.getElementsByName("Password_signin")[1].addEventListener("keyup",check);
//Функция регистрации
function sign_up(e){
    e.preventDefault();
    let password = document.getElementById("Password_signin");
    let inputText = document.querySelectorAll('form#signin_div input[type="text"]');
    let name=inputText[0].value,lastname=inputText[1].value,phonenumber=inputText[2].value,adres=inputText[3].value,email =inputText[4];  
    if (name=="" || lastname=="" || phonenumber=="" || adres=="" || email=="" || password=="" ){
        alert('Все поля должы быть заполнены')}
        else{
    emailExist(email).then(function(d){
        if (d=true)
        if (password.style.border.valueOf().includes("lightgreen") && email.style.border.valueOf().includes("lightgreen")) {
            let params = `name=${name}&lastname=${lastname}&phonenumber=${phonenumber}&adres=${adres}&email=${email.value}&password=${password.value}`,
            method='POST',url=document.getElementById("signin_div").action;
                    http(method,url,params).then(function(data){
                        console.log(data);
                        if (data.includes("true")){
                        alert(`Добро пожаловать ${name} ${lastname}.\nВы успешно зарегестрировались!`);
                        localStorage.setItem("login",email.value);  
                        //email1();  
                        //close();
                        window.location.reload();
                        }else { }
                    })
                    .catch(function(err){
                        if (err.status!=undefined){
                     alert(`Ошибка ${err.status} : ${err.statusText}`);
                        }else alert(err);
                   });
                }
    })
}
}
//Проверка на то что данный пользователь уже существует
function emailExist(check){
    return new Promise(function(resolve, reject){
    let method='GET',url=`./auth/signup.php?email=${check.value}`;
    http(method,url,params='').then(function(data){
        if (data.includes("false")){
            //check.style='border:2px solid lightgreen;';
            resolve(true);
        }else{
            throw new Error(data);
        }
    }).catch(function(err){
        check.style='border:2px solid red;';
        alert(err);
      });
    });
}
//Проверка правильного ввода пароля
function check(some) {
    let mas = document.getElementsByName("Password_signin");
    let pswd1=mas[0],pswd2=mas[1];
    if (pswd2.value==pswd1.value) {
        mas.forEach(element => {
            element.style='border:2px solid lightgreen;'
        });
    }else{
        mas.forEach(element => {
        element.style='border:2px solid red;'
        });
        if (pswd2.value===""){
            mas.forEach(element => {
                element.style=''
                });
        }
    }
}
