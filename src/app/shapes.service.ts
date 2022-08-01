import { Injectable } from '@angular/core';

@Injectable()
export class ShapesService {
  public shapes: any[] = [];

  constructor() {}

  public addShape(info) {
    this.shapes.push(info);
  }

  public changeShape(info) {
    this.shapes.map((i) => (i.id == info.id ? (i = info) : i));
  }

  public deleteShape(id) {
    this.shapes = this.shapes.filter((i) => i.id != id);
  }
}
