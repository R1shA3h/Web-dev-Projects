const para = "This_is_Rishabh_Jain_from_Shri_Ramdeobaba_College_of_Engineering_and_Management";
const vowels = ['a','e','i','o','u'];
let count = 0;

for(let i = 0;i<para.length;i++){
    const letter = para[i].toLowerCase();
    if(vowels.includes(letter)){
        count++;
    }
}

console.log("No of vowels",count);