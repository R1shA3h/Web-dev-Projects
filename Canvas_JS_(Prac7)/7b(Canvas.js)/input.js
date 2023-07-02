function f1()
{
   var chart1 = new CanvasJS.Chart("chartContainer1",  
   {  
     title:{  
     text: "Adding dataPoints"    
     },  
     data: [  
     {          
       type: "column",  
       dataPoints: [  
       { y: 71 },  
       { y: 55},  
       { y: 50 },  
       { y: 65 },  
       { y: 95 },  
       { y: 68 },  
       { y: 28 },  
       { y: 34 },  
       { y: 14}  
       
       ]  
     }  
     ]  
   });  
 
   chart1.render();  
 

 }

 function f2()
 {
   var chart2 = new CanvasJS.Chart("chartContainer2",  
   {  
     title:{  
     text: "Placing dataPoint on axis X"  
     },  
     data: [  
     {          
       type: "column",  
       dataPoints: [  
       { x: 10, y: 71 },  
       { x: 22, y: 55},  
       { x: 31, y: 50 },  
       { x: 44, y: 65 },  
       { x: 50, y: 95 },  
       { x: 64, y: 68 },  
       { x: 72, y: 28 },  
       { x: 84, y: 34 },  
       { x: 90, y: 14}  
       
       ]  
     }  
     ]  
   });  
 
   chart2.render();  
 } 


 function f3()
 {
   var chart3 = new CanvasJS.Chart("chartContainer3",  
   {    
     title: {  
       text: "Axis With Custom Labels"        
     },  
     data: [  
     {               
       type: "column",  
       dataPoints: [  
        
       { y: 71, label: "cat 1" },  
       { y: 55, label: "cat 2" },  
       { y: 50, label: "cat 3" },  
       { y: 65, label: "cat 4" },  
       { y: 95, label: "cat 5" },  
       { y: 68, label: "cat 6" },  
       { y: 28, label: "cat 7" },  
       { y: 34, label: "cat 8" },  
       { y: 14, label: "cat 9" }  
       ]  
     }  
     ]  
   });  
 
   chart3.render();  
 } 
 function f4()
 {
   var chart4 = new CanvasJS.Chart("chartContainer4",  
   {  
     title:{  
      text: "Index Labels on dataPoints"     
     },  
     data: [  
     {          
       type: "column",  
       dataPoints: [  
         
       { x: 10, y: 71},  
       { x: 20, y: 55},  
       { x: 30, y: 50 },  
       { x: 40, y: 65 },  
       { x: 50, y: 125, indexLabel: "high" },  
       { x: 60, y: 68 },  
       { x: 70, y: 28 },  
       { x: 80, y: 34 },  
       { x: 90, y: 14,  indexLabel: "low" }  
       ]  
     }  
     ]  
   });  
 
   chart4.render(); 
 } 
 
 function f5()
 {
   var chart5 = new CanvasJS.Chart("chartContainer5",  
   {  
     title:{  
     text: "Demand of Programming Languages",  
     fontWeight: "bolder",  
     fontColor: "#008B8B",  
     fontfamily: "tahoma",          
     fontSize: 25,  
     padding: 10   
     },  
     axisY: {
       labelFontSize: 20,
       labelFontColor: "dimGrey"
     },
     axisX: {
       labelAngle: -30
     },
     data: [  
     {          
       type: "spline",  
       dataPoints: [  
       { y: 71, label: "Java" },  
       { y: 55, label: "R" },  
       { y: 50, label: "Perl" },  
       { y: 65, label: "PHP" },  
       { y: 95, label: "Python" },  
       { y: 68, label: "DOTNET" },  
       { y: 28, label: "Matlab" },  
       { y: 34, label: "C++" },  
       { y: 14, label: "C" }  
       
       ]  
     }  
     ]  
   });  
 
   chart5.render();  
 }  
 
 function f6()
 {
   var chart6 = new CanvasJS.Chart("chartContainer6",  
   {  
      title:{  
       text: "Golds won in 2012 London Olympics",   
       fontWeight: "bolder",  
       fontColor: "#008B8B",  
       fontfamily: "tahoma",          
       fontSize: 25,  
       padding: 10          
     },  
 
     data: [  
     {          
       type: "column",  
       dataPoints: [  
        {label: "US", y: 46 },  
        {label: "China", y: 38},  
        {label: "Britain", y: 29},  
        {label: "Russia", y: 24 },  
        {label: "South Korea", y: 13 },  
        {label: "Germany", y: 11 },  
        {label: "france", y: 11},  
        {label: "Hungary", y: 8 },  
        {label: "Australia", y: 7 },  
        {label: "Japan", y: 7 }        
     ]  
   }  
 
     ]  
   });  
 
   chart6.render(); 
 }

function f7()
{
 var chart7 = new CanvasJS.Chart("chartContainer7",
 {
   title:{
     text: "try tick properties."      
   },
   axisX:{
     tickColor: "red",
     tickLength: 5,
     tickThickness: 2
     
   },
   axisY:{
     tickLength: 15,
     tickColor: "DarkSlateBlue" ,
     tickThickness: 5
     
   },
      
   data: [
   {        
     type: "column",
     dataPoints: [
     { x: 10, y: 71 },
     { x: 20, y: 55},
     { x: 30, y: 50 },
     { x: 40, y: 65 },
     { x: 50, y: 95 },
     { x: 60, y: 68 },
     { x: 70, y: 28 },
     { x: 80, y: 34 },
     { x: 90, y: 14}
     ]
   }
     
   ]
 });

 chart7.render();
}
function f8()
{
 var chart8 = new CanvasJS.Chart("chartContainer8",
 {
   title:{
     text: "Learning Grid line Properties "      
   },
      axisX:{
     gridColor: "lightblue" ,
     gridThickness: 2        
   },
   axisY:{        
     interval: 15,
     gridColor: "lightgreen"
   },
  

   
   data: [
   {        
     type: "column",
     dataPoints: [
     { x: 10, y: 71 },
     { x: 20, y: 55},
     { x: 30, y: 50 },
     { x: 40, y: 65 },
     { x: 50, y: 95 },
     { x: 60, y: 68 },
     { x: 70, y: 28 },
     { x: 80, y: 34 },
     { x: 90, y: 14}
     ]
   }      
   ]
 });

 chart8.render();
}
function f9()
{
 var chart9 = new CanvasJS.Chart("chartContainer9",
 {
   title:{
     text: "Interlaced Colors Example"      
   },
   axisY:{
     interlacedColor: "#F8F1E4" 
   },
   data: [
  
     {        
     type: "line",
     dataPoints: [
     { x: 10, y: 171 },
     { x: 20, y: 155},
     { x: 30, y: 150 },
     { x: 40, y: 165 },
     { x: 50, y: 195 },
     { x: 60, y: 168 },
     { x: 70, y: 128 },
     { x: 80, y: 134 },
     { x: 90, y: 114}
     ]
   }
   ]
 });

 chart9.render();
}

function f10()
{
 var chart10 = new CanvasJS.Chart("chartContainer10",
   {
     title:{
     text: "Enabling Legend"   
     },
     data: [
     {        
       type: "column",
       showInLegend: true, 
       name: "series1",
       legendText: "IPhone",
       dataPoints: [
       { x: 10, y: 71 },
       { x: 20, y: 55},
       { x: 30, y: 50 },
       { x: 40, y: 65 },
       { x: 50, y: 95 },
       { x: 60, y: 68 },
       { x: 70, y: 28 },
       { x: 80, y: 34 },
       { x: 90, y: 14}
     
       ]
     },
       {        
       type: "column",
       legendText: "Android",
      name: "series2",
       showInLegend: true, 
       dataPoints: [
       { x: 10, y: 7 },
       { x: 20, y: 5},
       { x: 30, y: 5 },
       { x: 40, y: 16 },
       { x: 50, y: 9 },
       { x: 60, y: 61 },
       { x: 70, y: 18 },
       { x: 80, y: 14 },
       { x: 90, y: 24}
     
       ]
     }
     ]
   });

   chart10.render();
}

 window.onload(f1(),f2(),f3(),f4(),f5(),f6(),f7(),f8(),f9(),f10())
