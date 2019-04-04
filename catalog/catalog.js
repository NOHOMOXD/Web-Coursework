
window.addEventListener("load", goods, false);
window.addEventListener("hashchange", goods, false);
let xmlBD='';
function removeChildren(elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }
var NameOfGoods = { acoustic_guitar:'acoustic',
             bass_guitar:'bass',
             electro_guitar: 'electro',
             ukelele: 'ukulele' };
var CotOfNames = { acoustic:'Акустические гитары',
             bass:'Басс гитары',
             electro: 'Электро-гитары',
             ukulele: 'Укулеле' }
function goods(){
    //Создаем Ajax запрос 
var xhr = new XMLHttpRequest();
    //Находим значение хэша
var hashname = window.location.hash.slice(1);
var treasure = "";
var cot=document.getElementById("id_Cot");
var ul = document.getElementById("list");
    //если элементы были созданы то очищаем страницу
removeChildren(ul);
    //находим значение сокровища
if (hashname in NameOfGoods) {
    treasure = NameOfGoods[hashname];
}
    //переименовываем каталог
if (treasure in CotOfNames){
    cot.innerHTML = CotOfNames[treasure];
}else{
    cot.innerHTML="Все товары";
}
    //Формируем наш запрос для сервера
    try {
xhr.open('GET', 'catalog.xml', true);

    //Проверяем доступность сервера
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        xmlFunc(xhr);
    };
};
    xhr.send();
} catch (error) {
    alert("ОШИБКА: СЕРВЕР НЕ ДОСТУПЕН! ПОЖАЛУЙСТА, ПРОВЕРЬТЕ СВОЕ ИНТЕРНЕТ СОЕДИНЕНИЕ");
}
    //функия с помощью которой мы рисуем список товаров
function xmlFunc(xml) { 
     xmlBD = xml.responseXML.documentElement; var li = "";
    if (treasure!=""){
        var tres = xmlBD.getElementsByTagName(treasure);
            for (let i = 0; i<tres.length;i++){
            li +="<li>" +"<span class='articul'>Артикул: <span>" +tres[i].childNodes[1].innerHTML +"</span></span>"+ "<br>"
            +"<span>" +tres[i].childNodes[3].innerHTML+"</span>" + "<br>"
            +"<img src =" +tres[i].childNodes[7].innerHTML +"></img>" + "<br>"
            +"Цена: <span class='coast'> " + tres[i].childNodes[5].innerHTML +"</span>"  +"<br>"
             + "<span class='more'>Подробнее</span>"+ "<span class='buy' onclick='parent(this.parentNode);'>Купить</span>"+  
            "</li>";
            }
    } else {
    let id = xmlBD.getElementsByTagName("id"),name = xmlBD.getElementsByTagName("name"),
    imag = xmlBD.getElementsByTagName("image"),coast = xmlBD.getElementsByTagName("coast");
        for (let i = 0; i<name.length;i++){
        li +="<li>" +"<span class='articul'>Артикул: <span>" +id.item(i).innerHTML +"</span></span>"+ "<br>"
        +"<span>" +name[i].childNodes[0].nodeValue+"</span>" + "<br>"
        +"<img src =" +imag[i].childNodes[0].nodeValue +"></img>" + "<br>"
        +"Цена: <span class='coast'> " + coast[i].childNodes[0].nodeValue +"</span>"  +"<br>"
         + "<span class='more' onclick='info(this)'>Подробнее</span>"+ "<span class='buy' onclick='parent(this.parentNode);'>Купить</span>"+  
        "</li>";
        }
    };
    document.getElementsByClassName("main")[0].classList.remove('spinner');
    document.getElementById("list").innerHTML = li;
 }
};
    //добавелние в корзину
var all_Busket = 0,busk = document.getElementById("busket");
function parent(x){
    let art_id = x.getElementsByTagName('span')[1]; 
    localStorage.setItem(art_id.innerHTML,parseInt(localStorage.getItem(art_id.innerHTML))+1);
    if (localStorage.getItem(art_id.innerHTML)=="NaN"){
   var amount_Busket=parseInt(document.getElementById("busket").innerHTML)+1;
    localStorage.setItem(art_id.innerHTML,1);
    localStorage.setItem('amount_Busket',amount_Busket);}
    document.getElementById("busket").innerHTML = localStorage.getItem('amount_Busket');
}

//Кнопка "подробнее"
const info = (e) =>{
    let arrId = xmlBD.querySelectorAll("id"),name=xmlBD.querySelectorAll("name"),coast=xmlBD.querySelectorAll("coast"),image=xmlBD.querySelectorAll("image"),about=xmlBD.querySelectorAll("about"),
    specifications=xmlBD.querySelectorAll("specifications");
    console.log(arrId);
    let id = e.parentNode.querySelectorAll('span')[1].innerHTML,idinfo=new Object;
    idinfo.id=id;
    for (let i = 0; i < arrId.length; i++) {
        if ( arrId[i].innerHTML==id){
            idinfo.name=name[i].innerHTML;
            idinfo.coast=coast[i].innerHTML;
            idinfo.image=image[i].innerHTML;
            idinfo.about=about[i].innerHTML;
            idinfo.specifications=specifications[i].innerHTML;
        }
    }
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    console.log(scrolled);
    let itemCoords = e.parentNode.getBoundingClientRect();
    document.body.style.overflow = 'visible';
    document.querySelectorAll("div.modal_lgn_sgn")[0].style = `display:block;height:200vh;top:${scrolled-100}px;`;
    document.querySelectorAll("div.infomodal")[0].style=`display:block;top:${scrolled-50}px;`;
    console.log(idinfo);
}
const infoclose = (e) => {
    document.body.style.overflow = 'visible;';
    document.querySelectorAll("div.modal_lgn_sgn")[0].style = "display:none;height:0vh;";
    document.querySelectorAll("div.infomodal")[0].style='display:none';
}
document.querySelectorAll("span.info_btn_close")[0].addEventListener('click',infoclose);
document.querySelectorAll("div.modal_lgn_sgn")[0].addEventListener('click',infoclose);
const imgloop = (e) =>{
    let looped =document.querySelectorAll('div.image')[0],loopedcenter,loopedtop;
    let coords=looped.getBoundingClientRect();
    looped.style=`background-position-x:${window.event.clientX-coords.left-(coords.right-coords.left)/1.3}px; 
                    background-position-y: ${window.event.clientY-coords.top-coords.bottom+100}px;
                    background-size: 300px;`;
   // console.log((coords.top/coords.bottom)*window.event.clientY-(coords.top+coords.bottom)*(coords.top/coords.bottom)+400);
    // console.log(window.event.clientY);
    // console.log(window.event.clientY-coords.top-coords.bottom+250);
}
const imgdefault = (e) =>{
    let looped =document.querySelectorAll('div.image')[0],loopedcenter,loopedtop;
    looped.style=`background-position-x:0px; 
    background-position-y: 0px;
    background-size: cover;`;
}
document.querySelectorAll('div.image')[0].addEventListener('mousemove',imgloop);
document.querySelectorAll('div.image')[0].addEventListener('mouseleave',imgdefault);