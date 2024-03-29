window.addEventListener("load",loadJSON);
//Функция загрузки отзывов из JSON
function loadJSON(){
    check_log(localStorage.getItem('login'));
    fetch('./feedback/feedback.json').then( (resp) => {
        if (resp.status=='404' && resp.ok==false) {
            throw new Error(resp.status);
        }else return resp.json();
    })
    .then((feed) => {
        let li='';
        let nick='';
        feed.forEach((fb) => {
            if (fb.name==='Анонимно') {
               nick='Анонимно';
            }else nick=`Ник: ${fb.name}`;
            li += `<li><span class="fb_name">${nick}</span><span class="fb_date">Дата: ${fb.date}</span><hr>
            <p>${fb.text}</p>`
        });
        document.querySelector('aside.feedback_content').classList.remove('spinner');
        document.getElementById('users_fb').innerHTML = li;
    })
    .catch((err) =>alert(err));
};
//Отправка отзыва
document.getElementById('feedback').addEventListener('submit',function(e){
e.preventDefault();
let user_name=document.getElementById('user_name').innerHTML, user_date=new Date(),
user_text=document.getElementById('users_fbb').value,anon=document.getElementsByName('visbile_name')[0];
if (user_text=='') return alert('Отзыв не может быть пустым');
if (anon.checked!=true){
    var name=`${user_name}`;
}else var name=`Анонимно`;
let params =`name=${name}&date=${user_date.getDate()}.${todayMonth(user_date.getMonth())}.${user_date.getFullYear()}&text=${user_text}`;
let url = './feedback/feedback.php';
http('POST',url,params)
.then(()=>{
   document.getElementsByClassName('btn_reset')[0].click();
    })
    .then(()=>{
        loadJSON();
    })
.catch((err)=>alert(err))
});
function todayMonth(month) {
if (month.lenght>2){
    return month+1;
}else return `0${month+1}`
  }
function check_log(user){
    let fb_content = document.getElementById('fb-content');
    let fb_form = document.getElementById('feedback');
    let span_form = document.createElement('span');
    span_form.classList.add('span_text');
    span_form.innerHTML='Пожалуйста, <strong>зарегестрируйтесь</strong><br> или <strong>войдите</strong> чтобы оставить отзыв.'
    if (user==null) {
        fb_content.style='display:none;';
        fb_form.appendChild(span_form);
        span_form.style='max-width:40%;'
    }else{
        span_form.remove();
        document.getElementById('user_name').innerHTML=user.split('@')[0];
        fb_content.style='display:block;';
    
    }
}

