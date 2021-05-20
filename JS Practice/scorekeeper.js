var p1=0;
var p2=0;
var over=false;
var win=5;

var btn1=document.getElementById("p1");
var btn2=document.getElementById("p2");
var btn3=document.getElementById("reset");
var max=document.querySelector("input");
var score1=document.querySelector("#score1");
var score2=document.querySelector("#score2");
var maxDisplay=document.querySelector("p span");

btn1.addEventListener("click",function(){
    if(!over){
        p1++;
        score1.textContent= p1;
        if(p1===win){
            over= true;   
            score1.classList.add("winner");
        }}
});
btn2.addEventListener("click",function(){
    if(!over){
        p2++;
        score2.textContent= p2;
        if(p2===win){
            over= true;    
            score2.classList.add("winner");
        }}
});
btn3.addEventListener("click",function(){reset();});
max.addEventListener("change",function(){
    maxDisplay.textContent= max.value;
    win= Number(max.value);
    reset();
});

function reset(){
    p1=0;
    p2=0;
    over= false;
    score1.textContent= p1;
    score2.textContent= p2;
    score1.classList.remove("winner");
    score2.classList.remove("winner");
}