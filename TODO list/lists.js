window.setTimeout(function(){
    var todo= [];
var choice; 
while(choice!=="exit"){
    choice=prompt("So what is your choice??");
    if(choice==="add"){
        add();
    }
    else if(choice==="list"){
        list();
    }
    else if(choice==="delete"){
        remove();
    }
}
console.log("OKk!! You exited the app!!")

function add(){
    todo.push(prompt("Your task!!"));
}

function list(){
    console.log("#*#*#*#*#*#*#*#*");
    for(var i=0;i<todo.length;i++){
        console.log(i+"> "+todo[i]);
    }
    console.log("#*#*#*#*#*#*#*#*");
}

function remove(){
    var n = prompt("Enter the index to be deleted:");
    console.log("Item deleted is:"+todo[n] );
    todo.splice(n,1);
}
},500);
