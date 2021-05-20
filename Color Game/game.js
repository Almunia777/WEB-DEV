var colors=[]; 
var picked; 
var num=6;

var square= document.querySelectorAll(".square");
var display= document.getElementById("display");
var message= document.getElementById("message");
var shuffle= document.querySelector("#reset");                                                                                                                                                                                                          
var h1= document.querySelector("h1");
var mode= document.getElementsByClassName("mode");

init();
function init(){
    reset();
    for(var i=0; i<square.length; i++){
        square[i].addEventListener("click",function(){
            var clicked= this.style.backgroundColor;
            if(clicked===picked){
                message.textContent= "CONGRATS!!";
                win(clicked);
                h1.style.background= clicked;
                shuffle.textContent = "Play Again?";
            }
            else{
                this.style.backgroundColor= "#232323";
                message.textContent= "BOOO!!";
            }
        });
    }
    
    for(var i=0; i<mode.length; i++){
    mode[i].addEventListener("click",function(){
        mode[0].classList.remove("highlight");
        mode[1].classList.remove("highlight");
        this.classList.add("highlight");
        this.textContent==="Easy" ? num= 3 : num= 6;
        reset();
    });}
}


shuffle.addEventListener("click",function(){
    reset();
});

function win(color){
    for(var i=0; i<square.length; i++){
        square[i].style.backgroundColor= color;
    }
}
function pick(){
    var random= Math.floor(Math.random() * colors.length);
    return colors[random];
}
function generate(num){
    var arr=[];
    for(var i=0; i<num; i++){
        arr.push(randomColor());
    }
    return arr;
}
function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r +", " + g + ", " + b + ")";
}
function displayBox(){
    for(var i=0; i<square.length; i++){
        if(colors[i])
            square[i].style.backgroundColor= colors[i];
        else
            square[i].style.backgroundColor= "#232323";}
}
function reset(){
    colors= generate(num);
    picked= pick();
    display.textContent= picked;
    displayBox();
    h1.style.background= "steelblue";
    shuffle.textContent = "New Colors";
    message.textContent= "";
}