import { Component } from '@angular/core';
import { ElementRef, NgModule, ViewChild } from '@angular/core';
import * as t from './test.json';

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
  public step = 10;
  public animations;

  ngAfterViewInit(): void {
    this.animations = t;
    console.log(this.animations);
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.animationLoop();
  }

  animationLoop() {
    let temp = 0;
    const interval = setInterval(() => {
      if (temp > this.totalTime) {
        clearInterval(interval);
        return;
      }
      this.erase();
      this.drawRectangle(temp);
      temp += this.step;
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

  executeAnimation(time) {}

  speed(from, to) {
    return {
      xVelocity: (from.x - from.x) / (to.t - from.t),
      yVelocity: (from.y - from.y) / (to.t - from.t),
    };
  }

  drawRectangle(time) {
    this.context.fillStyle = '#FF0000';
    this.context.fillRect(time / 200, time / 200, 40, 40);
  }

  appear() {
    console.log('hello');
  }
}
