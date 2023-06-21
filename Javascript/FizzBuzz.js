var arr = [];
var n = 1;

function fizzbuzz(){
    while(n<=100){
        if (n%3===0 && n%5===0){
            arr.push("fizzbuzz");
        }
        else if(n%3===0){
            arr.push("fizz");
        }
        else if(n%5===0){
            arr.push("buzz");
        }
        else{
            arr.push(n);
        }
        n++;  
            
        }
    console.log(arr);
}
