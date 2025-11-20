

const socket = io("http://localhost:3000");
socket.on("connect", () => {
    console.log(`you connected with id: ${socket.id}`);
});

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

import {joystick} from "./joystick.js";

let playerNumber = null;



  socket.on('playerNumber', n =>{
        playerNumber = n;
        console.log("you are player:", n);
    });




// spelare
let player ={
    1:{
    x: 400,
    y:250,
    vel: 1,
    },
    2:{
    x: 400,
    y:500,
    vel: 1,
    }
}

   


    function drawplayers(player){
            context.save();
            context.fillStyle ="red";
            context.fillRect(player.x,player.y, 30, 30)
            context.restore();

        }
   
     function movePlayer(player, analog){
            player.x += player.vel*analog.dx;
            player.y += player.vel*analog.dy;
        }


    function playerspeed(player, analog){
            context.font ="20px Arial";
            context.fillText("x:" + (player.vel*analog.dx).toFixed(4)+ "y:"+ (player.vel*analog.dy).toFixed(4), 100 , 100) ;
       
        }
        
        
     



function update(){
        context.clearRect(0, 0, canvas.width, canvas.height); 
       
        analog.draw(context);
        analog.drawtext(context, analog);
    
        drawplayers(player[1]);
        drawplayers(player[2]);
        
        if(player[playerNumber] != null && player[playerNumber])  {
            movePlayer(player[playerNumber], analog);
            playerspeed(player[playerNumber], analog);
        
            socket.emit("uppos", {
                number: playerNumber,
                x: player[playerNumber].x ,
                y: player[playerNumber].y
            });
        }
    

    

        window.requestAnimationFrame(update);
    }



    let analog = new joystick( 375, 800, 50)

    analog.Eventen(analog);
    analog.drawtext(context, analog);
    update();
 

    socket.on("playermoved", data => {
        if (playerNumber && data.number !== playerNumber) {
        player[data.number].x = data.x;
        player[data.number].y = data.y;
        }
    
    })


