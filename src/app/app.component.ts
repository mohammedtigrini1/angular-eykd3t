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
  public step = 10;
  public shapes;

  constructor(
    public drawService: DrawService,
    public shapeService: ShapesService
  ) {}

  ngAfterViewInit(): void {
    this.drawService.canvas = this.myCanvas;
    this.shapes = shapes.default;
    this.animationLoop();
  }

  animationLoop() {
    let currentTime = 0;
    const interval = setInterval(() => {
      if (currentTime > this.totalTime) {
        if (this.isLooping) {
          currentTime = 0;
        } else {
          console.log('end');
          clearInterval(interval);
          return;
        }
      }

      for (let shape of this.shapes) {
        this.executeAnimation(shape, currentTime);
      }

      this.drawService.drawShapes();
      currentTime += this.step;
    }, this.step);
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
        //   if (currentTime > animation.from.t && currentTime < animation.to.t) {
        //     //   const position = this.computePosition(animation, currentTime);
        //     //   this.drawService.drawShapeInCanvas(animation.shape);
        //     //   shape.info.id
        //     //   this.shapeService.changeShape(shape.info)
        //   }
      }
    }
  }

  // TODO: PLAY ANIMATION ON A LOOP.
  private isLooping = false;
  // if person taps on space bar, stop loop.
  @HostListener('window:keydown', ['$event'])
  spaceEvent(event: any) {
    if (event.code == 'Space') {
      this.isLooping = !this.isLooping;
    }
  }
}
