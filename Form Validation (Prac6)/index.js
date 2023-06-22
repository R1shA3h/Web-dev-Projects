
function validation(event)
{
event.preventDefault();
var name =document.myform.name.value;
var email =document.myform.email.value;
var DOB =document.myform.DOB.value;
var num =document.myform.num.value;
var tenth =document.myform.tenth.value;
var twelveth =document.myform.twelveth.value;
var clg =document.myform.clg.value;
var uni =document.myform.uni.value;
var select =document.myform.select.value;
var upi =document.myform.upi.value;
var card =document.myform.card.value;
if(name==null||name=="")
{
alert("Name cant be blanked");
}
var pattern = /^[A-Za-z\s]+$/;
if(!name.match(pattern))
{
    alert("Name should be letters");
}
var letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if (!email.match(letters)) {
    alert("Email not correct");
}
var dob= /^\d{4}-\d{2}-\d{2}$/;
if (!DOB.match(dob)) {
    alert("DOB not correct");
}


    var number=  /^[7-9]\d{9}$/;;
    if (!num.match(number)) {
        alert("Number should begin with 7/8/9");
    }


if(parseInt(tenth)<0 && parseInt(tenth)>100)
{
    alert("10th marks should be a number between 0 and 100");
}
if(parseInt(twelveth)<0 && parseInt(twelveth)>100)
{
    alert("12th marks should be a number between 0 and 100");
}
if(parseInt(clg)<0 && parseInt(clg)>100)
{
    alert("College marks should be a number between 0 and 100");
}
if(parseInt(uni)<0 && parseInt(uni)>100)
{
    alert("University marks should be a number between 0 and 100");
}

if (card == null || card === "") {
    alert("Card number can't be blank");

  }

  var cardNumberRegex = /^[0-9]{16}$/;
  if (!card.match(cardNumberRegex)) {
    alert("Card number is not valid. It should be a 16-digit number.");
    
  }


  if (upi == null || upi== "") {
    alert("UPI ID can't be blank");
    
  }

  var upiIDRegex = /^[\w.-]+@[\w.-]+$/;
  if (!upi.match(upiIDRegex)) {
    alert("UPI ID is not valid");
    
  }


}