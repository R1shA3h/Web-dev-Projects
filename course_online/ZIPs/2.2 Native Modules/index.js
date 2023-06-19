

const fs  = require("fs");

// fs.writeFile("message.txt","Hello there from rishabh",(err)=>{
//     if (err) throw err;
//     console.log("The File has been saved");
// });


fs.readFile("./message.txt","utf8",(err,data)=>{
    if (err) throw err;
    console.log(data);
})