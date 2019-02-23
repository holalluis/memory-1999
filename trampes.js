let Trampes = {};//namespace
Trampes.trampes={};

//OK troba aina queralt i lluís i destapa'ls durant una estona
Trampes.trampes.participar=function(){
  alert("L'important és participar!");
  var persones = ['aina','queralt','lluis'];

  persones.forEach(function(nom){
    var caselles=document.querySelectorAll("td[contingut='<img src=img/"+nom+".jpg>']");
    for(var i=0;i<caselles.length;i++)
    {
      caselles[i].innerHTML=caselles[i].getAttribute('contingut');
    }
  });

  setTimeout(function(){
    persones.forEach(function(nom){
      var caselles=document.querySelectorAll("td[contingut='<img src=img/"+nom+".jpg>']");
      for(var i=0;i<caselles.length;i++)
      {
        if(!caselles[i].classList.contains('despejada')) { caselles[i].innerHTML=""; }
      }
    });
  },2000);
};

//OK destapa les queralts durant un instant
Trampes.trampes.aibo=function(){
  alert("Aibóóó! La Queralt ha revelat la seva posició!");
  var queralts=document.querySelectorAll("td[contingut='<img src=img/queralt.jpg>']");
  for(var i=0;i<queralts.length;i++)
  {
    queralts[i].innerHTML=queralts[i].getAttribute('contingut');
  }
  setTimeout(function(){ 
    for(var i=0;i<queralts.length;i++) { 
      if(!queralts[i].classList.contains('despejada')) { 
        queralts[i].innerHTML="";
      }
    } 
  },1000);
};

//OK ensenya una persona tapada aleatòriament
Trampes.trampes.vegilies=function(){
  alert('Aquí tens una pissssstaaaaaa...!');
  var cela=document.querySelector('td[col]:not(.despejada)');
  var celes=document.querySelectorAll('td[col][contingut="'+cela.getAttribute('contingut')+'"]');
  celes[0].innerHTML=celes[0].getAttribute('contingut');
  celes[1].innerHTML=celes[1].getAttribute('contingut');
};

//OK temps a zero
Trampes.trampes.dormo=function(){alert("Enhorabona! El temps ha tornat enrere a l'època del B005! (el temps ha tornat a zero)");temps=0};

//OK no passa res
Trampes.trampes.res=function(){alert("JAJAJA! Has intentat fer trampes però no ha passat res")};

//OK revela tot durant un instant 
Trampes.trampes.funciona=function(){
  alert("Ara ho veuràs tot revelat durant 5 segons! Atenta!");
  var celes=getCeles();
  var antics=[];
  for(var i=0;i<celes.length;i++)
  {
    antics.push(celes[i].innerHTML);
    celes[i].innerHTML=celes[i].getAttribute('contingut');
  }
  setTimeout(function(){ for(var i=0;i<celes.length;i++) { celes[i].innerHTML=antics[i]; } },5000);
};

//OK notificació
//Trampes.trampes.vergonya=function(){alert("Vergonya! T'he pillat i ara tothom ho sabrà");window.open('http://titesitetes.esy.es/php/mail.php?p=noflash');};

//OK revela tot
Trampes.trampes.queralisme=function(){
  alert("Enhorabona! Queralisme activat! Totes les caselles són visibles! XD! XD! Afanya't a clicar-les abans que et pillin!");
  var celes=getCeles();
  for(var i=0;i<celes.length;i++)
  {
    celes[i].innerHTML=celes[i].getAttribute('contingut');
  }
};

//OK reinicia
Trampes.trampes.limit=function(){ 
  alert("T'he pillat! Fer trampes està malament! Reiniciant la partida! Què cardes! jejejeje! XD!");
  var celes=getCeles();
  for(var i=0;i<celes.length;i++)
  {
    celes[i].classList.remove('despejada');
    celes[i].innerHTML="";
  }
  //pq es queda seleccionada una? arregla-ho
  var cela=document.querySelector('td.selected');
  if(cela)cela.classList.remove('selected');

};

//OK wikipedia
Trampes.trampes.volentdir=function(){alert("Randomisme activat! Saps què? Mai és mal moment per aprendre tonteries random sobre el món (en una nova pestanya)");window.open("https://es.m.wikipedia.org/wiki/Especial:Aleatoria")};

//OK 
Trampes.random=function() {
  var disponibles=parseInt(document.querySelector('#comptador_trampes').innerHTML)
  if(disponibles==0){alert("Ja no queden més trampes per fer! Si vols poder fer més trampes cal tenir privilegis amb el programador! Uaaaaala!");return;}
  //actualitza
  disponibles--;
  document.querySelector('#comptador_trampes').innerHTML=disponibles;
  //trampa random i elimina-la de les trampes pq no es repeteixi
  var tt=Object.keys(Trampes.trampes);
  var n=Math.floor(Math.random()*tt.length);
  Trampes.trampes[tt[n]]();
  delete Trampes.trampes[tt[n]];
}
