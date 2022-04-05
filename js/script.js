let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', 
'🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛',
 '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
var gameOn=false; 
var cartegirate=0;
var timer;
if (document.URL.includes("index.html")){
    startGame();
    var modale=document.querySelector('.modale');
document.querySelector("#chiudi").addEventListener("click", function(){
    modale.style.display="none";
})

document.querySelector(".nome").addEventListener("click",e => prendiNome(e));

document.querySelector(".vinci").addEventListener("click",segreta);

var btn=document.querySelector(".button");
 btn.addEventListener("click",button);

 document.querySelector(".dinuovo").addEventListener("click", function(){
    location.reload();
 })
}

if (document.URL.includes("classifica.html")){
    generaClassifica();
}



var nome;




var scorcia=false;

function segreta(){
    scorcia=true;
    vittoria();
}

function prendiNome(e){
    e.preventDefault();
    nome=document.querySelector(".giocatore").value;
    if (nome!=""){
        document.querySelector(".nome").style.display="none";
        button();
    }
    
}

function viaAlTempo(){
    
    if (!gameOn){
        timer=setInterval(time,1000);
        gameOn=true;
    }
}

function startGame(){

    if (localStorage.length>=12){
        for (let i=localStorage.length-1;i>9;i--){
             localStorage.removeItem(i);
        }
    }
    
      shuffleArray(arrayAnimali);
      for (var i=0;i<24;i++){
          var div= document.createElement("DIV");
          div.className="card";
          document.querySelector(".griglia").appendChild(div);
          div.innerHTML="<p>"+arrayAnimali[i]+"</p>";
          div.addEventListener("click",ruota);
          
          
      }
     
 }

 function vittoria(){
     if (cartegirate==24 || scorcia){
         clearInterval(timer);
         gameOn=false;
         document.querySelector(".tempo").innerText= "";
         document.querySelector(".risultato").innerHTML= "Minuti: "+m +", secondi: "+ s;
         document.querySelector(".complimenti").innerHTML="Complimenti "+nome+"!";
         localStorage.setItem(nome,parseInt(60*m)+parseInt(s));
         modale.style.display="flex";
         btn.style.display="none";
         
     }
 }

 function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
 }

 var cartescoperte=[];
 

 function ruota(){
     if ((cartescoperte.length==2) || (!gameOn) || (this.id=="verde")){
         return;
     }

     this.classList.toggle("ruota");
     this.firstChild.style.display="block";
     if(cartescoperte.length<1){
         cartescoperte.push(this.firstChild);
     }else{
         cartescoperte.push(this.firstChild);
         var timer=setTimeout(check,1000);
     }

 }


 function check(){

    if (cartescoperte[0].isSameNode(cartescoperte[1])){
        cartescoperte[0].style.display="none";
        cartescoperte=[];
        return;
    }
     
     
     if (!cartescoperte[0].isEqualNode(cartescoperte[1])){
         cartescoperte[0].style.display="none";
         cartescoperte[1].style.display="none";
         
     }else {
         
         cartescoperte[0].parentElement.id="verde";
         cartescoperte[1].parentElement.id="verde";
         cartegirate+=2;
     }
     cartescoperte=[];
     vittoria();
 }

 var s=0;
 var m=0;

 function time(){
    s++;
    document.querySelector(".tempo").innerText= stringaTempo();
    if (s==59){
        s=-1;
        m++;
    }
 }

 function stringaTempo(){
     
     if (s<10 && m<10){
         return "0" + m + ":" + "0" + s; 
     }
     if (m<10 && s>=10){
         return "0" + m + ":" + s;
     }
     if (s>=10 && m>=10){
         return m + ":" + s;
     }
     if (s<10 && m>=10){
         return m + ":" + "0" + s;
     }
 }

 

 function button(){
    
     if (!gameOn){
         viaAlTempo();
         btn.innerHTML="Ferma il tempo";
     } else{
         clearInterval(timer);
         btn.innerText="Riavvia il tempo";
         gameOn=false;
     }
 }


 

 function generaClassifica(){
    class Player{
        constructor (name, s){
            this.name=name;
            this.s=s;
        }
        
    }
     
    var giocatori=[];
     var i;
    for (i=0;i<localStorage.length;i++){
        let k= localStorage.key(i);
        var p=new Player(k,parseInt(localStorage.getItem(k)));
        giocatori[i]= p;
    }

    
    
    var righe=document.querySelectorAll('.row');
    var lim=0;
    if (righe.length<10){
       lim=righe.length;
    }else{
       lim=10;
    }
    giocatori=ordina(giocatori);
    for (let j=0;j<lim;j++){
        i=j+1;
        righe[j].innerHTML="<div><strong>"+ i +" </strong></div>" + "<div> "+  giocatori[j].name +"</div>"+ 
        "<div>"+ giocatori[j].s +" sec " +"</div>"
        
    }
       
 }

 function ordina(inputArr){

    
    let n = inputArr.length;
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for(let j = i+1; j < n; j++){
            if(inputArr[j].s < inputArr[min].s) {
                min=j; 
            }
         }
         if (min != i) {
             // Swapping the elements
             let tmp = inputArr[i]; 
             inputArr[i] = inputArr[min];
             inputArr[min] = tmp;      
        }
    }
    return inputArr;
}

 