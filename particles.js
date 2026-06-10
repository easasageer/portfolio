const particleCanvas = document.getElementById('particle-canvas');
if(particleCanvas){
  const ctx = particleCanvas.getContext('2d');
  let particles = [];
  const count = 55;

  function resizeCanvas(){
    particleCanvas.width = particleCanvas.offsetWidth;
    particleCanvas.height = particleCanvas.offsetHeight;
  }

  class Particle {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.size = 1 + Math.random() * 3;
      this.speed = 0.15 + Math.random() * 0.45;
      this.alpha = 0.15 + Math.random() * 0.25;
      this.direction = Math.random() * Math.PI * 2;
    }
    update(){
      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;
      if(this.x < -20 || this.x > particleCanvas.width + 20 || this.y < -20 || this.y > particleCanvas.height + 20){
        this.reset();
        this.y = particleCanvas.height * Math.random();
      }
    }
    draw(){
      ctx.beginPath();
      ctx.fillStyle = `rgba(43,193,255,${this.alpha})`;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      ctx.fill();
    }
  }

  function populate(){
    particles = [];
    for(let i=0;i<count;i++) particles.push(new Particle());
  }

  function animate(){
    ctx.clearRect(0,0,particleCanvas.width,particleCanvas.height);
    particles.forEach(p=>{p.update();p.draw();});
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', ()=>{resizeCanvas(); populate();});
  resizeCanvas();
  populate();
  animate();
}
