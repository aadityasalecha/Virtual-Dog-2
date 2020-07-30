//Create variables here
var dog,happydog,Food,database,dog_sprite,getFood,giveFood,time,hour,hr;


function preload()
{
  dog=loadImage("Dog.png")
 happydog= loadImage("happydog.png")
}

function setup() {
  database= firebase.database();
	createCanvas(1920,1080);
  dog_sprite=createSprite (750,250)
  
  dog_sprite.addImage(dog)
  
  dog_sprite.scale=0.1

  Food=new food();

  giveFood=createButton("feed the dog")
  giveFood.position(760,95)

  addFood=createButton("add food")
  addFood.position(850,95)
  

     
      
  
 
}


function draw() {  
//console.log(getFood)
background(46,139,87);



Food.getFoodStock();

if(getFood!==null&&getFood!==undefined){

  addFood.mousePressed(()=>{
    
    Food.AddFood()

  }



  )

  
  giveFood.mousePressed(()=>{
    dog.velocityX=500
   

 //   Food.deduct();
  //  Food.updateFoodStock();
    getfeedTime();

    dog_sprite.addImage(happydog)


  }

  

  );
  fed(); 

 }

Food.display();




 
  //add styles here
  drawSprites();

  
}



async function getfeedTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
 hour = datetime.slice(11,13);

 database.ref('/').update({
  time:hour})
 
 // console.log(hour)
  
  } 


  function fed(){
    database.ref("time").on("value",function(data){
     hr=  data.val();

    })


if(hr>=12){
text("Last Feed : "+hr%12+"PM",350,30);

}
else{ 
  text("last feed : "+hr+"Am",350,30)
}

}