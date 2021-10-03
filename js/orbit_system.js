let sun,planets=[],nPlanets=3,destablise=0.2
function setup() {
    createCanvas(windowWidth, windowHeight)
    sun = new body(100,createVector(0,0),createVector(0,0),274)
    for (let i = 0; i < nPlanets; i++) {   
        //planet pos
        let r = random(sun.r, min(windowWidth/2,windowHeight/2))//min max
        let theta = random(TWO_PI)
        let planetPos = createVector(r*cos(theta),r*sin(theta))//x , y
        //planet vel
        let planetVel = planetPos.copy()
        planetVel.rotate(HALF_PI)
        planetVel.setMag( sqrt(sun.G*sun.mass/planetPos.mag()) )
        // planetVel.mult(random(1-destablise,1+destablise))
        planets.push(new body(random(5,45),planetPos,planetVel,0))
    }
}

function draw(){
    background(180)
    translate(width/2,height/2)
    for(let i=0;i<nPlanets;i++){
        sun.attract(planets[i])
        planets[i].show()
    }
    sun.show()

}
function body(_mass,_pos,_vel,_G) {
    this.mass = _mass
    this.pos = _pos
    this.vel = _vel
    this.G = _G;
    this.r = this.mass
    this.path = []
    this.show = function(){
        noStroke();fill(255);
        ellipse(this.pos.x, this.pos.y, this.r, this.r)
        stroke(30)
        for(let i=0;i<this.path.length-1;i++){
            line(this.path[i].x,this.path[i].y, this.path[i+1].x,this.path[i+1].y)
            console.log(this.path.length)
        }
        this.update();
    }
    
    this.update = function(){
        //update pos
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.path.push(this.pos.copy())
        if(this.path.length > 100){//keep path at const length
            this.path.splice(0,1)
        }
    }
    this.applyForce = function(f){
        //f = ma => a = f/m
        this.vel.x +=  f.x / this.mass
        this.vel.y +=  f.y / this.mass
    }
    this.attract = function(child){
        let r = dist(this.pos.x,this.pos.y,child.pos.x,child.pos.y)
        let f = this.pos.copy().sub(child.pos)
        f.setMag(this.G *((this.mass * child.mass)/(r*r)) )
        child.applyForce(f)
    }
}