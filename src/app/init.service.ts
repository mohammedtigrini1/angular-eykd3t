import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as shapes from '../assets/animations/H2O';

@Injectable()
export class InitService {
  public shapes: any[] = [];

  constructor(private http: HttpClient) {
    this.constructShapeArray(shapes.default);
    console.log(this.shapes);
    this.getDataHttp('assets/animations/oxygen.json').subscribe((data) => {
      console.log(data);
    });
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

  getDataHttp(url: string) {
    return this.http.get(url);
  }
}
