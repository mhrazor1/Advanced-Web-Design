function setup() {
  createCanvas(500, 500);
  background("black");
}

function draw() {
  fill("white");
  ellipse(width/2,(height/2-100),100,100);
  ellipse(width/2,height/2,100,100);
  ellipse(width/2,(height/2)+100,100,100);
}
