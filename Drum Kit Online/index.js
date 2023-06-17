for (var i = 0;i<document.querySelectorAll(".drum").length;i++){
    document.querySelectorAll("button")[i ].addEventListener("click",function (){
        var buttonhtml = this.innerHTML;
            makesound(buttonhtml);
    });
}

document.addEventListener("keypress",function(event){
    makesound(event.key);
});


function makesound(key){
    switch(key){
        case "w":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;
        case "d":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;
        case "j":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;
        case "k":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;
        default:
            console.log()

    }
}




// function housekeeper1(name,age,work,salary){
//     this.name=name;
//     this.age=age;
//     this.work=work;
//     this.salary = salary;
// }

// var h1 = new housekeeper1("M",25,"Cleaning",2500);