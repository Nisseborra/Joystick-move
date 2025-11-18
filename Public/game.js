

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const player = {
    x: canvas.width/2,
    y: canvas.height/2,
    width: 50,
    height: 50,
    dx : 5,
    dy : 5,
}


class joystick{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
    
        this.X = x;
        this.Y = y;
        this.R = r*2

        this.dx = 0;
        this.dy = 0;
        this.outside_radius;

    }
        
        draw() {
            //ritar inre cirkeln 
           context.save();
           context.beginPath();
           context.arc(this.x,this.y,this.r, 0, Math.PI *2);
           context.fillStyle ="red";
           context.fill();
           context.restore();


           // yttre cireln
           context.save();
           context.beginPath();
           context.arc(this.X,this.Y,this.R, 0, Math.PI *2);
           context.lineWidth=3;
           context.stroke();
           context.restore();


        }

        drawtext(){
            context.font ="20px Arial";
            context.fillStyle= "x:" + Math.round(this.dx)+ "y:"+ Math.round(this.dy),50, 50 ;
        }
        


}


    // spelare
   



    //varje button
   

    function update(){
        context.clearRect(0, 0, canvas.width, canvas.height)
        analog.draw();
        analog.drawtext();
       
        

        window.requestAnimationFrame(update);

    }

    
    Eventen();

    function Eventen(){
        canvas.addEventListener('touchstart', e => {

       
        const rect = canvas.getBoundingClientRect();
        const px = e.touches[0].clientX -rect.left;
        const py = e.touches[0].clientY -rect.top;
        if (!toucharea(px, py, analog)) {
        
                analog.dx = 0;
                analog.dy = 0;

              return;
        }
            
      

        analog.x = px;
        analog.y = py;
    
            

        })

      canvas.addEventListener('touchmove', e => {
         e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const px = e.touches[0].clientX - rect.left;
        const py = e.touches[0].clientY - rect.top;
        if (!toucharea(px, py, analog)) {
            
                analog.dx = 0;
                analog.dy = 0;

              return;
        }
            
          

        analog.x = px;
        analog.y = py;
         

        let ax = analog.x - analog.X;
        let ay = analog.y - analog.Y;

        let mag = Math.sqrt(ax*ax + ay*ay);

        analog.dx = ax / mag;
        analog.dy = ay / mag;

        // Clamp to radius
        if (mag > analog.R) {
            analog.x = analog.X + analog.dx * analog.R;
            analog.y = analog.Y + analog.dy * analog.R;
        }
      
    }
        )

        
        // sluta röra oå sig går till bak in i centrum
        canvas.addEventListener('touchend', e=>{
            analog.x = analog.X;
            analog.y = analog.Y;
            analog.dx = 0;
            analog.dy = 0;
        }
        )

    }

    function toucharea(x,y, joystick){

        let dx = x - joystick.x;
        let dy = y - joystick.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        if(joystick.R >= distance){
            joystick.outside_radius = false;
            return true;
        }
        else{
            outside_radius= true;
            
            return false;
        }




    }


    let analog = new joystick(375, 800, 50);
    update();
    Eventen();
