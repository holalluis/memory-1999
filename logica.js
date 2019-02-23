function getCeles(){return document.querySelectorAll("#tablero tr[fil] td[col]")}
function listeners(){var celes=getCeles();for(var i=0;i<celes.length;i++){celes[i].onclick=function(){selecciona(this)}}}

function reparteix(arr){
  function shuf(arr) 
  {
    //Algoritme de yates per barrejar un array
    for (var i=arr.length-1;i>0;i--) 
    {
      var j=Math.floor(Math.random()*(i+1));
      var temp=arr[i];
      arr[i]=arr[j];
      arr[j]=temp;
    }
    return arr;
  }
  arr=shuf(arr);
  var celes=getCeles();
  for(var i=0;i<celes.length;i++){
    celes[i].setAttribute('contingut',arr.pop());
    celes[i].classList.remove('despejada');
    celes[i].classList.remove('selected');
    celes[i].innerHTML="<div style='cursor:pointer;position:absolute;left:40%;top:40%'>?</div>";
  }
}

function selecciona(cela){
  //si ja esta feta, no facis res
  if(cela.classList.contains('despejada')) return;
  //deselect all cells
  var celes=getCeles();
  for(var i=0;i<celes.length;i++) celes[i].classList.remove('selected');
  //posa selected a la triada
  cela.classList.add('selected');
  var audio = new Audio("snd/click.wav");
  audio.play();
  //revela: 
  revela(cela);
}

function revela(cela){
  //si ja existeix una altra revelada intenta match
  //si no, revela-la
  var revelades=document.querySelectorAll('td.revelada');
  if(revelades.length==1)
  {
    match(revelades[0],cela);
  }
  else
  {
    cela.classList.add('revelada');
  }
  cela.innerHTML=cela.getAttribute('contingut');
}

function match(cela1,cela2)
{
  var ms=500;
  cela1.classList.remove('revelada');
  cela2.classList.remove('revelada');
  if(cela1.getAttribute('contingut')==cela2.getAttribute('contingut'))
  {
    cela1.classList.add('despejada');
    cela2.classList.add('despejada');
    var audio = new Audio('snd/ding.wav');
    audio.play();
    comprovaWin();
  }
  else{
    cela1.classList.remove('selected');
    cela2.classList.remove('selected');
    setTimeout(function(){ 
      cela1.innerHTML=""; 
      cela2.innerHTML=""; 
    },ms);
  }
  //setTimeout(function(){comprovaWin()},ms);
}

function comprovaWin()
{
  var celes=getCeles().length;
  var despejades=document.querySelectorAll('#tablero td.despejada').length;
  if(celes==despejades)
  {
    var body=document.createElement('div');
    body.innerHTML="<h1>HAS GUANYAT!</h1><h3>Has trigat "+temps+" segons!<br>That's what she said!</h3>";

    var div=document.createElement('div');div.style.textAlign='center';
    body.appendChild(div);

    var btn=document.createElement('button');btn.onclick=function(){window.location.reload()}
    div.appendChild(btn);
    btn.style.padding="1em 7em";
    btn.innerHTML="Torna a jugar";

    //elimina h2 i h3 i després inserta el body
    var h2=document.querySelector('h2')
    var h3=document.querySelector('h3')
    h2.style.display='none';
    h3.style.display='none';
    document.body.insertBefore(body,h2);
    document.querySelector('#trampes').style.display='none'

    setTimeout(function(){
      var audio = new Audio('snd/win.wav'); audio.play()
    },700);
  }
}

var temps=0;//Global
function iniciaTemps()
{
  temps=0;
  var compt=document.querySelector('#comptador_temps');
  clearInterval();
  setInterval(function()
  {
    temps++;
    compt.innerHTML=temps;
  },1000);
}
