var fps = 60,
    interval = 1000 / fps,
    lastTime = (new Date()).getTime(),
    currentTime = 0,
    delta = 0;

var mouseX = 0, mouseY = 0,
    mouseRadius = 75,
    mousePower = 15,
    particleDensity = 10,
    particleStiffness = 0.15,
    particleOffset = 0,
    particleFriction = 0.9,
    particles = [],
    text = 'WebGIS小组',
    isPopulated = false;


(function() {
    const canvas = document.getElementById('canvas');  
    const context = canvas.getContext('2d');
    console.log(context)
    function init() {
        bindMouse();
        window.onresize();
        window.requestAnimationFrame(render);
    }  
  
    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;  
    };
  
  
  
  class Particle {
        constructor(canvas, context, x, y) {
            this.canvas = canvas;
            this.context = context;
            this.x = x;
            this.y = y;
            this.radius = particleDensity / 2;        
            this.spring = {
                x: x, y: y
            };
            
            this.dX = 0;           
            this.dY = 0;
        }

        getDistanceTo(x, y){
            let dX = x - this.x,
                dY = y - this.y;
            return {
                x: dX, y: dY,
                dist: Math.sqrt(dX * dX + dY * dY)
            };
        }
    
        repulseTo(x, y){
            let distance = this.getDistanceTo(x, y),
                repulseAngle = Math.atan2(distance.y, distance.x),
                repulseForce = (-1 * Math.pow(mousePower, 2)) / distance.dist;
            
            this.dX += Math.cos(repulseAngle) * repulseForce;
            this.dY += Math.sin(repulseAngle) * repulseForce;        
        }
    
        springTo(){
            this.dX += (this.spring.x - this.x) * particleStiffness;
            this.dY += (this.spring.y - this.y) * particleStiffness;        
        }
   
        update(){
            this.springTo();
            
            this.dX *= particleFriction;
            this.dY *= particleFriction;
            
            this.x += this.dX;
            this.y += this.dY;
        }
    
        draw(){ 
            this.context.fillStyle = 'white';

            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.context.fill();        
        }
    }

    function bindMouse() {
        canvas.addEventListener('mousemove', (event) => {
            mouseX = event.clientX - canvas.offsetLeft;
            mouseY = event.clientY - canvas.offsetTop;
        });
    }

    function createParticle(x, y) {
        particles.push(new Particle(canvas, context, x, y));
    }
  
    function convertTextToParticle() {    
        context.save();
        context.fillStyle = "#000000";
        context.font = "Bold 200px Arial";
        let textSize = context.measureText(text),
            textHeight = 75;
        context.translate((canvas.width / 2) - (textSize.width / 2), canvas.height / 2);
        context.fillText(text, 0, textHeight);
        context.restore();    

        let image = context.getImageData(0, 0, canvas.width, canvas.height);
        particles = [];
        for(var y = 0; y < canvas.height; y += particleDensity) {
            for(var x = 0; x < canvas.width; x += particleDensity) {
                let opacity = image.data[((x + (y * canvas.width)) * 4 + 3)];
                if(opacity > 0) {
                    createParticle(x, y);
                }
            }
        }    

        isPopulated = true;
    }
  
  function update() {
      for(var i = 0; i < particles.length; i++) {
          let p = particles[i];
        
          if(p.getDistanceTo(mouseX, mouseY).dist <= mouseRadius + p.radius) {
              p.repulseTo(mouseX, mouseY);        
          }

          p.update();
      }
  }

  function draw() {
      for(var i = 0; i < particles.length; i++) {
          let p = particles[i];
          p.draw();
      }
  }
  
  function clear() {
      context.clearRect(0, 0, canvas.width, canvas.height);
  }  

  function render() {
      currentTime = (new Date()).getTime();
      delta = currentTime - lastTime;

      if(delta > interval) {
        
          update();
          
          clear();
        
          if(!isPopulated) {
              convertTextToParticle();
          } else {
              draw(); 
          }

          lastTime = currentTime - (delta % interval);
      }

      window.requestAnimationFrame(() => {
          render();
      });    
  }  
  
  init();
  
})();

(function gui() {
    let gui = new dat.GUI();
  
    textGUI = gui.add(this, 'text').name('Text');
    textGUI.onChange(() => {  
      this.isPopulated = false;
    });

    let f1 = gui.addFolder('Mouse');
    f1.add(this, 'mouseRadius', 10, 100).name('Radius');
    f1.add(this, 'mousePower', 5, 15).name('Power');  
    f1.open();
  
    let f2 = gui.addFolder('Particle');
    f2.add(this, 'particleStiffness', 0.1, 1).name('Stiffness');
    f2.add(this, 'particleFriction', 0.1, 0.95).name('Friction'); 
    f2.open();
  
})();