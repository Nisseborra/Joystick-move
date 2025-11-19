

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

import {joystick} from "./joystick.js";



const player = {
    x: canvas.width/2,
    y: canvas.height/2,
    width: 50,
    height: 50,
    dx : 5,
    dy : 5,
}





   

function update(){
        context.clearRect(0, 0, canvas.width, canvas.height); 
        analog.draw(context);
        stick.draw(context)
        
       
       


        window.requestAnimationFrame(update);
    }




    let analog = new joystick(375, 800, 50);
    let stick = new joystick( 375, 400, 50)


    update();
    analog.Eventen(analog);
    stick.Eventen(stick);



