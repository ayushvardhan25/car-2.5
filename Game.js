class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background('#464646');
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        textSize(15);
      text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+70)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860 && finishedply===false){
      gameState = 2;
      Player.updateFinishedplayer()
      player.update()
      player.rank = Leaderboard
      finishedply=== true
    }
   
    drawSprites();
  }

  displayply(){
    background(0)
   Player. getPlayerInfo()
   for(var plr in allPlayers){
     if(allPlayers[plr].rank===1){
       text('first'+allPlayers[plr].name,0,85)
       
     }
     else if(allPlayers[plr].rank===2){
       text('second'+allPlayers[plr].name,displayWidth/4,displayHeight/9+20)



     }
     else if(allPlayers[plr].rank===3){
      text('third'+allPlayers[plr].name,displayWidth/-4,displayHeight/9+20)
   }
else{
text('fourth'+allPlayers[plr].name,displayWidth/-4,displayHeight/9+20)
}
  }

}

  
  
}



