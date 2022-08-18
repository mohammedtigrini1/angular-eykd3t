import { Injectable } from '@angular/core';
import * as shapes from './animations/H2O';

@Injectable()
export class InitService {
  public shapes: any[] = [];

  constructor() {
    this.constructShapeArray(shapes.default);
    console.log(this.shapes);
    console.log(require('./animations/H20.json'));
  }

  public constructShapeArray(
    shapes: any[],
    coordinates?: { x: number; y: number },
    animations?: any[]
  ) {
    for (let shape of shapes) {
      if (shape.subshapes) {
        this.constructShapeArray(
          shape.subshapes,
          coordinates,
          shape.animations
        );
      }

      if (coordinates) {
        shape.coordinates.x += coordinates.x;
        shape.coordinates.y += coordinates.y;
      }

      if (animations) {
        if (!shape.animations) {
          shape.animation = [];
        }
        animations.map((an) => {
          shape.animation.push(an);
        });
      }

      this.shapes.push(shape);
    }
  }
}
