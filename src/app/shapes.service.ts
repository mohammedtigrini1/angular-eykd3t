import { Injectable } from '@angular/core';

@Injectable()
export class ShapesService {
  public shapes: any[] = [];

  constructor() {}

  public addShape(info) {
    this.shapes.push(info);
  }

  public changeShape(shapeIndex, info) {
    this.shapes.map((i) => (i.id == shapeIndex ? (i = info) : i));
  }

  public deleteShape(shapeIndex) {
    this.shapes = this.shapes.filter((i) => i.id != shapeIndex);
  }
}
