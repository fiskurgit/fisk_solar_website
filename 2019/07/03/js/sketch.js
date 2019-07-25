var columns;
var rows = 8;
var cellDiam = 100;
var maps = [];

var xR = 0.6;
var yR = 1.3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);

  columns = (width / (cellDiam*xR)) - 1;
  rows = (height / (cellDiam*yR)) - 1;

  init();
}

function init() {
  maps.length = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      maps.push(new NeuroMap(x * (cellDiam*xR), y * cellDiam*yR));
    }
  }
}

function mousePressed() {
  init();
}

function draw() {
  background(255);
  maps.forEach(function(nMap) {
    nMap.draw();
  });
}


class NeuroMap {

  constructor(originX, originY) {
    this.originX = originX;
    this.originY = originY;
    this.radius = cellDiam / 6;
    this.radiusVariation = random(this.radius * 1.1, this.radius * 1.5);
    this.noiseScale = 0.2;

    if (random(0, 100) > 97) {
      //this.radius = cellDiam / 7;
      //this.noiseScale = random(0.5, 2.5);
      //this.radiusVariation = random(this.radius * 1.5, this.radius * 2.8);
    }

    this.segments = 20;

    this.eyeASize = 4 + random(0, 4);
    this.eyeBSize = 4 + random(0, 4);
    this.eyeAHeight = random(-3, 3);
    this.eyeBHeight = this.eyeAHeight + random(-2, 1);
    this.eyeAX = this.originX + cellDiam / 2 - 5;
    this.eyeBX = this.originX + cellDiam / 2 + 5;
    this.eyeY = this.originY + this.eyeAHeight + (cellDiam - (cellDiam / 2.3));
    this.nextBlink = millis() + random(random(10000, 30000), random(55000, 100000));
    this.mouthType = random(0, 100);

  }

  coord(pointIndex) {
    var angle = TWO_PI / this.segments * pointIndex;
    var cosAngle = cos(angle);
    var sinAngle = sin(angle) * 1.1;
    var time = (frameCount) * 1e-2;
    var noiseValue = noise(this.originX + (this.noiseScale * cosAngle + this.noiseScale), this.originY + (this.noiseScale * sinAngle + this.noiseScale), time);
    var coordRadius = (this.radius/1.4) + this.radiusVariation * noiseValue;
    return createVector(this.originX + (cellDiam / 2) + coordRadius * cosAngle, this.originY + (cellDiam / 2) + coordRadius * sinAngle);
  }

  bodyCoord(pointIndex) {
    var angle = TWO_PI / this.segments * pointIndex;
    var cosAngle = cos(angle);
    var sinAngle = 2.3*sin(angle);
    var time = (frameCount*1.2) * 1e-2;
    var noiseValue = noise(this.originX + (this.noiseScale * cosAngle + this.noiseScale), this.originY + (this.noiseScale * sinAngle + this.noiseScale), time);
    var coordRadius = this.radius + this.radiusVariation * noiseValue;
    return createVector(this.originX + (cellDiam / 2) + coordRadius * cosAngle, this.originY + (cellDiam / 2) + coordRadius * sinAngle);
  }

  draw() {

    stroke(0);
    fill(255);

    //Head
    for (let i = 0; i < this.segments; ++i) {
      let a = this.coord(i);
      let b = this.coord(i + 1);
      line(a.x, a.y, b.x, b.y);
    }

    //Body
    let bodyOffset = 29;
    for (let i = 0; i < this.segments; ++i) {
      let a = this.bodyCoord(i);
      let b = this.bodyCoord(i + 1);
      line(a.x, a.y+bodyOffset, b.x, b.y+bodyOffset);
    }

    //Eyes
    if (millis() > this.nextBlink) {
      if (millis() < this.nextBlink + 1000) {
        ellipse(this.eyeAX, this.eyeY, this.eyeASize, this.eyeASize);
        ellipse(this.eyeBX, this.eyeY + this.eyeBHeight, this.eyeBSize, this.eyeBSize);

      } else {
        this.nextBlink = millis() + random(25000, 45000);
      }
    } else {
      arc(this.eyeAX, this.eyeY + 1, this.eyeASize, this.eyeASize, 0, PI);
      arc(this.eyeBX, this.eyeY + 1, this.eyeBSize, this.eyeBSize, 0, PI);
    }

    //Mouth
    let mouthY = this.eyeY + 8;
    let mouthWidth = this.eyeBX - this.eyeAX;
    if (this.mouthType < 20) {
      arc(this.eyeAX + mouthWidth / 2, mouthY, mouthWidth, 3, 0, PI);
    } else if (this.mouthType < 40) {
      arc(this.eyeAX + mouthWidth / 2, mouthY, mouthWidth, 4, PI, 0);
    } else if (this.mouthType < 45) {
      arc(this.eyeAX + mouthWidth / 2, mouthY, mouthWidth, 4, PI, PI);
    } else {
      line(this.eyeAX, mouthY, this.eyeBX, mouthY);
    }



  }
}
