import { Component, HostListener } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { DrawService } from './draw.service';
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

  public totalTime = 10000;
  public step = 5;
  public animations;

  constructor(public drawService: DrawService) {}

  ngAfterViewInit(): void {
    this.animations = animations;
    this.animationLoop();
  }

  animationLoop() {
    let currentTime = 0;
    // const interval = setInterval(() => {
    //   if (currentTime > this.totalTime) {
    //     if (this.isLooping) {
    //       currentTime = 0; // reset the time.
    //     } else {
    //       clearInterval(interval);
    //       return;
    //     }
    //   }
    //   this.erase();
    //   this.executeAnimation(currentTime);
    //   currentTime += this.step;
    // }, this.step);
  }

  // TODO: MAKE THE RECTANGLE STAY AFTER IT HAS BEEN DRAWN.
  executeAnimation(currentTime) {
    for (let animation of this.animations.default) {
      if (animation.name == 'appear') {
        this.drawShape(animation.name, animation.info);
      } else if (animation.name == 'disappear') {
        // TODO: Implement some kind of shape manager or something that would be responsible
        // to draw the stuff and erase the shit.
      } else if (animation.name == 'move') {
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
