let particles = [];
let wind = 0;
let fires = [];
let canvas2;
function setup(resize) {
  rectMode(CENTER);
  var canvas = createCanvas(windowWidth, 650);
  //var canvas2 = createCanvas(500, 650);
  canvas.parent('sketch-holder');
  //canvas2.parent('sketch-holder2');
  noStroke();
  if (!resize) {
    fires.push(new Flame);
  }
}

function draw() {
  background('#f6d45b');
  //canvas2.background('#2f2f2f');
  if (frameCount%10 == 0) {
    wind = abs(wind + random(-.2, .2));
    wind = map(wind,0,100,0,33, true);
  }
  fires[0].display();
  fill('black');
  rect(fires[0].pos.x,height-20,10,40);
  circle(fires[0].pos.x,height-40,10);
  fill('white')
  rect(fires[0].pos.x,height,40,40);
}

class Flame{
  constructor(size) {
    this.pos = createVector(width/5,height-50);
    this.motes = [];
  }
  display() {
    this.motes.push(new Particle(this.pos));
    for (var i = 0; i < this.motes.length; i++) { //manipulate all particles
      this.motes[i].display();
      this.motes[i].move();
      if (this.motes[i].a < 1) { //remove particle once alpha < 1
        this.motes.splice(i,1);
      }
    }
  }
}
class Particle {

  constructor(position) {
    this.pos = createVector(position.x+random(-5,5),position.y+random(-5,5));
    this.initial = this.pos;
    this.velocity = createVector(random(-.3, .3), random(-8, -5)) ;
    this.r = 255;
    this.g = 195;
    this.b = 185;
    this.a = 255;
  }

  display() {
    fill(this.r,this.g,this.b,this.a);
    ellipse(this.pos.x, this.pos.y, ((0.25)^(this.a)/8)); //particle alpha determines width
  }

  move() {
    this.velocity.x = this.velocity.x + wind;
    this.velocity.y = this.velocity.y + random(.01,.08);
    this.pos.add(this.velocity) ;
    this.r = this.r - 5;
    this.g = this.g - 8;
    this.b = this.b - 12;
    this.a = this.a - (1+(fires.length/7)); //more fires = particles disappear quicker
  }

}
function windowResized() {
  setup(true);
}
