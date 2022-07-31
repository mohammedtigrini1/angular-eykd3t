import { Component, HostListener } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import * as animations from './pythagorian_theorem.json';
// import * as animations from './test.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // its important myCanvas matches the variable name in the template
  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  public totalTime = 10000;
  public step = 5;
  public animations;

  ngAfterViewInit(): void {
    this.animations = animations;
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.animationLoop();
  }

  animationLoop() {
    let currentTime = 0;
    const interval = setInterval(() => {
      if (currentTime > this.totalTime) {
        if (this.isLooping) {
          currentTime = 0; // reset the time.
        } else {
          clearInterval(interval);
          return;
        }
      }
      this.erase();
      this.executeAnimation(currentTime);
      currentTime += this.step;
    }, this.step);
  }

  erase() {
    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(
      0,
      0,
      this.myCanvas.nativeElement.width,
      this.myCanvas.nativeElement.height
    );
  }

  // TODO: MAKE THE RECTANGLE STAY AFTER IT HAS BEEN DRAWN.
  executeAnimation(currentTime) {
    for (let animation of this.animations.default) {
      if (animation.action == 'move') {
        if (currentTime > animation.from.t && currentTime < animation.to.t) {
          const position = this.computePosition(animation, currentTime);
          // TODO
          this.drawShape(animation.shape, animation.info);
        }
      }
    }
  }

  computePosition(animation, time) {
    return {
      x:
        animation.from.x +
        Math.floor(
          this.speed(animation.from, animation.to).xVelocity *
            (animation.from.t - time)
        ),
      y:
        animation.from.y +
        Math.floor(
          this.speed(animation.from, animation.to).yVelocity *
            (animation.from.t - time)
        ),
    };
  }

  speed(from, to) {
    return {
      xVelocity: (from.x - to.x) / (to.t - from.t),
      yVelocity: (from.y - to.y) / (to.t - from.t),
    };
  }

  // TODO: Finish and make work.
  drawShape(shape, info) {
    if (shape == 'rectamgle') {
      this.drawRectangle(info);
    } else if (shape == 'rectangle') {
      this.drawTriangle(info);
    }
  }

  drawRectangle(info) {
    this.context.fillStyle = '#FF0000';
    this.context.fillRect(info.x, info.y, info.height, info.width);
  }

  drawTriangle(info) {
    this.context.beginPath();
    this.context.moveTo(info[0].x, info[0].y);
    this.context.lineTo(info[1].x, info[1].y);
    this.context.lineTo(info[2].x, info[2].y);
    this.context.fill();
  }

  // TODO: PLAY ANIMATION ON A LOOP.
  private isLooping = true;
  // if person taps on space bar, stop loop.
  @HostListener('window:keydown', ['$event'])
  spaceEvent(event: any) {
    console.log('here');
    console.log(event.code);
    if (event.code == 'Space') {
      this.isLooping = !this.isLooping;
    }
  }
}
