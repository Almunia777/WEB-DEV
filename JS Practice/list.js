var lis=document.querySelectorAll("li");
for(var i=0;i<3;i++){
    lis[i].addEventListener("mouseover", function(){
        this.classList.add("active");
    });
    lis[i].addEventListener("mouseout", function(){
        this.classList.remove("active");
    });
    lis[i].addEventListener("click", function(){
        this.classList.toggle("done");
    });
}