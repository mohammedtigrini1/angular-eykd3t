import { Component, HostListener } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { DrawService } from './draw.service';
import * as shapes from './pythagorian_theorem.json';
import { ShapesService } from './shapes.service';
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
  public shapes;

  constructor(
    public drawService: DrawService,
    public shapeService: ShapesService
  ) {}

  ngAfterViewInit(): void {
    this.drawService.canvas = this.myCanvas;
    this.shapes = shapes;
    this.animationLoop();
  }

  animationLoop() {
    console.log(this.shapes);
    let currentTime = 0;
    // const interval = setInterval(() => {
    //   if (currentTime > this.totalTime) {
    //     if (this.isLooping) {
    //       currentTime = 0; // reset the time.
    //     } else {
    //       clearInterval(interval);
    //       return;
    //     }
    // }
    // this.drawService.eraseCanvas();
    // for(let shape of this.shapes) {
    //   //   this.executeAnimation(shape, currentTime);
    // }
    //   currentTime += this.step;
    // }, this.step);
  }

  executeAnimation(shape, currentTime) {
    for (let animation of shape.animations) {
      if (animation.name == 'appear') {
        if (animation.t == currentTime) {
          this.shapeService.addShape(shape.info);
        }
      } else if (animation.name == 'disappear') {
        if (animation.t == currentTime) {
          this.shapeService.deleteShape(shape.info.id);
        }
      } else if (animation.name == 'move') {
        // if (currentTime > animation.from.t && currentTime < animation.to.t) {
        //   const selectionRectangle = this.computeSelectionRectangle();
        //   const position = this.computePosition(selectionRectangle, currentTime);
        //   this.drawService.drawShapeInCanvas(animation.shape);
        //   shape.info.id
        //   this.shapeService.changeShape(shape.info)
        // }
      }
    }
    this.drawService.drawShapes();
  }

  computeSelectionRectangle(shape) {
    if (shape.name == 'rectangle') {
      // give out height and width of the rectangle
    } else if (shape.name == 'triangle') {
      // find the furthest points up, down left and right to compute a
      // selection rectangle.
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
